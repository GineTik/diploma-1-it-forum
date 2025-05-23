'use client'

import { PostSearchResult } from "@/components/blocks/posts/post-search-result";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SearchPage() {
    const [search, setSearch] = useState("");

  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">Пошук</h1>
      <Input placeholder="Що шукаєте?" value={search} onChange={(e) => setSearch(e.target.value)} />
      <PostSearchResult search={search} />
    </div>
  );
}