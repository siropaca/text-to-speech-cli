# text-to-speech-cli

テキストファイル（Markdown 等）をテキストからスピーチ API を使用して音声ファイルに変換するコマンドラインツール

## 機能

- 📝 Markdown ファイルからテキストを抽出して音声化
- 🔌 複数の音声生成サービスに対応（プラグイン形式）
- ⚙️ 設定ファイルによるデフォルト設定の管理
- 🎯 シンプルで直感的な CLI インターフェース

## インストール

```bash
npm install -g text-to-speech-cli
```

## 使い方

### 基本的な使用方法

```bash
# Markdown ファイルを音声に変換
text-to-speech-cli input.md

# 音声サービスを指定
text-to-speech-cli input.md --provider elevenlabs

# 出力ファイル名を指定
text-to-speech-cli input.md --output my-audio.mp3

# 設定ファイルを使用
text-to-speech-cli input.md --config ./config.json
```

### コマンドオプション

| オプション | 短縮形 | 説明 | デフォルト |
|-----------|--------|------|-----------|
| `--provider` | `-p` | 音声生成サービス | `elevenlabs` |
| `--output` | `-o` | 出力ファイル名 | `{input_name}.mp3` |
| `--config` | `-c` | 設定ファイルパス | `./config.json` |
| `--help` | `-h` | ヘルプ表示 | - |
| `--version` | | バージョン表示 | - |

## 設定

### 設定ファイル（config.json）

```json
{
  "defaultProvider": "elevenlabs",
  "providers": {
    "elevenlabs": {
      "apiKey": "your-api-key"
    }
  },
  "processing": {
    "removeMarkdownSyntax": true,
    "chunkSize": 5000
  }
}
```

### 環境変数

```bash
# ElevenLabs API キー
export ELEVENLABS_API_KEY="your-api-key"
```

## 対応音声サービス

- ✅ **ElevenLabs**（実装済み）
- 🔜 Google Text-to-Speech（予定）
- 🔜 Amazon Polly（予定）
- 🔜 Azure Speech Services（予定）

## Markdown 処理

### 処理される要素
- 見出し
- 段落テキスト
- リストアイテムのテキスト部分
- 引用文のテキスト部分

### 除外される要素
- コードブロック（```）
- インラインコード（`code`）
- HTML タグ
- Markdown シンタックス（#, *, _, []() など）

## 必要条件

- Node.js 18.0.0 以上
- 対応する音声サービスの API キー

## 開発

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/text-to-speech-cli.git
cd text-to-speech-cli

# 依存関係のインストール
npm install

# 開発モードで実行
npm run dev

# テストの実行
npm test

# リント
npm run lint

# フォーマット
npm run format
```

## ライセンス

MIT License

## 貢献

プルリクエストを歓迎します！大きな変更を加える場合は、まず issue を開いて変更内容を説明してください。
