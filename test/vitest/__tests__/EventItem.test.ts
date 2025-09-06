import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import EventItem from 'src/events/components/EventItem.vue';

installQuasarPlugin();

describe('EventItem Component', () => {
  it('should mount component with event data', async () => {
    expect(EventItem).toBeTruthy();
    const wrapper = mount(EventItem, {
      attachTo: document.body,
      props: {
        event: {
          organisation: 'Test Centre 1',
          type: 'Carers of people living with dementia',
          event: 'Wellness and Pamper Day for Older Carers',
          date: 'Monday, 1 October 2016',
          location: 'Gosford',
          district: 'Central Coast',
          json: '{"organisation":"Test Centre 1","type":"Carers of people living with dementia","event":"Wellness and Pamper Day for Older Carers","date":"Monday, 1 October 2016","location":"Gosford","district":"Central Coast","id":"event-001","dt":1475289600}',
          id: 'event-001',
          dt: 1475289600,
        },
      },
    });

    expect(wrapper.html()).toContain('Wellness and Pamper Day for Older Carers');
    expect(wrapper.text()).toContain('Monday, 1 October 2016');
    expect(wrapper.text()).toContain('Test Centre 1');
    expect(wrapper.text()).toContain('Gosford');
    expect(wrapper.text()).toContain('Central Coast');
    expect(wrapper.text()).toContain('Carers of people living with dementia');

    wrapper.vm.focusEvent();
    expect(wrapper.emitted('eventFocused')).toBeTruthy();
    expect(document.activeElement?.className).toContain('event-card');

    await wrapper.find('div.event-card').trigger('dblclick:pre');
    expect(wrapper.emitted('eventSelected')).toBeTruthy();

    document.body.focus();

    await wrapper.find('div.event-card').trigger('keydown.enter');
    expect(wrapper.emitted('eventSelected')).toBeTruthy();
  });
});
