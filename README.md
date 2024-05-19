# 自身の記載

- Honoを試す
- https://hono.dev/

# 以下デフォルトの記載

```
npm install
npm run dev
```

```
npm run deploy
```

# シークレット設定
https://developers.cloudflare.com/workers/wrangler/commands/#put-3

実行のためには `wrangler` が必要
`npm install wrangler --save-dev` でインストール

値のセットを `npx wrangler secret put <KEY> [OPTIONS]` で行う
`wrangler.toml` では `<KEY>` を空の値にしておく

wrangler secret put BASIC_AUTH_USER

