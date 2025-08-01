import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { createWriteStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { dirname, join } from 'node:path';

export interface TextToSpeechOptions {
  apiKey: string;
  voiceId?: string;
  modelId?: string;
  outputFormat?: 'mp3';
}

export class TextToSpeech {
  private client: ElevenLabsClient;
  private voiceId: string;
  private modelId: string;
  private outputFormat: 'mp3_44100_128';

  constructor(options: TextToSpeechOptions) {
    this.client = new ElevenLabsClient({
      apiKey: options.apiKey,
    });
    this.voiceId = options.voiceId || 'JBFqnCBsd6RMkjVDRZzb';
    this.modelId = options.modelId || 'eleven_multilingual_v2';
    this.outputFormat = 'mp3_44100_128';
  }

  async convertTextToSpeech(text: string, outputPath: string): Promise<void> {
    try {
      const audioStream = await this.client.textToSpeech.convert(this.voiceId, {
        text,
        modelId: this.modelId,
        outputFormat: this.outputFormat,
      });

      const writeStream = createWriteStream(outputPath);
      await pipeline(audioStream, writeStream);
    } catch (error) {
      throw new Error(
        `Failed to convert text to speech: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async convertFileToSpeech(
    inputFilePath: string,
    outputFilePath: string
  ): Promise<void> {
    const text = await readFile(inputFilePath, 'utf-8');

    await this.convertTextToSpeech(text, outputFilePath);
  }

  static generateOutputPath(
    inputFilePath: string,
    extension: string = 'mp3'
  ): string {
    const dir = dirname(inputFilePath);
    const baseName = inputFilePath.substring(
      inputFilePath.lastIndexOf('/') + 1,
      inputFilePath.lastIndexOf('.')
    );
    return join(dir, `${baseName}.${extension}`);
  }
}
