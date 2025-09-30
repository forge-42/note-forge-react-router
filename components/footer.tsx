import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/"
          aria-label="go home"
          className="mx-auto size-fit flex items-center gap-2"
        >
          <Image src="/noteforge-logo.png" alt="logo" width={60} height={60} />

          <span className="text-2xl font-bold">Noteforge</span>
        </Link>

        <span className="text-muted-foreground block text-center text-sm">
          {" "}
          © {new Date().getFullYear()} NoteForge, All rights reserved
        </span>
      </div>
    </footer>
  );
}
