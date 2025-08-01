#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import process from 'process';

program
  .name('text-to-speech-cli')
  .description('テキストファイルの内容を標準出力に表示するツール')
  .version('1.0.0')
  .argument('<file>', 'Markdown ファイルのパス')
  .action((file: string) => {
    try {
      const filePath = resolve(process.cwd(), file);
      const content = readFileSync(filePath, 'utf-8');
      console.log(content);
    } catch (error) {
      console.error(
        `エラー: ファイルの読み取りに失敗しました - ${(error as Error).message}`
      );
      process.exit(1);
    }
  });

program.parse();
