import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppComponent;

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    when('the list of events is displayed', () => {
      // No action needed, already rendered
    });

    then('each event element should be collapsed by default', () => {
      const eventDetails = AppComponent.container.querySelectorAll('.event-details');
      expect(eventDetails.length).toBe(0); // No details shown by default
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    let detailsButton;
    given('the list of events is displayed', () => {
      AppComponent = render(<App />);
    });

    when(/^the user clicks on the "(.*)" button of an event$/, async (buttonText) => {
      detailsButton = await screen.findByRole('button', { name: buttonText });
      await userEvent.click(detailsButton);
    });

    then('the event element should expand to show its details', () => {
      const eventDetails = AppComponent.container.querySelectorAll('.event-details');
      expect(eventDetails.length).toBeGreaterThan(0); // At least one details section is shown
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    let detailsButton;
    given('an event is expanded to show details', async () => {
      AppComponent = render(<App />);
      detailsButton = await screen.findByRole('button', { name: /show details/i });
      await userEvent.click(detailsButton); // Expand
      // Now details should be visible
      expect(AppComponent.container.querySelectorAll('.event-details').length).toBeGreaterThan(0);
    });

    when(/^the user clicks on the "(.*)" button$/, async (buttonText) => {
      detailsButton = await screen.findByRole('button', { name: buttonText });
      await userEvent.click(detailsButton); // Collapse
    });

    then('the event element should collapse to hide its details', () => {
      const eventDetails = AppComponent.container.querySelectorAll('.event-details');
      expect(eventDetails.length).toBe(0); // Details hidden again
    });
  });
});
