# text-to-speech-cli

テキストファイルを音声ファイル（MP3）に変換するコマンドラインツール。ElevenLabs API を使用して高品質な音声を生成します。

## 機能

- 🎙️ テキストファイルを音声ファイル（MP3）に変換
- 🌐 ElevenLabs API を使用した高品質な音声生成
- 🌍 多言語対応（ElevenLabs Multilingual モデル使用）
- 🔧 複数の TTS プロバイダーに対応可能なアーキテクチャ
- 🎯 音声 ID のカスタマイズ可能
- ⚙️ TypeScript で実装された型安全な CLI ツール
- 📝 拡張可能な設計（新しいプロバイダーの追加が容易）

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

### 事前準備

1. ElevenLabs のアカウントを作成し、API キーを取得
2. `.env` ファイルを作成し、API キーを設定：

```bash
ELEVENLABS_API_KEY=your-api-key-here
```

### 基本的な使用方法

```bash
# テキストファイルを音声ファイルに変換
text-to-speech-cli input.txt
# → input.mp3 が生成されます

# Markdown ファイルを変換
text-to-speech-cli README.md
# → README.mp3 が生成されます

# 特定の音声IDを使用して変換
text-to-speech-cli input.txt -v "21m00Tcm4TlvDq8ikWAM"

# 開発モードでの実行
pnpm run dev sample/test.md
```

### コマンドオプション

| オプション   | 短縮形 | 説明                               | デフォルト値           |
| ------------ | ------ | ---------------------------------- | ---------------------- |
| `--voice-id` | `-v`   | 音声 ID（ElevenLabs の音声を指定） | `JBFqnCBsd6RMkjVDRZzb` |
| `--help`     | `-h`   | ヘルプ表示                         | -                      |
| `--version`  | `-V`   | バージョン表示                     | -                      |

## 必要条件

- Node.js 20.18.1 以上
- pnpm 9.15.2
- ElevenLabs API キー（[ElevenLabs](https://elevenlabs.io/) で取得）

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
pnpm run dev <file>

# TypeScript のビルド
pnpm run build

# ビルド成果物のクリーン
pnpm run clean

# リント
pnpm run lint
pnpm run lint:fix    # 自動修正付き

# フォーマット
pnpm run format
pnpm run format:package  # package.json のソート

# 型チェック
pnpm run typecheck

# テスト
pnpm test
pnpm test:watch      # ウォッチモード
pnpm test:coverage   # カバレッジレポート付き

# サンプルテスト実行
pnpm run sample-test

# 依存関係の更新チェック
pnpm run ncu
```

### プロジェクト構造

```
text-to-speech-cli/
├── bin/              # CLI エントリーポイント
│   ├── cli.ts        # メインの CLI スクリプト
│   └── cli.test.ts   # CLI テスト
├── dist/             # ビルド成果物（gitignore）
├── src/              # ソースコード
│   ├── providers/    # TTS プロバイダー実装
│   │   └── elevenlabs.ts # ElevenLabs プロバイダー
│   ├── types/        # TypeScript 型定義
│   │   └── tts.ts    # TTS 関連の型定義
│   ├── utils/        # ユーティリティ関数
│   │   ├── file.ts   # ファイル操作ユーティリティ
│   │   └── file.test.ts # ファイルユーティリティのテスト
│   └── textToSpeech.ts # 音声変換ロジック
├── docs/             # ドキュメント
│   └── elevenlabs.md # ElevenLabs API ドキュメント
├── sample/           # サンプルファイル
│   ├── test.md       # テスト用 Markdown ファイル
│   └── test.mp3      # 生成されたサンプル音声
├── .env.example      # 環境変数のサンプル
├── tsconfig.json     # TypeScript 設定
├── jest.config.js    # Jest 設定
├── jest-setup.ts     # Jest セットアップ
├── eslint.config.ts  # ESLint 設定
├── package.json      # プロジェクト設定
├── CLAUDE.md         # AI 開発ガイドライン
├── lefthook.yml      # Git フック設定
├── commitlint.config.ts # コミットメッセージ規約
└── mise.toml         # 開発環境バージョン管理
```

## 技術スタック

- **言語**: TypeScript 5.9.2
- **ランタイム**: Node.js 20.18.1 (mise 管理)
- **パッケージマネージャー**: pnpm 9.15.2 (mise 管理)
- **モジュールシステム**: ESM (ECMAScript Modules)
- **主要依存パッケージ**:
  - `@elevenlabs/elevenlabs-js` (2.7.0): ElevenLabs API クライアント
  - `commander` (12.0.0): CLI 引数解析
  - `dotenv` (16.4.7): 環境変数管理
  - `fs-extra` (11.2.0): ファイル操作拡張
- **開発ツール**:
  - `tsx` (4.20.3): TypeScript 実行環境
  - `eslint` (9.32.0): リンター
  - `prettier` (3.4.0): コードフォーマッター
  - `jest` (30.0.5): テストフレームワーク
  - `ts-jest` (29.4.0): Jest の TypeScript サポート
  - `@commitlint/cli` (19.8.1): コミットメッセージ規約
  - `lefthook` (1.11.13): Git フック管理

## ライセンス

ISC License

## 環境変数

| 変数名               | 説明                | 必須 |
| -------------------- | ------------------- | ---- |
| `ELEVENLABS_API_KEY` | ElevenLabs API キー | ✓    |

## トラブルシューティング

### API キーが設定されていないエラー

`.env` ファイルが存在し、`ELEVENLABS_API_KEY` が正しく設定されているか確認してください。

### 音声生成に失敗する

- API キーが有効であることを確認
- インターネット接続を確認
- ElevenLabs のクォータ制限に達していないか確認

## 貢献

プルリクエストを歓迎します！大きな変更を加える場合は、まず issue を開いて変更内容を説明してください。

### 開発ルール

- コミットメッセージは Conventional Commits 形式に従う
- プッシュ前に自動的にリントとフォーマットが実行される（lefthook）
- テスト駆動開発（TDD）を推奨
