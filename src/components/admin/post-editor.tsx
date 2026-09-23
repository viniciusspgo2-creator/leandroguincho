"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export type PostFormInitial = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  coverImage: string;
  author: string;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
};

const EMPTY: PostFormInitial = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  tags: "",
  coverImage: "",
  author: "Leandro Guincho",
  published: false,
  seoTitle: "",
  seoDescription: "",
  ogImage: "",
};

export function PostEditor({ initial }: { initial?: PostFormInitial }) {
  const router = useRouter();
  const [form, setForm] = useState<PostFormInitial>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(initial?.id);

  function update<K extends keyof PostFormInitial>(key: K, value: PostFormInitial[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const url = isEdit ? `/api/admin/blog/${initial?.id}` : "/api/admin/blog";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Erro ao salvar.");
        setSaving(false);
        return;
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError("Falha de comunicação com o servidor.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-slate-900 border-slate-800 text-slate-100">
        <CardHeader>
          <CardTitle className="text-base">Conteúdo</CardTitle>
          <CardDescription className="text-slate-400">
            Título, resumo e corpo do artigo. O corpo aceita Markdown básico (## h2, **bold**, listas, [links](url), &gt; blockquote).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
              minLength={3}
              className="bg-slate-950 border-slate-700 text-slate-100"
              placeholder="Ex.: Guincho 24h em Ituiutaba: o que fazer em uma pane"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              className="bg-slate-950 border-slate-700 text-slate-100 font-mono"
              placeholder="deixe vazio para gerar a partir do título"
            />
            <p className="text-xs text-slate-500">
              URL final: /blog/{form.slug || "seu-slug-aqui"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Resumo *</Label>
            <Textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              required
              minLength={10}
              rows={3}
              className="bg-slate-950 border-slate-700 text-slate-100"
              placeholder="Aparece na listagem do blog e como meta description."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo (Markdown)</Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              rows={18}
              className="bg-slate-950 border-slate-700 text-slate-100 font-mono text-sm"
              placeholder="## Introdução&#10;&#10;Escreva o conteúdo aqui..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
              <Input
                id="tags"
                value={form.tags}
                onChange={(e) => update("tags", e.target.value)}
                className="bg-slate-950 border-slate-700 text-slate-100"
                placeholder="guincho, ituiutaba, 24h"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Autor</Label>
              <Input
                id="author"
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
                className="bg-slate-950 border-slate-700 text-slate-100"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverImage">URL da imagem de capa (opcional)</Label>
            <Input
              id="coverImage"
              value={form.coverImage}
              onChange={(e) => update("coverImage", e.target.value)}
              className="bg-slate-950 border-slate-700 text-slate-100"
              placeholder="/assets/images/frota/frota-01-800.webp"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="published"
              checked={form.published}
              onCheckedChange={(checked) => update("published", checked === true)}
            />
            <Label htmlFor="published" className="cursor-pointer">
              Publicar imediatamente
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800 text-slate-100">
        <CardHeader>
          <CardTitle className="text-base">SEO (opcional)</CardTitle>
          <CardDescription className="text-slate-400">
            Sobrescreve os metadados padrão deste post. Se vazio, usa título e resumo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">Título SEO</Label>
            <Input
              id="seoTitle"
              value={form.seoTitle}
              onChange={(e) => update("seoTitle", e.target.value)}
              className="bg-slate-950 border-slate-700 text-slate-100"
              placeholder="Deixe vazio para usar o título principal"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDescription">Descrição SEO</Label>
            <Textarea
              id="seoDescription"
              value={form.seoDescription}
              onChange={(e) => update("seoDescription", e.target.value)}
              rows={2}
              className="bg-slate-950 border-slate-700 text-slate-100"
              placeholder="Deixe vazio para usar o resumo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ogImage">OG Image (override)</Label>
            <Input
              id="ogImage"
              value={form.ogImage}
              onChange={(e) => update("ogImage", e.target.value)}
              className="bg-slate-950 border-slate-700 text-slate-100"
              placeholder="Deixe vazio para usar a capa ou imagem padrão"
            />
          </div>
        </CardContent>
      </Card>

      {error ? (
        <div className="rounded-md bg-red-950/60 border border-red-800 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white"
          disabled={saving}
        >
          {saving ? "Salvando…" : isEdit ? "Salvar alterações" : "Criar post"}
        </Button>
        <Link
          href="/admin/blog"
          className="text-sm text-slate-400 hover:text-slate-200"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
