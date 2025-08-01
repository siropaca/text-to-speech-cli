# text-to-speech-cli プロジェクト

## プロジェクト概要
テキストファイル（Markdown 等）をテキストからスピーチ API を使用して音声ファイルに変換するコマンドラインツール

## アーキテクチャ

### ディレクトリ構造
```
text-to-speech-cli/
├── src/
│   ├── cli.js              # CLI エントリーポイント
│   ├── parser/
│   │   └── markdown.js     # Markdown 解析
│   ├── providers/
│   │   ├── base.js         # プロバイダーベースクラス
│   │   ├── elevenlabs.js   # ElevenLabs 実装
│   │   └── index.js        # プロバイダー管理
│   ├── config/
│   │   └── manager.js      # 設定管理
│   └── utils/
│       ├── file.js         # ファイル操作
│       └── audio.js        # 音声処理
├── bin/
│   └── text-to-speech-cli  # 実行ファイル
├── config/
│   └── default.json        # デフォルト設定
├── tests/
├── docs/
├── mise.toml              # 開発環境バージョン管理
├── package.json
└── README.md
```

## 技術スタック
- **Node.js**: 20.18.1 (mise 管理)
- **パッケージマネージャー**: pnpm 9.15.2 (mise 管理)
- **モジュールシステム**: ESM (ECMAScript Modules)
- **主要依存パッケージ**:
  - `commander`: CLI 引数解析
  - `marked`: Markdown 解析
  - `axios`: HTTP 通信
  - `fs-extra`: ファイル操作拡張
  - `chalk`: コンソール出力装飾

## 開発環境セットアップ

### 必要なツール
- mise (開発環境のバージョン管理)

### セットアップ手順
```bash
# mise をインストール後
mise install
```

## 開発ガイドライン

### コーディング規約
- ESM (ECMAScript Modules) を使用
- import/export 構文を使用（CommonJS の require は使用しない）
- ES6+ の機能を積極的に使用
- 非同期処理は async/await を使用
- エラーハンドリングは適切に実装

### プロバイダー実装
新しい音声プロバイダーを追加する場合は、`src/providers/base.js` を継承して実装する

### Markdown 処理
- コードブロック、インラインコード、HTML タグ、Markdown シンタックスは除外
- 見出し、段落、リスト、引用文のテキスト部分のみを抽出

## API 情報

### ElevenLabs API
- **ベース URL**: `https://api.elevenlabs.io`
- **認証**: ヘッダーに `xi-api-key`
- **主要エンドポイント**:
  - Text-to-Speech: `POST /v1/text-to-speech/{voice_id}`
  - 音声一覧: `GET /v1/voices`
  - モデル一覧: `GET /v1/models`

### 制限事項
- テキスト長: 最大 5000 文字/リクエスト
- 長いテキストはチャンク化して処理

## テストとビルド

### テストコマンド
```bash
pnpm test
```

### リント
```bash
pnpm run lint
```

### フォーマット
```bash
pnpm run format
```

## 注意事項
- API キーは環境変数で管理すること
- エラーハンドリングでは API キー無効、クォータ超過等を考慮
- 音声ファイルの保存時はストリーム処理を推奨