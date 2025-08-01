// TTS プロバイダーの基本インターフェース
export interface TTSProvider {
  convertTextToSpeech(text: string, outputPath: string): Promise<void>;
}

// プロバイダータイプの定義
export type ProviderType = 'elevenlabs' | 'google' | 'amazon';

// 基本的な TTS オプション
export interface BaseTTSOptions {
  provider: ProviderType;
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

// ElevenLabs 固有のオプション
export interface ElevenLabsOptions extends BaseTTSOptions {
  provider: 'elevenlabs';
  apiKey: string;
  voiceId?: string;
  modelId?: ElevenLabsModelId;
  outputFormat?: 'mp3';
}

// 将来の Google TTS オプション例
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

// 将来の Amazon Polly オプション例
export interface AmazonPollyOptions extends BaseTTSOptions {
  provider: 'amazon';
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  voiceId?: string;
  engine?: 'standard' | 'neural';
  outputFormat?: 'mp3' | 'ogg_vorbis' | 'pcm';
}

// 全てのプロバイダーオプションの型
export type TTSOptions =
  | ElevenLabsOptions
  | GoogleTTSOptions
  | AmazonPollyOptions;
