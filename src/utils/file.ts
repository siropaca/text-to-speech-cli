import { dirname, join } from 'node:path';

/**
 * 入力ファイルパスから出力ファイルパスを生成する
 * @param inputFilePath - 入力ファイルのパス
 * @param extension - 出力ファイルの拡張子（デフォルト: 'mp3'）
 * @returns 生成された出力ファイルパス
 */
export const generateOutputPath = (
  inputFilePath: string,
  extension: string = 'mp3'
): string => {
  const dir = dirname(inputFilePath);
  const lastSlashIndex = inputFilePath.lastIndexOf('/');
  const lastDotIndex = inputFilePath.lastIndexOf('.');

  // ファイル名部分を取得
  let baseName: string;
  if (lastDotIndex > lastSlashIndex) {
    // 拡張子がある場合
    baseName = inputFilePath.substring(lastSlashIndex + 1, lastDotIndex);
  } else {
    // 拡張子がない場合
    baseName = inputFilePath.substring(lastSlashIndex + 1);
  }

  return join(dir, `${baseName}.${extension}`);
};
