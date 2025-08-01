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

// ElevenLabs 固有のオプション
export interface ElevenLabsOptions extends BaseTTSOptions {
  provider: 'elevenlabs';
  apiKey: string;
  voiceId?: string;
  modelId?: string;
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
