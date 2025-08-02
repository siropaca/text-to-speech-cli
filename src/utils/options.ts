import type { TTSOptions, ProviderType } from '../types/index.js';

/**
 * CLI オプションの型定義
 */
export interface CliOptions {
  voiceId?: string;
  speed?: number;
  provider?: ProviderType;
}

/**
 * スピードの有効範囲
 */
export const SPEED_RANGE = {
  min: 0.7,
  max: 1.2,
} as const;

/**
 * スピードが有効な範囲内かを検証する
 * @param speed スピード値
 * @returns 有効な場合は true
 */
export const isValidSpeed = (speed: number): boolean => {
  return speed >= SPEED_RANGE.min && speed <= SPEED_RANGE.max;
};

/**
 * API キーを取得する
 * @param provider プロバイダー名
 * @returns API キー、またはundefined
 */
export const getApiKey = (provider: ProviderType): string | undefined => {
  const keyMap: Record<ProviderType, string> = {
    elevenlabs: 'ELEVENLABS_API_KEY',
    google: 'GOOGLE_API_KEY',
    amazon: 'AWS_ACCESS_KEY_ID',
  };

  const envKey = keyMap[provider];
  return process.env[envKey];
};

/**
 * Amazon Polly の認証情報を取得する
 * @returns 認証情報、または undefined
 */
const getAmazonCredentials = () => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || 'us-east-1';

  if (!accessKeyId || !secretAccessKey) {
    return undefined;
  }

  return { accessKeyId, secretAccessKey, region };
};

/**
 * TTS オプションを作成する
 * @param cliOptions CLI から受け取ったオプション
 * @param provider プロバイダー名
 * @returns TTS オプション
 * @throws {Error} API キーが設定されていない場合
 * @throws {Error} スピードが無効な範囲の場合
 */
export const createTTSOptions = (
  cliOptions: CliOptions,
  provider: ProviderType = 'elevenlabs'
): TTSOptions => {
  // スピードの検証
  if (cliOptions.speed !== undefined && !isValidSpeed(cliOptions.speed)) {
    throw new Error(
      `スピードは ${SPEED_RANGE.min} から ${SPEED_RANGE.max} の範囲で指定してください。`
    );
  }

  // プロバイダーごとのオプション作成
  switch (provider) {
    case 'elevenlabs': {
      const apiKey = getApiKey(provider);
      if (!apiKey) {
        throw new Error(
          'ELEVENLABS_API_KEY 環境変数が設定されていません。\n' +
            '.env ファイルを作成するか、環境変数を設定してください。'
        );
      }

      return {
        provider: 'elevenlabs',
        apiKey,
        voiceId: cliOptions.voiceId,
        speed: cliOptions.speed,
      };
    }

    case 'google': {
      const apiKey = getApiKey(provider);
      if (!apiKey) {
        throw new Error(
          'GOOGLE_API_KEY 環境変数が設定されていません。\n' +
            '.env ファイルを作成するか、環境変数を設定してください。'
        );
      }

      // 将来の実装用
      return {
        provider: 'google',
        apiKey,
        // 他のGoogle固有のオプション
      } as TTSOptions;
    }

    case 'amazon': {
      const credentials = getAmazonCredentials();
      if (!credentials) {
        throw new Error(
          'AWS_ACCESS_KEY_ID と AWS_SECRET_ACCESS_KEY 環境変数が設定されていません。\n' +
            '.env ファイルを作成するか、環境変数を設定してください。'
        );
      }

      return {
        provider: 'amazon',
        ...credentials,
        // 他のAmazon固有のオプション
      };
    }

    default:
      throw new Error(`サポートされていないプロバイダー: ${provider}`);
  }
};
