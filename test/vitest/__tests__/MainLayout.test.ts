import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MainLayout from 'src/layouts/MainLayout.vue';

installQuasarPlugin();

describe('Main Layout', () => {
  it('Should mount layout properly', () => {
    const wrapper = mount(MainLayout);
    expect(wrapper.exists()).toBeTruthy();
  });
});
