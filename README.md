# An open source link shortener.

A url shortener that respects your privacy and deployed on your own infrastructure. Built on Cloudflare KV and Workers. Serverlessly deployed. Privacy as
standard.

## Features

- 👮 **Privacy**: No tracking feature, privacy first.

- 🚀 **Performance**: Built to use Cloudflare's global network.

- 📦 **Easy Deployment**: Deploy with one command.

- 📡 **Serverless**: No server management required, thanks to Workers.

- 🧪 **Rate limitng**: Rate limiting, built in.

## Deploy

Deploy with one command:

```bash
bun run deploy
```

**Ensure you have created 3 KV namespaces and filled in the IDs in `wrangler.tom` file.**

You can use `wrangler kv namespace create <NAME>` to do this.

## License

Project built with [shadcn/ui](https://ui.shadcn.com) and [Cloudflare](https://cloudflare.com) Workers and KV.

This project is licensed under the MIT License. This project has been created by [t3d.uk](https://t3d.uk) and open sourced by [Ellipse Software](https://ellipse.software).
