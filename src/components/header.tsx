export function Header() {
  return (
    <div className="flex flex-col max-w-2xl text-center items-center justify-center space-y-2">
      <h1 className="text-foreground font-medium text-2xl">
        An open source link shortener.
      </h1>
      <h1 className="text-foreground/70">
        Built on Cloudflare KV and Workers. Serverlessly deployed. Privacy as
        standard.
      </h1>
    </div>
  );
}
