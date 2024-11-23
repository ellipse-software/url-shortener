![Banner](https://storage.ellipse.software/url.png?a=b)

# An open source link shortener.

A url shortener that respects your privacy and deployed on your own infrastructure. Built on Cloudflare KV and Workers. Serverlessly deployed. Privacy as
standard.

**🚧 DEMO:** [url.ellipse.software](https://url.ellipse.software)

## 🔥 Features

- 👮 **Privacy**: No tracking feature, privacy first.

- 🚀 **Performance**: Built to use Cloudflare's global network.

- 📦 **Easy Deployment**: Deploy with one command.

- 📡 **Serverless**: No server management required, thanks to Workers.

- 🧪 **Rate limiting**: Rate limiting, built in.

## 🧪 Install

1. Clone the latest version of the repository:

```
git clone https://github.com/ellipse-software/url-shortener.git
```

2. Install the dependencies using your favorite package manager:

```
npm/yarn/pnpm/bun install
```

3. Install and login to the CLI tool `wrangler`. if you haven't already:

```
wrangler login
```

4. Create a `wrangler.toml` file by copying the `example.wrangler.toml` file:

```
cp example.wrangler.toml wrangler.toml
```

5. Create three KV namespaces using the following commands:

```
wrangler kv namespace create LINKS
```

```
wrangler kv namespace create REVERSE_LINKS
```

```
wrangler kv namespace create LIMITS
```

After creating each namespace, replace the `ID` in your new `wrangler.toml` file with the newly generated `ID` after running each command. If you plan to change the namespace names, make sure to update the code accordingly.

## 🚀 Deployment

Once installed, you can deploy the Worker using the following command:

```
bun run deploy
```

## ⚙️ Configuration

If you would like to enable Discord Webhook Notifications, you can add the `DISCORD_WEBHOOK` secret to your Worker with the following command:

```
wrangler secret put DISCORD_WEBHOOK
```

After this, and redeploying, you will receive notifications on your Discord webhook when a link is requested.

**Note:** If there is an error in your configuration, your Worker may purposely error.

## 🔌 API and ShareX Integration

You can directly create a link using the API programmatically, or to use ShareX as a link shortener.

### API

`POST /create?link=<link>`

This will return the following JSON object:

```
{
  link: string
}
```

**Note:** `link` will return the key of the link. Therefore, to use it you will need to do something like `your.domain.com/<link>`.

### ShareX

To use ShareX as a link shortener, import the configuration from the following URL:

```
https://raw.githubusercontent.com/ellipse-software/url-shortener/refs/heads/main/sharex.sxcu
```

<div>
<img alt="Step 1" src="https://direct.uploads.gg/mUbLvWvWV" width="25%">
<img alt="Step 2" src="https://direct.uploads.gg/i2hL5a6DS" width="25%">
</div>

**Note:** Make sure you change `your.domain.com` with your actual domain.

## ✌️ Contributing

We are welcome to contributions. Please fork the repository and create a pull request.

## 🚨 Issues

If you have a question or there is a problem, please open an issue.

## ⚖️ Information

Project built with [shadcn/ui](https://ui.shadcn.com) and [Cloudflare](https://cloudflare.com) Workers and KV.

This project is licensed under the MIT License. This project has been created by [t3d.uk](https://ted.ac) and open sourced by [ellipse Software](https://ellipse.software).
