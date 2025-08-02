import { describe, it, expect } from '@jest/globals';
import {
  ELEVENLABS_MODEL_IDS,
  DEFAULT_VOICE_ID,
  DEFAULT_MODEL_ID,
  DEFAULT_OUTPUT_FORMAT,
} from './elevenlabs.js';
import type { ElevenLabsModelId } from '../types/elevenlabs.js';

describe('ElevenLabs Constants', () => {
  describe('ELEVENLABS_MODEL_IDS', () => {
    it('定数配列が正しく定義されている', () => {
      expect(ELEVENLABS_MODEL_IDS).toBeInstanceOf(Array);
      expect(ELEVENLABS_MODEL_IDS.length).toBeGreaterThan(0);
    });

    it('すべてのモデル ID が文字列である', () => {
      ELEVENLABS_MODEL_IDS.forEach((modelId) => {
        expect(typeof modelId).toBe('string');
        expect(modelId.length).toBeGreaterThan(0);
      });
    });

    it('期待されるモデル ID が含まれている', () => {
      const expectedModels = [
        'eleven_v3',
        'eleven_ttv_v3',
        'eleven_multilingual_v2',
        'eleven_flash_v2_5',
        'eleven_flash_v2',
        'eleven_turbo_v2_5',
        'eleven_turbo_v2',
        'eleven_multilingual_sts_v2',
        'eleven_multilingual_ttv_v2',
        'eleven_english_sts_v2',
        'eleven_monolingual_v1',
        'eleven_multilingual_v1',
      ];

      expectedModels.forEach((expectedModel) => {
        expect(ELEVENLABS_MODEL_IDS).toContain(expectedModel);
      });
    });

    it('重複するモデル ID がない', () => {
      const uniqueModels = [...new Set(ELEVENLABS_MODEL_IDS)];
      expect(uniqueModels.length).toBe(ELEVENLABS_MODEL_IDS.length);
    });

    it('型が正しく推論される', () => {
      const modelId: ElevenLabsModelId = 'eleven_ttv_v3';
      expect(ELEVENLABS_MODEL_IDS).toContain(modelId);
    });
  });

  describe('デフォルト値', () => {
    it('DEFAULT_VOICE_ID が正しく定義されている', () => {
      expect(typeof DEFAULT_VOICE_ID).toBe('string');
      expect(DEFAULT_VOICE_ID.length).toBeGreaterThan(0);
      expect(DEFAULT_VOICE_ID).toBe('4lOQ7A2l7HPuG7UIHiKA');
    });

    it('DEFAULT_MODEL_ID が正しく定義されている', () => {
      expect(typeof DEFAULT_MODEL_ID).toBe('string');
      expect(DEFAULT_MODEL_ID).toBe('eleven_ttv_v3');
      expect(ELEVENLABS_MODEL_IDS).toContain(DEFAULT_MODEL_ID);
    });

    it('DEFAULT_OUTPUT_FORMAT が正しく定義されている', () => {
      expect(typeof DEFAULT_OUTPUT_FORMAT).toBe('string');
      expect(DEFAULT_OUTPUT_FORMAT).toBe('mp3_44100_128');
    });
  });
});
