import Link from "next/link";
import { ArrowLeft, Home, FolderGit2 } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" className="vh-full relative flex flex-col items-center justify-center px-5 text-center">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="font-display select-none text-[32vw] text-stroke opacity-15">404</span>
      </div>

      <div className="relative z-10 max-w-lg">
        <p className="label mb-4 text-red">Error 404 — Page Not Found</p>
        <h1 className="font-display text-5xl uppercase leading-none md:text-7xl">
          Coordinate <span className="text-stroke">Lost</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          The requested page or project does not exist or has moved. Return to the portfolio homepage or explore the project archive.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-slash btn-red">
            <Home size={15} aria-hidden="true" /> Home
          </Link>
          <Link href="/#archive" className="btn-slash">
            <FolderGit2 size={15} aria-hidden="true" /> Project Archive
          </Link>
        </div>
      </div>
    </main>
  );
}
