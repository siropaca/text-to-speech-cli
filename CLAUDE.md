# text-to-speech-cli プロジェクト

## プロジェクト概要

テキストファイル（Markdown 等）を読み込んで標準出力に表示するコマンドラインツール。将来的にはテキストからスピーチ API を使用して音声ファイルに変換する機能を実装予定。

## 現在の実装状況

- ✅ ファイル読み込みと標準出力表示
- ✅ CLI インターフェース (commander 使用)
- ✅ TypeScript による実装
- ✅ テスト駆動開発環境 (Jest + ts-jest)
- ⏳ 音声変換機能（未実装）
- ⏳ Markdown 解析（未実装）
- ⏳ 音声プロバイダー統合（未実装）

## アーキテクチャ

### 現在の構造

```
text-to-speech-cli/
├── bin/cli.ts          # CLI エントリーポイント
├── src/
│   ├── index.ts        # メインモジュール（現在は空）
│   └── fileReader.ts   # ファイル読み込みロジック
├── tests/              # テストファイル
│   ├── bin/
│   │   └── cli.test.ts # CLI 統合テスト
│   └── src/
│       └── fileReader.test.ts # ユニットテスト
├── dist/               # ビルド成果物
├── coverage/           # テストカバレッジレポート
└── sample/test.md      # テストファイル
```

### 計画中の構造

- `src/providers/`: 音声プロバイダーインターフェース
- `src/markdown/`: Markdown 解析処理
- `src/utils/`: ユーティリティ関数

## 技術スタック

- **言語**: TypeScript 5.9.2
- **ランタイム**: Node.js 20.18.1 (mise 管理)
- **パッケージマネージャー**: pnpm 9.15.2 (mise 管理)
- **モジュールシステム**: ESM (ECMAScript Modules)
- **依存パッケージ**:
  - `commander` (12.0.0): CLI 引数解析
  - `fs-extra` (11.2.0): ファイル操作拡張
- **開発ツール**:
  - `tsx` (4.20.3): TypeScript 実行環境
  - `eslint` (9.0.0): リンター
  - `prettier` (3.4.0): コードフォーマッター
  - `@types/node` (24.1.0): Node.js 型定義
- **テストツール**:
  - `jest` (30.0.5): テストフレームワーク
  - `ts-jest` (29.4.0): Jest の TypeScript サポート
  - `@types/jest` (30.0.0): Jest 型定義

## 開発環境セットアップ

### 必要なツール

- mise (開発環境のバージョン管理)

### セットアップ手順

```bash
# mise をインストール後
mise install

# 依存関係のインストール
pnpm install
```

## 開発ガイドライン

### コーディング規約

- ESM (ECMAScript Modules) を使用
- import/export 構文を使用（CommonJS の require は使用しない）
- ES6+ の機能を積極的に使用
- 非同期処理は async/await を使用
- エラーハンドリングは適切に実装
- TypeScript の strict モードを有効化

### ライブラリ管理

- **新規ライブラリのインストール時**:
  - 必ず最新バージョンを確認してインストールすること
  - npm registry で最新バージョンを確認後、具体的なバージョン番号を指定
  - 例: `pnpm add commander@12.0.0`（`@latest` ではなく具体的なバージョンを指定）
  - package.json では固定バージョンで保存される
- **ライブラリの使用時**:
  - 公式ドキュメントで最新の API やベストプラクティスを確認
  - 非推奨の機能や古い書き方は使用しない

### TypeScript 設定

- `tsconfig.json` の主要設定:
  - target: ES2022
  - module: NodeNext
  - strict: true
  - outDir: ./dist
  - rootDir: ./

## 利用可能なスクリプト

### 開発

```bash
pnpm run dev          # tsx を使用して開発モードで実行
```

### ビルド

```bash
pnpm run build        # TypeScript をビルド
pnpm run clean        # ビルド成果物を削除
```

### 品質管理

```bash
pnpm run lint         # ESLint でコードチェック
pnpm run format       # Prettier でコードフォーマット
pnpm run typecheck    # TypeScript の型チェック
```

### テスト

```bash
pnpm test             # テスト実行
pnpm test:watch       # ウォッチモードでテスト実行
pnpm test:coverage    # カバレッジレポート付きでテスト実行
```

## 今後の実装予定

### 音声プロバイダー実装

将来的に実装予定のプロバイダー：

- ElevenLabs
- Google Text-to-Speech
- Amazon Polly
- Azure Speech Services

新しい音声プロバイダーを追加する場合は、`src/providers/base.ts` を継承して実装する予定。

### Markdown 処理

実装予定の処理：

- コードブロック、インラインコード、HTML タグ、Markdown シンタックスは除外
- 見出し、段落、リスト、引用文のテキスト部分のみを抽出

### API 情報（実装予定）

#### ElevenLabs API

- **ベース URL**: `https://api.elevenlabs.io`
- **認証**: ヘッダーに `xi-api-key`
- **主要エンドポイント**:
  - Text-to-Speech: `POST /v1/text-to-speech/{voice_id}`
  - 音声一覧: `GET /v1/voices`
  - モデル一覧: `GET /v1/models`

#### 制限事項

- テキスト長: 最大 5000 文字/リクエスト
- 長いテキストはチャンク化して処理予定

## テスト駆動開発（TDD）

### TDD の基本原則

1. **Red（失敗）**: 最初に失敗するテストを書く
2. **Green（成功）**: テストを通すための最小限のコードを実装
3. **Refactor（リファクタリング）**: コードの品質を改善

### TDD の実践方法

#### 1. 新機能の実装時

```bash
# 1. 最初にテストファイルを作成
touch tests/src/newFeature.test.ts

# 2. ウォッチモードでテストを実行
pnpm test:watch

# 3. 失敗するテストを書く
# 4. テストが通る最小限のコードを実装
# 5. リファクタリング
```

#### 2. バグ修正時

1. バグを再現するテストを書く（Red）
2. バグを修正する（Green）
3. 同様のバグを防ぐためのテストを追加

#### 3. テストの命名規則

- `describe`: 機能やクラス名を記述
- `it`: 日本語で期待される動作を記述
- 例: `it('ファイルが存在しない場合はエラーをスローする', () => {})`

### テストカバレッジ

- 目標カバレッジ: 80% 以上
- カバレッジレポート: `pnpm test:coverage`
- HTML レポート: `coverage/lcov-report/index.html`

### モックの使用

- ファイルシステムや外部 API はモック化
- `jest.mock()` を使用してモジュールをモック
- 例は `tests/src/fileReader.test.ts` を参照

### 統合テストとユニットテスト

- **ユニットテスト**: `tests/src/` - 個別の関数やクラスをテスト
- **統合テスト**: `tests/bin/` - CLI 全体の動作をテスト

## 注意事項

- 現在は単純なファイル読み込みツールとして動作
- 音声変換機能は未実装
- API キーは環境変数で管理する予定
- エラーハンドリングでは API キー無効、クォータ超過等を考慮予定
- 音声ファイルの保存時はストリーム処理を推奨予定
- 新機能実装時は必ず TDD で開発すること
