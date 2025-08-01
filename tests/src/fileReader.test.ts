import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { FileReader } from '../../src/fileReader.js';
import { writeFileSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

describe('FileReader', () => {
  let tempDir: string;

  beforeEach(() => {
    // 一時ディレクトリを作成
    tempDir = join(tmpdir(), `fileReader-test-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
  });

  afterEach(() => {
    // 一時ディレクトリをクリーンアップ
    rmSync(tempDir, { recursive: true, force: true });
  });

  describe('readFile', () => {
    it('相対パスでファイルを読み込める', () => {
      const mockContent = 'テストコンテンツ';
      const fileName = 'test.md';
      const filePath = join(tempDir, fileName);

      writeFileSync(filePath, mockContent);

      const result = FileReader.readFile(fileName, tempDir);

      expect(result).toBe(mockContent);
    });

    it('絶対パスでファイルを読み込める', () => {
      const mockContent = 'テストコンテンツ';
      const filePath = join(tempDir, 'test.md');

      writeFileSync(filePath, mockContent);

      const result = FileReader.readFile(filePath);

      expect(result).toBe(mockContent);
    });

    it('ファイルが存在しない場合はエラーをスローする', () => {
      const filePath = join(tempDir, 'nonexistent.md');

      expect(() => FileReader.readFile(filePath)).toThrow(/ENOENT/);
    });

    it('UTF-8 エンコーディングでファイルを読み込む', () => {
      const mockContent = '日本語のコンテンツ 🍣 ';
      const filePath = join(tempDir, 'japanese.md');

      writeFileSync(filePath, mockContent);

      const result = FileReader.readFile(filePath);

      expect(result).toBe(mockContent);
    });
  });
});
