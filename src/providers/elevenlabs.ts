import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import type { TTSProvider, ElevenLabsOptions } from '../types/tts.js';

// ElevenLabs プロバイダーの実装
export const createElevenLabsProvider = (
  options: ElevenLabsOptions
): TTSProvider => {
  const client = new ElevenLabsClient({
    apiKey: options.apiKey,
  });

  // デフォルト値
  const voiceId = options.voiceId || 'JBFqnCBsd6RMkjVDRZzb';
  const modelId = options.modelId || 'eleven_ttv_v3';
  const outputFormat = 'mp3_44100_128' as const;

  return {
    async convertTextToSpeech(text: string, outputPath: string): Promise<void> {
      try {
        const audioStream = await client.textToSpeech.convert(voiceId, {
          text,
          modelId,
          outputFormat,
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
