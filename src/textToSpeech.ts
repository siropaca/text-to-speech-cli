import { readFile } from 'node:fs/promises';
import type { TTSProvider, TTSOptions } from './types/index.js';
import { createElevenLabsProvider } from './providers/elevenlabs.js';

/**
 * 指定されたオプションに基づいて TTS プロバイダーを作成する
 * @param options - TTS プロバイダーの設定オプション
 * @returns 作成された TTS プロバイダーインスタンス
 */
export const createTextToSpeechProvider = (
  options: TTSOptions
): TTSProvider => {
  switch (options.provider) {
    case 'elevenlabs':
      return createElevenLabsProvider(options);
    case 'google':
      // 将来的に Google TTS プロバイダーを実装
      throw new Error('Google TTS provider is not implemented yet');
    case 'amazon':
      // 将来的に Amazon Polly プロバイダーを実装
      throw new Error('Amazon Polly provider is not implemented yet');
    default:
      // @ts-expect-error - unreachable code
      throw new Error(`Unknown provider: ${options.provider}`);
  }
};

/**
 * テキストを音声ファイルに変換する
 * @param text - 変換するテキスト
 * @param outputPath - 出力ファイルのパス
 * @param options - TTS プロバイダーの設定オプション
 */
export const convertTextToSpeech = async (
  text: string,
  outputPath: string,
  options: TTSOptions
): Promise<void> => {
  const provider = createTextToSpeechProvider(options);
  await provider.convertTextToSpeech(text, outputPath);
};

/**
 * テキストファイルを音声ファイルに変換する
 * @param inputFilePath - 入力テキストファイルのパス
 * @param outputFilePath - 出力音声ファイルのパス
 * @param options - TTS プロバイダーの設定オプション
 */
export const convertFileToSpeech = async (
  inputFilePath: string,
  outputFilePath: string,
  options: TTSOptions
): Promise<void> => {
  const text = await readFile(inputFilePath, 'utf-8');
  // マークダウンファイルの不要な記法を削除して、音声読み上げ用に整形
  await convertTextToSpeech(text, outputFilePath, options);
};

// 後方互換性のためのエクスポート（非推奨）
export { generateOutputPath } from './utils/file.js';

// 後方互換性のための型エイリアス（ElevenLabs 固有のオプション）
export type TextToSpeechOptions = {
  apiKey: string;
  voiceId?: string;
  modelId?: string;
  outputFormat?: 'mp3';
};
