import EventItem from '../EventItem.vue';

describe('QuasarButton', () => {
  it('renders a message', () => {
    cy.mount(EventItem, {
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
          audio: '',
          image: '',
        },
      },
    });

    cy.get('div.event-card').should('contain', 'Wellness and Pamper Day for Older Carers');
    cy.screenshot();
  });
});
