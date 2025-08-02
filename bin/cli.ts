#!/usr/bin/env node

import { config } from 'dotenv';
import { program } from 'commander';
import { resolve } from 'path';
import process from 'process';
import {
  convertFileToSpeech,
  generateOutputPath,
} from '../src/textToSpeech.js';
import type { ElevenLabsOptions } from '../src/types/index.js';

// .env ファイルを読み込む
config();

program
  .name('text-to-speech-cli')
  .description('テキストファイルを音声ファイルに変換するツールです')
  .version('1.0.0')
  .argument('<file>', 'テキストファイルのパス')
  .option('-v, --voice-id <voiceId>', '音声 ID')
  .option('-s, --speed <speed>', '読み上げスピード (0.7-1.2)', parseFloat)
  // 未対応
  // .option('-p, --provider <provider>', 'TTS プロバイダー', 'elevenlabs')
  .action(async (file: string, options) => {
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

      // 出力ファイルパスを生成
      const outputPath = generateOutputPath(filePath);

      console.log(`変換中: ${filePath} → ${outputPath}`);

      // スピードの検証
      if (options.speed !== undefined) {
        if (options.speed < 0.7 || options.speed > 1.2) {
          console.error(
            '❌ エラー: スピードは 0.7 から 1.2 の範囲で指定してください。'
          );
          process.exit(1);
        }
      }

      // TTS オプションを作成
      const ttsOptions: ElevenLabsOptions = {
        provider: 'elevenlabs',
        apiKey,
        voiceId: options.voiceId,
        speed: options.speed,
      };

      // 音声ファイルに変換
      await convertFileToSpeech(filePath, outputPath, ttsOptions);

      console.log(`✨ 音声ファイルが作成されました: ${outputPath}`);
    } catch (error) {
      console.error(`エラー: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program.parse();
