# text-to-speech-cli 仕様書

## プロジェクト概要

テキストファイル（Markdown等）をテキストからスピーチAPIを使用して音声ファイルに変換するコマンドラインツール

## 主要機能

### 基本機能

- テキストファイルを読み込み、テキスト部分を抽出（Markdown形式に対応）
- 複数の音声生成サービスに対応（プラグイン形式）
- 生成した音声ファイルを指定されたファイルと同階層に出力
- 設定ファイルによるデフォルト設定の管理

### 対応音声サービス

- **ElevenLabs**（デフォルト）
- Google Text-to-Speech（将来対応）
- Amazon Polly（将来対応）
- Azure Speech Services（将来対応）

## コマンド仕様

```bash
# 基本使用法
text-to-speech-cli input.md

# 音声サービスを指定
text-to-speech-cli input.md --provider elevenlabs

# 出力ファイル名を指定
text-to-speech-cli input.md --output my-audio.mp3

# 設定ファイルから読み込み
text-to-speech-cli input.md --config ./config.json
```

## オプション仕様

| オプション   | 短縮形 | 説明             | デフォルト         |
| ------------ | ------ | ---------------- | ------------------ |
| `--provider` | `-p`   | 音声生成サービス | `elevenlabs`       |
| `--output`   | `-o`   | 出力ファイル名   | `{input_name}.mp3` |
| `--config`   | `-c`   | 設定ファイルパス | `./config.json`    |
| `--help`     | `-h`   | ヘルプ表示       | -                  |
| `--version`  |        | バージョン表示   | -                  |

## 設定ファイル仕様（config.json）

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

## Markdown処理仕様

### 除外する要素

- コードブロック（```）
- インラインコード（`code`）
- HTMLタグ
- Markdownシンタックス（#, \*, \_, [](), など）

### 処理する要素

- 見出し
- 段落テキスト
- リストアイテムのテキスト部分
- 引用文のテキスト部分

## 技術仕様

### 依存パッケージ

- `commander`: CLI引数解析
- `marked`: Markdown解析
- `axios`: HTTP通信
- `fs-extra`: ファイル操作拡張
- `chalk`: コンソール出力装飾

### Node.js要件

- Node.js 18.0.0以上

## エラーハンドリング

- APIキー未設定
- ファイル読み込みエラー
- 音声生成API呼び出しエラー
- ファイル書き込みエラー
- ネットワークエラー

## 今後の拡張予定

- 音声パラメータの詳細指定（音声種類、速度、音質など）
- 複数ファイルの一括処理
- プログレスバー表示
- 音声ファイルのフォーマット選択
- 言語の自動検出・指定

## 開発フェーズ

1. **フェーズ1**: 基本機能実装（Markdown対応、ElevenLabsのみ）
2. **フェーズ2**: 設定ファイル対応
3. **フェーズ3**: エラーハンドリング強化
4. **フェーズ4**: 他プロバイダー対応
5. **フェーズ5**: 他のテキストファイル形式対応（.txt, .html等）
6. **フェーズ6**: 音声パラメータ詳細指定

## ElevenLabs API仕様

### APIエンドポイント

- **ベースURL**: `https://api.elevenlabs.io`
- **Text-to-Speech**: `POST /v1/text-to-speech/{voice_id}`
- **音声一覧取得**: `GET /v1/voices`
- **モデル一覧取得**: `GET /v1/models`

### 認証

- **ヘッダー**: `xi-api-key: YOUR_API_KEY`
- APIキーは[ダッシュボード](https://elevenlabs.io/app/settings/api-keys)で取得

### Text-to-Speech APIリクエスト例

```javascript
// Node.js axios例
const response = await axios.post(
  `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
  {
    text: 'Hello, this is a test message.',
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.8,
      style: 0.0,
      use_speaker_boost: true,
    },
  },
  {
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer',
  }
);
```

### 主要パラメータ

#### 必須パラメータ

- `text`: 音声化するテキスト（最大5000文字）
- `voice_id`: 使用する音声のID

#### オプションパラメータ

- `model_id`: 使用するモデル（デフォルト: `eleven_multilingual_v2`）
- `output_format`: 出力形式（デフォルト: `mp3_44100_128`）
- `optimize_streaming_latency`: レイテンシ最適化レベル（0-4）
- `voice_settings`: 音声設定オブジェクト
  - `stability`: 安定性（0.0-1.0、デフォルト: 0.5）
  - `similarity_boost`: 類似性ブースト（0.0-1.0、デフォルト: 0.8）
  - `style`: スタイル（0.0-1.0、デフォルト: 0.0）
  - `use_speaker_boost`: スピーカーブースト（boolean、デフォルト: true）

### 利用可能なモデル

- `eleven_multilingual_v2`: 多言語対応、高品質
- `eleven_turbo_v2`: 高速、低レイテンシ
- `eleven_flash_v2_5`: 超低レイテンシ（75ms）、リアルタイム用
- `eleven_monolingual_v1`: 英語専用、高品質

### 出力形式オプション

- `mp3_44100_128`: MP3, 44.1kHz, 128kbps（デフォルト）
- `mp3_22050_32`: MP3, 22.05kHz, 32kbps
- `pcm_16000`: PCM, 16kHz（電話品質）
- `pcm_22050`: PCM, 22.05kHz
- `pcm_44100`: PCM, 44.1kHz（Pro tier以上）
- `ulaw_8000`: μ-law, 8kHz（Twilio用）

### 制限事項

- テキスト長: 最大5000文字/リクエスト
- ファイルサイズ: レスポンスは通常数MB以下
- レート制限: プランによって異なる
- 同時接続数: プランによって異なる

### エラーレスポンス例

```json
{
  "detail": {
    "status": "invalid_api_key",
    "message": "Invalid API key provided."
  }
}
```

### 実装時の注意点

- APIキーは環境変数で管理
- 長いテキストは5000文字以下にチャンク化
- レスポンスはバイナリデータ（audio/mpeg）
- エラーハンドリングでAPIキー無効、クォータ超過等を考慮
- 音声ファイルの保存時はストリーム処理を推奨
