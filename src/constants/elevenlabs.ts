import type { ElevenLabsModelId } from '../types/elevenlabs.js';

/**
 * ElevenLabs のモデル ID 一覧
 * @see https://elevenlabs.io/docs/models
 */
export const ELEVENLABS_MODEL_IDS: ReadonlyArray<ElevenLabsModelId> = [
  'eleven_v3',
  'eleven_ttv_v3',
  'eleven_multilingual_v2',
  'eleven_flash_v2_5',
  'eleven_flash_v2',
  'eleven_turbo_v2_5',
  'eleven_turbo_v2',
  'eleven_multilingual_sts_v2',
  'eleven_multilingual_ttv_v2',
  'eleven_english_sts_v2',
  'eleven_monolingual_v1',
  'eleven_multilingual_v1',
] as const;

/**
 * デフォルト音声 ID
 */
export const DEFAULT_VOICE_ID = '4lOQ7A2l7HPuG7UIHiKA' as const;

/**
 * デフォルトモデル ID
 */
export const DEFAULT_MODEL_ID: ElevenLabsModelId = 'eleven_ttv_v3' as const;

/**
 * デフォルト出力フォーマット
 */
export const DEFAULT_OUTPUT_FORMAT = 'mp3_44100_128' as const;

/**
 * デフォルト読み上げスピード
 */
export const DEFAULT_SPEED = 1.0 as const;
