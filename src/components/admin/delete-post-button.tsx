"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeletePostButton({
  postId,
  postTitle,
}: {
  postId: string;
  postTitle: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const ok = window.confirm(
      `Excluir o post "${postTitle}"? Esta ação não pode ser desfeita.`,
    );
    if (!ok) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${postId}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        window.alert("Erro ao excluir.");
        setDeleting(false);
      }
    } catch (err) {
      window.alert("Erro ao excluir.");
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="text-xs px-2.5 py-1 rounded bg-red-900/60 hover:bg-red-800 text-red-100 font-semibold disabled:opacity-50"
    >
      {deleting ? "Excluindo…" : "Excluir"}
    </button>
  );
}
