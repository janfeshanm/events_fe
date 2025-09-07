import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
//import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AudioController from 'src/events/components/AudioController.vue';

installQuasarPlugin();

describe('Search Event Component', () => {
  it('should mount component with data', () => {
    expect(AudioController).toBeTruthy();
  });
});
