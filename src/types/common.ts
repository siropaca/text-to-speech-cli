/**
 * TTS プロバイダーの基本インターフェース
 */
export interface TTSProvider {
  convertTextToSpeech(text: string, outputPath: string): Promise<void>;
}

/**
 * プロバイダータイプの定義
 */
export type ProviderType =
  | 'elevenlabs'
  | 'google' // 未実装
  | 'amazon'; // 未実装

/**
 * 基本的な TTS オプション
 */
export interface BaseTTSOptions {
  provider: ProviderType;
}
