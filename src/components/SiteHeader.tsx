"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Guitar, Headphones } from "lucide-react";

function NavLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof BookOpen;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 min-w-[2.75rem] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-[background-color,box-shadow,color,transform] duration-200 ease-out motion-safe:active:scale-[0.98] sm:justify-start ${
        active
          ? "bg-primary/15 text-primary shadow-sm ring-1 ring-primary/30"
          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      }`}
    >
      <Icon size={18} strokeWidth={active ? 2.25 : 2} className="opacity-90" aria-hidden />
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const isListen = pathname === "/listen";
  const isLesson = pathname?.startsWith("/lesson/");
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex min-h-11 min-w-0 items-center gap-3 rounded-xl py-1 text-foreground transition-opacity duration-200 hover:opacity-95"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 shadow-[var(--shadow-soft)] ring-1 ring-primary/25 transition-[transform,background-color] duration-200 ease-out group-hover:bg-primary/18 motion-safe:group-hover:scale-[1.02]">
            <Guitar className="h-[1.25rem] w-[1.25rem] text-primary" strokeWidth={2.25} aria-hidden />
          </span>
          <div className="min-w-0 leading-snug">
            <span className="block truncate text-sm font-bold tracking-tight text-card-foreground sm:text-[0.95rem]">
              我的電吉他老師
            </span>
            <span className="hidden text-[0.68rem] font-medium text-muted-foreground sm:block">
              練習 · 聽賞 · 問答
            </span>
          </div>
        </Link>

        <nav className="flex shrink-0 items-center gap-1 sm:gap-1.5" aria-label="主要導覽">
          <NavLink href="/" label="課程" icon={BookOpen} active={isHome || isLesson} />
          <NavLink href="/listen" label="賞析" icon={Headphones} active={isListen} />
        </nav>
      </div>
    </header>
  );
}
