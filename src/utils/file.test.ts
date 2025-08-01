import { describe, it, expect } from '@jest/globals';
import { generateOutputPath } from './file.js';

describe('file utilities', () => {
  describe('generateOutputPath', () => {
    it('デフォルトで mp3 拡張子の出力パスを生成する', () => {
      const inputPath = '/path/to/file.txt';
      const outputPath = generateOutputPath(inputPath);
      expect(outputPath).toBe('/path/to/file.mp3');
    });

    it('指定された拡張子で出力パスを生成する', () => {
      const inputPath = '/path/to/file.md';
      const outputPath = generateOutputPath(inputPath, 'wav');
      expect(outputPath).toBe('/path/to/file.wav');
    });

    it('複数のドットがあるファイル名を正しく処理する', () => {
      const inputPath = '/path/to/file.test.spec.txt';
      const outputPath = generateOutputPath(inputPath);
      expect(outputPath).toBe('/path/to/file.test.spec.mp3');
    });

    it('ルートディレクトリのファイルを処理する', () => {
      const inputPath = '/file.txt';
      const outputPath = generateOutputPath(inputPath);
      expect(outputPath).toBe('/file.mp3');
    });

    it('相対パスを処理する', () => {
      const inputPath = './relative/path/file.txt';
      const outputPath = generateOutputPath(inputPath);
      expect(outputPath).toBe('relative/path/file.mp3');
    });

    it('拡張子がないファイルを処理する', () => {
      const inputPath = '/path/to/file';
      const outputPath = generateOutputPath(inputPath);
      expect(outputPath).toBe('/path/to/file.mp3');
    });
  });
});
