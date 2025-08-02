import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
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
  const originalEnv = process.env.ELEVENLABS_API_KEY;

  beforeEach(() => {
    // 一時ディレクトリを作成
    tempDir = join(tmpdir(), `text-to-speech-cli-test-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    testFilePath = join(tempDir, 'test.md');

    // テスト用の環境変数を設定
    process.env.ELEVENLABS_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    // 一時ディレクトリをクリーンアップ
    rmSync(tempDir, { recursive: true, force: true });

    // 環境変数を元に戻す
    if (originalEnv) {
      process.env.ELEVENLABS_API_KEY = originalEnv;
    } else {
      delete process.env.ELEVENLABS_API_KEY;
    }
  });

  const runCLI = (args: string, env?: Record<string, string>): string => {
    try {
      return execSync(`npx tsx ${join(__dirname, './cli.ts')} ${args}`, {
        encoding: 'utf-8',
        cwd: tempDir,
        env: { ...process.env, ...env },
      });
    } catch (error) {
      const e = error as { message: string; stdout?: string; stderr?: string };
      throw new Error(
        `CLI failed: ${e.message}\nOutput: ${e.stdout || ''}\nError: ${e.stderr || ''}`
      );
    }
  };

  it('API キーがない場合はエラーメッセージを表示する', () => {
    writeFileSync(testFilePath, 'テストコンテンツ');

    expect(() => runCLI('test.md', { ELEVENLABS_API_KEY: '' })).toThrow(
      /ELEVENLABS_API_KEY 環境変数が設定されていません/
    );
  });

  it('ヘルプオプションを表示する', () => {
    const output = runCLI('--help');

    expect(output).toContain('text-to-speech-cli');
    expect(output).toContain('テキストファイルを音声ファイルに変換するツール');
    expect(output).toContain('<file>');
    expect(output).toContain('テキストファイルのパス');
  });

  it('ヘルプオプションが正しく表示される', () => {
    const output = runCLI('--help');

    // 基本的なコマンド説明が含まれている
    expect(output).toContain(
      'テキストファイルを音声ファイルに変換するツールです'
    );
    expect(output).toContain('<file>');

    // オプションが含まれている
    expect(output).toContain('--voice-id');
    expect(output).toContain('音声 ID');
    expect(output).toContain('--speed');
    expect(output).toContain('読み上げスピード (0.7-1.2)');
  });

  it('バージョンオプションを表示する', () => {
    const output = runCLI('--version');

    expect(output).toContain('1.0.0');
  });

  it('引数なしで実行した場合はエラーを表示する', () => {
    expect(() => runCLI('')).toThrow(/missing required argument/);
  });

  // 実際の API 呼び出しを行わないため、音声変換のテストはモックが必要
  // ここでは基本的な動作確認のみ
});
