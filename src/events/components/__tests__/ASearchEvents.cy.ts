import ASearchEvents from '../ASearchEvents.vue';

describe('QuasarButton', () => {
  /*   beforeEach(() => {
    cy.injectAxe();
  }); */
  it('renders a message', () => {
    cy.mount(ASearchEvents, {
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

    cy.get('html').invoke('css', 'background-color', '#1469be');
    cy.get('input').type('wel');
    cy.screenshot();
    cy.dataCy('dateRange').click();
    cy.screenshot();
  });
  /*   it('Has no a11y violations after asynchronous load', () => {
    // Retry the check if there are initial failures
    cy.checkA11y(undefined, {
      retries: 3,
      interval: 100,
    });
  }); */
});
