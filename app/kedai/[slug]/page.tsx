import { notFound } from "next/navigation";
import Link from "next/link";
import KedaiDetailContent from "@/components/kedaikopi/kedai-detail-content";
import kedaiData from "@/data/kedai-kopi.json";
import type { KedaiKopi } from "@/types/kedai";

const kedaiList: KedaiKopi[] = kedaiData as KedaiKopi[];

interface KedaiPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return kedaiList.map((kedai) => ({
    slug: kedai.slug,
  }));
}

export async function generateMetadata({ params }: KedaiPageProps) {
  const { slug } = await params;
  const kedai = kedaiList.find((k) => k.slug === slug);

  if (!kedai) {
    return {
      title: "Kedai Not Found - KedaiKopi",
    };
  }

  return {
    title: `${kedai.name} - ${kedai.location.city}, ${kedai.location.state} - KedaiKopi`,
    description: kedai.description || `${kedai.name} in ${kedai.location.city}, ${kedai.location.state}. ${kedai.specialties.join(", ")}.`,
  };
}

export default async function KedaiPage({ params }: KedaiPageProps) {
  const { slug } = await params;
  const kedai = kedaiList.find((k) => k.slug === slug);

  if (!kedai) {
    notFound();
  }

  // Find related kedai in the same state
  const relatedKedai = kedaiList
    .filter((k) => k.id !== kedai.id && k.location.state === kedai.location.state)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to directory
            </Link>
            <Link href="/" className="text-xl font-bold tracking-tight text-[var(--foreground)]">
              <span className="text-[var(--accent)]">Kedai</span>Kopi
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        <KedaiDetailContent kedai={kedai} relatedKedai={relatedKedai} />
      </main>
    </div>
  );
}