import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('CLI Integration Tests', () => {
  let tempDir: string;
  let testFilePath: string;

  beforeEach(() => {
    // 一時ディレクトリを作成
    tempDir = join(tmpdir(), `text-to-speech-cli-test-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    testFilePath = join(tempDir, 'test.md');
  });

  afterEach(() => {
    // 一時ディレクトリをクリーンアップ
    rmSync(tempDir, { recursive: true, force: true });
  });

  const runCLI = (args: string): string => {
    try {
      return execSync(
        `npx tsx ${join(__dirname, '../../bin/cli.ts')} ${args}`,
        {
          encoding: 'utf-8',
          cwd: tempDir,
        }
      );
    } catch (error) {
      const e = error as { message: string; stdout?: string; stderr?: string };
      throw new Error(
        `CLI failed: ${e.message}\nOutput: ${e.stdout || ''}\nError: ${e.stderr || ''}`
      );
    }
  };

  it('ファイルの内容を標準出力に表示する', () => {
    const content = '# テストファイル\n\nこれはテストコンテンツです。';
    writeFileSync(testFilePath, content);

    const output = runCLI('test.md');

    expect(output).toBe(content + '\n'); // console.log は改行を追加する
  });

  it('絶対パスでファイルを読み込める', () => {
    const content = '絶対パスのテスト';
    writeFileSync(testFilePath, content);

    const output = runCLI(testFilePath);

    expect(output).toBe(content + '\n');
  });

  it('存在しないファイルの場合はエラーメッセージを表示する', () => {
    expect(() => runCLI('nonexistent.md')).toThrow(
      /エラー: ファイルの読み取りに失敗しました/
    );
  });

  it('ヘルプオプションを表示する', () => {
    const output = runCLI('--help');

    expect(output).toContain('text-to-speech-cli');
    expect(output).toContain(
      'テキストファイルの内容を標準出力に表示するツール'
    );
    expect(output).toContain('<file>');
    expect(output).toContain('Markdown ファイルのパス');
  });

  it('バージョンオプションを表示する', () => {
    const output = runCLI('--version');

    expect(output.trim()).toBe('1.0.0');
  });

  it('引数なしで実行した場合はヘルプを表示する', () => {
    expect(() => runCLI('')).toThrow();
  });
});
