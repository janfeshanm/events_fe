import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ASearchEvents from 'src/events/components/ASearchEvents.vue';

installQuasarPlugin();

describe('Search Event Component', () => {
  it('should mount component with data', async () => {
    expect(ASearchEvents).toBeTruthy();
    const wrapper = mount(ASearchEvents, {
      attachTo: document.body,
      props: {
        shadowText: '',
        modelValue: {
          text: '',
          date: { from: '2023-01-01', to: '2023-12-31' },
        },
        filterList: {
          dt: [1672531200, 1704067200],
        },
      },
    });

    expect(wrapper.exists()).toBeTruthy();
    wrapper.vm.focusSearchInput();
    expect(document.activeElement).toBe(wrapper.find('input').element);
  });
});
