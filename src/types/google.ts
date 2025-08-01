import type { BaseTTSOptions } from './common.js';

/**
 * (未実装) Google オプション
 */
export interface GoogleTTSOptions extends BaseTTSOptions {
  provider: 'google';
  apiKey: string;
  languageCode?: string;
  voice?: {
    name?: string;
    ssmlGender?: 'MALE' | 'FEMALE' | 'NEUTRAL';
  };
  audioConfig?: {
    audioEncoding?: 'MP3' | 'LINEAR16' | 'OGG_OPUS';
    speakingRate?: number;
    pitch?: number;
  };
}
