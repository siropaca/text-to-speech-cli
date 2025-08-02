import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import type {
  TTSProvider,
  ElevenLabsOptions,
  ElevenLabsModelId,
} from '../types/index.js';
import {
  DEFAULT_VOICE_ID,
  DEFAULT_MODEL_ID,
  DEFAULT_OUTPUT_FORMAT,
  DEFAULT_SPEED,
} from '../constants/elevenlabs.js';

/**
 * ElevenLabs API を使用する TTS プロバイダーを作成する
 * @param options - ElevenLabs API の設定オプション
 * @returns ElevenLabs TTS プロバイダーインスタンス
 */
export const createElevenLabsProvider = (
  options: ElevenLabsOptions
): TTSProvider => {
  const client = new ElevenLabsClient({
    apiKey: options.apiKey,
  });

  // デフォルト値
  const voiceId = options.voiceId || DEFAULT_VOICE_ID;
  const modelId: ElevenLabsModelId = DEFAULT_MODEL_ID;
  const outputFormat = DEFAULT_OUTPUT_FORMAT;
  const speed = options.speed ?? DEFAULT_SPEED;

  return {
    async convertTextToSpeech(text: string, outputPath: string): Promise<void> {
      try {
        const audioStream = await client.textToSpeech.convert(voiceId, {
          text,
          modelId,
          outputFormat,
          voiceSettings: {
            speed,
          },
        });

        const writeStream = createWriteStream(outputPath);
        await pipeline(audioStream, writeStream);
      } catch (error) {
        throw new Error(
          `Failed to convert text to speech with ElevenLabs: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    },
  };
};
