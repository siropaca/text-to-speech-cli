# text-to-speech-cli プロジェクト

## プロジェクト概要

テキストファイルを音声ファイル（MP3）に変換するコマンドラインツール。
ElevenLabs API などを使用して音声を生成します。

## アーキテクチャ

### 現在の構造

```
text-to-speech-cli/
├── bin/
│   ├── cli.ts          # CLI エントリーポイント
│   └── cli.test.ts     # CLI テスト（同階層）
├── src/
│   ├── index.ts        # メインモジュール
│   ├── index.test.ts   # index テスト（同階層）
│   ├── textToSpeech.ts # 音声変換ロジック（ElevenLabs API）
│   └── textToSpeech.test.ts # textToSpeech テスト（同階層）
├── dist/               # ビルド成果物
├── coverage/           # テストカバレッジレポート
├── sample/
│   ├── test.md         # テスト用 Markdown
│   └── test.mp3        # 生成されたサンプル音声
├── .env.example        # 環境変数サンプル
├── jest.config.js      # Jest 設定
├── eslint.config.ts    # ESLint 設定
├── lefthook.yml        # Git フック設定
└── commitlint.config.ts # コミットメッセージ規約
```

## 技術スタック

- @./package.json を参照

## 開発ガイドライン

### コーディング規約

- ESM (ECMAScript Modules) を使用
- import/export 構文を使用（CommonJS の require は使用しない）
- ES6+ の機能を積極的に使用
- 非同期処理は async/await を使用
- エラーハンドリングは適切に実装
- TypeScript の strict モードを有効化
- any 型は絶対に使用しない（適切な型定義を必ず行う）
- 実装をするときは適度にコメントを残すこと
- クリーンアーキテクチャを意識して、常に拡張性を考えて実装を行うこと
- class 記法は使用せず、function 型で実装すること
- 関数には必ず JSDoc を記載すること（パラメータ、戻り値、関数の説明を含む）
- JSDoc の説明はできるだけ簡潔に記載すること

### ライブラリ管理

- **新規ライブラリのインストール時**:
  - 必ず最新バージョンを確認してインストールすること
  - npm registry で最新バージョンを確認後、具体的なバージョン番号を指定
  - package.json では固定バージョンで保存される
- **ライブラリの使用時**:
  - 公式ドキュメントで最新の API やベストプラクティスを確認
  - 非推奨の機能や古い書き方は使用しない

### TypeScript 設定

- @./tsconfig.json を参照

## 利用可能なスクリプト

### 開発

```bash
pnpm run dev <file>   # tsx を使用して開発モードで実行
```

### ビルド

```bash
pnpm run build        # TypeScript をビルド
pnpm run clean        # ビルド成果物を削除
```

### 品質管理

```bash
pnpm run lint         # ESLint でコードチェック
pnpm run lint:fix     # ESLint で自動修正
pnpm run format       # Prettier でコードフォーマット
pnpm run format:package # package.json をソート
pnpm run typecheck    # TypeScript の型チェック
```

### テスト

```bash
pnpm test             # テスト実行
pnpm test:watch       # ウォッチモードでテスト実行
pnpm test:coverage    # カバレッジレポート付きでテスト実行
```

## API 情報

- ElevenLabs API: @./docs/elevenlabs-api.md を参照

## テスト駆動開発（TDD）

### TDD の基本原則

1. **Red（失敗）**: 最初に失敗するテストを書く
2. **Green（成功）**: テストを通すための最小限のコードを実装
3. **Refactor（リファクタリング）**: コードの品質を改善

### TDD の実践方法

新機能実装時は失敗するテストを先に書き、それを通すコードを実装後、リファクタリングする。
バグ修正時はバグを再現するテストを作成してから修正を行う。

### テストの命名規則

- `describe`: 機能やクラス名を記述
- `it`: 日本語で期待される動作を記述
- 例: `it('ファイルが存在しない場合はエラーをスローする', () => {})`

### テストファイルの配置

- テストファイルは実装ファイルと同じ階層に配置する
- 命名規則: `[実装ファイル名].test.ts`
- 例: `src/textToSpeech.ts` → `src/textToSpeech.test.ts`

### テストカバレッジ

- 目標カバレッジ: 80% 以上
- カバレッジレポート: `pnpm test:coverage`
- HTML レポート: `coverage/lcov-report/index.html`

### モックの使用

- ファイルシステムや外部 API はモック化
- `jest.mock()` を使用してモジュールをモック
- 例は各実装ファイルと同階層のテストファイルを参照

### 統合テストとユニットテスト

- **ユニットテスト**: 実装ファイルと同階層に配置（例: `src/foo.test.ts`）
- **統合テスト**: 実装ファイルと同階層に配置（例: `bin/cli.test.ts`）

## 注意事項

- 新機能実装時は必ず TDD で開発
- Git フックでコミット時に lint とフォーマットが自動実行
- コミットメッセージは Conventional Commits 形式
- 今後の実装予定や機能追加の記述は不要（コンテキストを無駄に消費する）
