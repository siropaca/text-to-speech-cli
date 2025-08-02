import type { BaseTTSOptions } from './common.js';

/**
 * ElevenLabs オプション
 */
export interface ElevenLabsOptions extends BaseTTSOptions {
  provider: 'elevenlabs';
  apiKey: string;
  voiceId?: string;
  outputFormat?: 'mp3';
  speed?: number;
}

/**
 * ElevenLabs のモデル ID の型定義
 * @see https://elevenlabs.io/docs/models
 */
export type ElevenLabsModelId =
  | 'eleven_v3'
  | 'eleven_ttv_v3'
  | 'eleven_multilingual_v2'
  | 'eleven_flash_v2_5'
  | 'eleven_flash_v2'
  | 'eleven_turbo_v2_5'
  | 'eleven_turbo_v2'
  | 'eleven_multilingual_sts_v2'
  | 'eleven_multilingual_ttv_v2'
  | 'eleven_english_sts_v2'
  | 'eleven_monolingual_v1'
  | 'eleven_multilingual_v1';
