# ElevenLabs API 情報

## SDK と認証

- **SDK**: `@elevenlabs/elevenlabs-js` を使用
- **認証**: 環境変数 `ELEVENLABS_API_KEY` で設定

## デフォルト設定

- デフォルト音声ID: `JBFqnCBsd6RMkjVDRZzb` (George)
- デフォルトモデルID: `eleven_multilingual_v2`
- 出力フォーマット: `mp3_44100_128`

## 制限事項

- テキスト長: 最大 5000 文字/リクエスト
- 長いテキストの分割処理は未実装
- 無料プランではクォータ制限あり

## 実装のポイント

- 音声ファイルの保存はストリーム処理で実装
- エラーハンドリング実装済み（API キー無効、ネットワークエラー等）
