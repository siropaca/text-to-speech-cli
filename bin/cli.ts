#!/usr/bin/env node

import { config } from 'dotenv';
import { program } from 'commander';
import { resolve } from 'path';
import process from 'process';
import {
  convertFileToSpeech,
  generateOutputPath,
} from '../src/textToSpeech.js';
import { logger } from '../src/utils/logger.js';
import { createTTSOptions } from '../src/utils/options.js';
import type { CliOptions } from '../src/utils/options.js';

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
  .action(async (file: string, options: CliOptions) => {
    try {
      const filePath = resolve(process.cwd(), file);

      // 出力ファイルパスを生成
      const outputPath = generateOutputPath(filePath);

      logger.info(`変換中: ${filePath} → ${outputPath}`);

      // TTS オプションを作成
      const ttsOptions = createTTSOptions(options);

      // 音声ファイルに変換
      await convertFileToSpeech(filePath, outputPath, ttsOptions);

      logger.success(`音声ファイルが作成されました: ${outputPath}`);
    } catch (error) {
      logger.error(`エラー: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program.parse();
