import Link from "next/link";

export function Footer() {
  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      <p className="text-xs text-foreground/50">
        Built by{" "}
        <Link
          target="_blank"
          className="text-foreground hover:underline underline-offset-2"
          href="https://t3d.uk"
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
    </div>
  );
}
