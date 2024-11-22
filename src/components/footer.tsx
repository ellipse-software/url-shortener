import Link from "next/link";

export function Footer() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <p className="text-xs text-foreground/50">
        Built by{" "}
        <Link
          target="_blank"
          className="text-foreground hover:underline underline-offset-2"
          href="https://ted.ac"
        >
          t3d.uk
        </Link>{" "}
        and open sourced by{" "}
        <Link
          target="_blank"
          className="text-foreground hover:underline underline-offset-2"
          href="https://ellipse.software"
        >
          ellipse.software
        </Link>
        .
      </p>
      <Link
        target="_blank"
        className="text-foreground text-xs hover:underline underline-offset-2"
        href="https://github.com/ellipse-software/url-shortener"
      >
        View Source
      </Link>
    </div>
  );
}
