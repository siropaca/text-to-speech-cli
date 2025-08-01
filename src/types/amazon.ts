import type { BaseTTSOptions } from './common.js';

/**
 * (未実装) Amazon Polly オプション
 */
export interface AmazonPollyOptions extends BaseTTSOptions {
  provider: 'amazon';
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  voiceId?: string;
  engine?: 'standard' | 'neural';
  outputFormat?: 'mp3' | 'ogg_vorbis' | 'pcm';
}
