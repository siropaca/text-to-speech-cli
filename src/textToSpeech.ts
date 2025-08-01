import { readFile } from 'node:fs/promises';
import type { TTSProvider, TTSOptions } from './types/tts.js';
import { createElevenLabsProvider } from './providers/elevenlabs.js';

// プロバイダーを作成するファクトリー関数
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
    case 'azure':
      // 将来的に Azure Speech プロバイダーを実装
      throw new Error('Azure Speech provider is not implemented yet');
    default:
      // @ts-expect-error - unreachable code
      throw new Error(`Unknown provider: ${options.provider}`);
  }
};

// テキストを音声に変換する関数
export const convertTextToSpeech = async (
  text: string,
  outputPath: string,
  options: TTSOptions
): Promise<void> => {
  const provider = createTextToSpeechProvider(options);
  await provider.convertTextToSpeech(text, outputPath);
};

// ファイルを音声に変換する関数
export const convertFileToSpeech = async (
  inputFilePath: string,
  outputFilePath: string,
  options: TTSOptions
): Promise<void> => {
  const text = await readFile(inputFilePath, 'utf-8');
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
