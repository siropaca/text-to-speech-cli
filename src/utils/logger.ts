/**
 * ログレベルの定義
 */
export type LogLevel = 'info' | 'success' | 'warning' | 'error';

/**
 * ログメッセージの色を定義するマップ
 */
const COLOR_MAP: Record<LogLevel, string> = {
  info: '\x1b[36m', // シアン
  success: '\x1b[32m', // 緑
  warning: '\x1b[33m', // 黄色
  error: '\x1b[31m', // 赤
};

/**
 * ロガーのインターフェース
 */
export interface Logger {
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
  log: (level: LogLevel, message: string) => void;
}

/**
 * ログメッセージをフォーマットする
 * @param level ログレベル
 * @param message メッセージ
 * @returns フォーマットされたメッセージ
 */
const formatMessage = (level: LogLevel, message: string): string => {
  const color = COLOR_MAP[level];
  const reset = '\x1b[0m';

  // ログレベルごとのプレフィックス
  const prefixes: Record<LogLevel, string> = {
    info: '',
    success: '✨ ',
    warning: '⚠️  ',
    error: '❌ ',
  };

  const prefix = prefixes[level];
  return `${color}${prefix}${message}${reset}`;
};

/**
 * ロガーインスタンスを作成する
 * @returns ロガーインスタンス
 */
export const createLogger = (): Logger => {
  const log = (level: LogLevel, message: string): void => {
    const formattedMessage = formatMessage(level, message);

    if (level === 'error') {
      console.error(formattedMessage);
    } else {
      console.log(formattedMessage);
    }
  };

  return {
    info: (message: string) => log('info', message),
    success: (message: string) => log('success', message),
    warning: (message: string) => log('warning', message),
    error: (message: string) => log('error', message),
    log,
  };
};

/**
 * デフォルトのロガーインスタンス
 */
export const logger = createLogger();
