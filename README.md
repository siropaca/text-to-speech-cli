# text-to-speech-cli

テキストファイル（Markdown 等）を読み込んで標準出力に表示するコマンドラインツール

## 機能

- 📝 テキストファイルの内容を標準出力に表示
- ⚙️ TypeScript で実装された CLI ツール
- 🎯 シンプルで直感的な CLI インターフェース

## インストール

### 開発環境での実行

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/text-to-speech-cli.git
cd text-to-speech-cli

# 依存関係のインストール (pnpm を使用)
pnpm install

# 開発モードで実行
pnpm run dev <file>
```

### ビルドして実行

```bash
# ビルド
pnpm run build

# ビルド後の実行
node dist/bin/cli.js <file>
```

## 使い方

### 基本的な使用方法

```bash
# ファイルの内容を表示
text-to-speech-cli input.md

# 開発モードでの実行
pnpm run dev sample/test.md
```

### コマンドオプション

| オプション  | 短縮形 | 説明           |
| ----------- | ------ | -------------- |
| `--help`    | `-h`   | ヘルプ表示     |
| `--version` | `-V`   | バージョン表示 |

## 必要条件

- Node.js 20.18.1 以上
- pnpm 9.15.2

## 開発

### 開発環境セットアップ

```bash
# mise を使用している場合
mise install

# 依存関係のインストール
pnpm install
```

### 利用可能なスクリプト

```bash
# 開発モードで実行
pnpm run dev

# TypeScript のビルド
pnpm run build

# ビルド成果物のクリーン
pnpm run clean

# リント
pnpm run lint

# フォーマット
pnpm run format

# 型チェック
pnpm run typecheck
```

### プロジェクト構造

```
text-to-speech-cli/
├── bin/           # CLI エントリーポイント
│   └── cli.ts     # メインの CLI スクリプト
├── dist/          # ビルド成果物（gitignore）
├── src/           # ソースコード
│   └── index.ts   # メインモジュール（現在は空）
├── sample/        # サンプルファイル
│   └── test.md    # テスト用 Markdown ファイル
├── tsconfig.json  # TypeScript 設定
├── package.json   # プロジェクト設定
└── mise.toml      # 開発環境バージョン管理
```

## 技術スタック

- **言語**: TypeScript 5.9.2
- **ランタイム**: Node.js 20.18.1 (mise 管理)
- **パッケージマネージャー**: pnpm 9.15.2 (mise 管理)
- **モジュールシステム**: ESM (ECMAScript Modules)
- **主要依存パッケージ**:
  - `commander` (12.0.0): CLI 引数解析
  - `fs-extra` (11.2.0): ファイル操作拡張
- **開発ツール**:
  - `tsx` (4.20.3): TypeScript 実行環境
  - `eslint` (9.0.0): リンター
  - `prettier` (3.4.0): コードフォーマッター

## ライセンス

ISC License

## 貢献

プルリクエストを歓迎します！大きな変更を加える場合は、まず issue を開いて変更内容を説明してください。
