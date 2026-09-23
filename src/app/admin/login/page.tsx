"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Admin login / first-time setup.
 *
 * Detects whether an admin already exists (calls /api/admin/login with a HEAD
 * probe) and switches between "create password" and "login" modes.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "setup">("login");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    fetch("/api/admin/login", { method: "GET" })
      .then((r) => r.json())
      .then((data: { exists?: boolean }) => {
        setMode(data.exists ? "login" : "setup");
        setLoading(false);
      })
      .catch(() => {
        // If probe fails, assume login mode.
        setMode("login");
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const body =
        mode === "setup" ? { password, confirm } : { password };
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Erro ao entrar.");
        setSubmitting(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("Falha de comunicação com o servidor.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="animate-pulse">Verificando…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-pink-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block">
          {/* biome-ignore lint/performance/noImgElement: brand logo */}
          <img
            src="/assets/images/brand/logo-header.png"
            alt="Leandro Guincho"
            width={72}
            height={72}
            className="mx-auto mb-3"
          />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Painel Administrativo</h1>
        <p className="text-sm text-slate-400 mt-1">
          {mode === "setup"
            ? "Crie a senha de administrador para começar."
            : "Entre com a senha de administrador."}
        </p>
      </div>

      <Card className="w-full max-w-md bg-slate-900/70 border-slate-800 backdrop-blur text-slate-100">
        <CardHeader>
          <CardTitle>{mode === "setup" ? "Primeiro acesso" : "Login"}</CardTitle>
          <CardDescription className="text-slate-400">
            {mode === "setup"
              ? "Defina a senha que será usada para acessar o painel."
              : "Use a senha cadastrada para acessar o painel."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "setup" ? "new-password" : "current-password"}
                required
                minLength={6}
                className="bg-slate-950 border-slate-700 text-slate-100"
              />
            </div>
            {mode === "setup" ? (
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirmar senha</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="bg-slate-950 border-slate-700 text-slate-100"
                />
              </div>
            ) : null}
            {error ? (
              <div className="rounded-md bg-red-950/60 border border-red-800 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            ) : null}
          </CardContent>
          <CardFooter className="flex flex-col gap-3 mt-4">
            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              disabled={submitting}
            >
              {submitting
                ? "Processando…"
                : mode === "setup"
                  ? "Criar senha e entrar"
                  : "Entrar"}
            </Button>
            <Link href="/" className="text-xs text-slate-400 hover:text-slate-200">
              ← Voltar ao site
            </Link>
          </CardFooter>
        </form>
      </Card>

      <p className="text-xs text-slate-500 mt-6 max-w-md text-center">
        Após o primeiro acesso, a senha pode ser alterada dentro do painel.
        A sessão dura 7 dias.
      </p>
    </div>
  );
}
