// 基本的な型定義
export type { TTSProvider, ProviderType, BaseTTSOptions } from './common.js';

// ElevenLabs 関連の型
export type { ElevenLabsOptions, ElevenLabsModelId } from './elevenlabs.js';

// ElevenLabs 関連の定数
export { ELEVENLABS_MODEL_IDS } from '../constants/elevenlabs.js';

// Google TTS 関連の型
export type { GoogleTTSOptions } from './google.js';

// Amazon Polly 関連の型
export type { AmazonPollyOptions } from './amazon.js';

// 統合型定義
import type { ElevenLabsOptions } from './elevenlabs.js';
import type { GoogleTTSOptions } from './google.js';
import type { AmazonPollyOptions } from './amazon.js';

/**
 * 全てのプロバイダーオプションの型
 */
export type TTSOptions =
  | ElevenLabsOptions
  | GoogleTTSOptions
  | AmazonPollyOptions;
