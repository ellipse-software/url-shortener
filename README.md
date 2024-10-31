# An open source link shortener.

A url shortener that respects your privacy and deployed on your own infrastructure. Built on Cloudflare KV and Workers. Serverlessly deployed. Privacy as
standard.

**DEMO:** [url.ellipse.software](https://url.ellipse.software)

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

## Setup

Once cloned, install the packages using your favourite package manager:

```
npm/yarn/pnpm/bun install
```

Install and login to the CLI tool `wrangler`. Then create three namespaces:

```
wrangler kv namespace create <name>
```

The names are `LINKS`, `REVERSE_LINKS` and `LIMITS`. Replace the generated IDs in the `wrangler.toml` file.

## Contributing

We are welcome to contributions. Please fork the repository and create a pull request.

## Issues

If you have a questio or there is a problem, please open an issue.

## License

Project built with [shadcn/ui](https://ui.shadcn.com) and [Cloudflare](https://cloudflare.com) Workers and KV.

This project is licensed under the MIT License. This project has been created by [t3d.uk](https://t3d.uk) and open sourced by [Ellipse Software](https://ellipse.software).
