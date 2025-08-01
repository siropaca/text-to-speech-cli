#!/usr/bin/env node

import { config } from 'dotenv';
import { program } from 'commander';
import { resolve } from 'path';
import process from 'process';
import { TextToSpeech } from '../src/textToSpeech.js';

// .env ファイルを読み込む
config();

program
  .name('text-to-speech-cli')
  .description('テキストファイルを音声ファイルに変換するツール')
  .version('1.0.0')
  .argument('<file>', 'テキストファイルのパス')
  .action(async (file: string) => {
    try {
      const filePath = resolve(process.cwd(), file);

      // API キーを環境変数から取得
      const apiKey = process.env.ELEVENLABS_API_KEY;

      if (!apiKey) {
        console.error(
          '❌ エラー: ELEVENLABS_API_KEY 環境変数が設定されていません。\n' +
            '   .env ファイルを作成するか、環境変数を設定してください。'
        );
        process.exit(1);
      }

      // TextToSpeech インスタンスを作成
      const tts = new TextToSpeech({ apiKey });

      // 出力ファイルパスを生成
      const outputPath = TextToSpeech.generateOutputPath(filePath);

      console.log(`変換中: ${filePath} → ${outputPath}`);

      // 音声ファイルに変換
      await tts.convertFileToSpeech(filePath, outputPath);

      console.log(`✨ 音声ファイルが作成されました: ${outputPath}`);
    } catch (error) {
      console.error(`エラー: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program.parse();
