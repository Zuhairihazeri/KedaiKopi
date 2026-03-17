import KedaiDirectory from "@/components/kedaikopi/kedai-directory";
import kedaiData from "@/data/kedai-kopi.json";
import type { KedaiKopi } from "@/types/kedai";

const kedaiList: KedaiKopi[] = kedaiData as KedaiKopi[];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                <span className="text-[var(--accent)]">Kedai</span>Kopi
              </h1>
              <p className="text-sm text-[var(--muted)]">
                Discover the best coffee shops in Malaysia
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-subtle)]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-[var(--surface-2)] px-3 py-2 text-center">
              <p className="text-lg font-bold text-[var(--foreground)]">
                {kedaiList.length}
              </p>
              <p className="text-xs text-[var(--muted)]">Coffee Shops</p>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] px-3 py-2 text-center">
              <p className="text-lg font-bold text-[var(--foreground)]">
                {new Set(kedaiList.map(k => k.location.state)).size}
              </p>
              <p className="text-xs text-[var(--muted)]">States</p>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] px-3 py-2 text-center">
              <p className="text-lg font-bold text-[var(--foreground)]">
                {kedaiList.filter(k => k.type === "Traditional Kopitiam").length}
              </p>
              <p className="text-xs text-[var(--muted)]">Kopitiam</p>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] px-3 py-2 text-center">
              <p className="text-lg font-bold text-[var(--foreground)]">
                {kedaiList.filter(k => k.amenities.includes("WiFi")).length}
              </p>
              <p className="text-xs text-[var(--muted)]">With WiFi</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <KedaiDirectory kedaiList={kedaiList} />
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 text-center text-xs text-[var(--muted)]">
        <p>
          GPS location-based kedai kopi discovery &middot; Real-time distance calculation
        </p>
        <p className="mt-1">
          Built by{" "}
          <a
            href="https://github.com/Zuhairihazeri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            Zek-san
          </a>
        </p>
      </footer>
    </main>
  );
}