"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SeoSettings } from "@/lib/settings";
import { defaultSeoSettings } from "@/lib/settings";

export function SeoForm({ initial }: { initial: SeoSettings }) {
  const [form, setForm] = useState<SeoSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof SeoSettings>(key: K, value: SeoSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSuccess(false);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Erro ao salvar.");
        return;
      }
      setSuccess(true);
    } catch (err) {
      setError("Falha de comunicação com o servidor.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    setForm(defaultSeoSettings);
    setSuccess(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-slate-900 border-slate-800 text-slate-100">
        <CardHeader>
          <CardTitle className="text-base">Metadados padrão</CardTitle>
          <CardDescription className="text-slate-400">
            Usados em todas as páginas que não definem seus próprios metadados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="defaultTitle">Título padrão</Label>
            <Input
              id="defaultTitle"
              value={form.defaultTitle}
              onChange={(e) => update("defaultTitle", e.target.value)}
              className="bg-slate-950 border-slate-700 text-slate-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultDescription">Descrição padrão</Label>
            <Textarea
              id="defaultDescription"
              value={form.defaultDescription}
              onChange={(e) => update("defaultDescription", e.target.value)}
              rows={2}
              className="bg-slate-950 border-slate-700 text-slate-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultOgImage">Imagem OG padrão</Label>
            <Input
              id="defaultOgImage"
              value={form.defaultOgImage}
              onChange={(e) => update("defaultOgImage", e.target.value)}
              className="bg-slate-950 border-slate-700 text-slate-100"
              placeholder="/assets/images/og-image.jpg"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800 text-slate-100">
        <CardHeader>
          <CardTitle className="text-base">Google Analytics & Tag Manager</CardTitle>
          <CardDescription className="text-slate-400">
            Cole os IDs (não as tags completas). Os scripts são injetados automaticamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gaId">Google Analytics 4 ID</Label>
              <Input
                id="gaId"
                value={form.gaId}
                onChange={(e) => update("gaId", e.target.value)}
                className="bg-slate-950 border-slate-700 text-slate-100 font-mono"
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gtmId">Google Tag Manager ID</Label>
              <Input
                id="gtmId"
                value={form.gtmId}
                onChange={(e) => update("gtmId", e.target.value)}
                className="bg-slate-950 border-slate-700 text-slate-100 font-mono"
                placeholder="GTM-XXXXXXX"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="googleVerification">Google Search Console (token de verificação)</Label>
            <Input
              id="googleVerification"
              value={form.googleVerification}
              onChange={(e) => update("googleVerification", e.target.value)}
              className="bg-slate-950 border-slate-700 text-slate-100 font-mono"
              placeholder="Np3jHc7V..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebookPixelId">Facebook Pixel ID (opcional)</Label>
            <Input
              id="facebookPixelId"
              value={form.facebookPixelId}
              onChange={(e) => update("facebookPixelId", e.target.value)}
              className="bg-slate-950 border-slate-700 text-slate-100 font-mono"
              placeholder="123456789012345"
            />
          </div>
        </CardContent>
      </Card>

      {error ? (
        <div className="rounded-md bg-red-950/60 border border-red-800 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-md bg-green-950/60 border border-green-800 px-3 py-2 text-sm text-green-200">
          Configurações salvas com sucesso.
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white"
          disabled={saving}
        >
          {saving ? "Salvando…" : "Salvar configurações"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          Restaurar padrões
        </Button>
      </div>
    </form>
  );
}
