import React from 'react';
import { render, within  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { test, expect, describe, beforeEach } from '@jest/globals';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;

  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]} setCurrentCity={() => { }} setInfoAlert={() => { }}/>);
  });

  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });
});

test('updates list of suggestions correctly when user types in city textbox', async () => {
  const user = userEvent.setup();
  const allEvents = await getEvents();
  const allLocations = extractLocations(allEvents);
  const { queryByRole, queryAllByRole } = render(
    <CitySearch allLocations={allLocations} setInfoAlert={() => { }} />
  );

  const cityTextBox = queryByRole('textbox');
  await user.type(cityTextBox, 'Berlin');

  const suggestions = allLocations
  ? allLocations.filter((location) =>
      typeof location === 'string' &&
      location.toUpperCase().includes('BERLIN')
    )
  : [];

  const suggestionListItems = queryAllByRole('listitem');
  expect(suggestionListItems).toHaveLength(suggestions.length + 1); // +1 for "See all cities"
  suggestions.forEach((suggestion, i) => {
    expect(suggestionListItems[i].textContent).toBe(suggestion);
  });
});

test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
   const user = userEvent.setup();
   const allEvents = await getEvents();
   const allLocations = extractLocations(allEvents);
   const CitySearchComponent = render(
     <CitySearch
       allLocations={allLocations}
       setCurrentCity={() => { }}
       setInfoAlert={() => { }}
     />
   );

   const cityTextBox = CitySearchComponent.queryByRole('textbox');
   await user.type(cityTextBox, "Berlin");

   // the suggestion's textContent look like this: "Berlin, Germany"
   const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

   await user.click(BerlinGermanySuggestion);

   expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
 });

// New integration scope starts here
describe('<CitySearch /> integration', () => {
test('renders suggestions list when the app is rendered.', async () => {
   const user = userEvent.setup();
   const AppComponent = render(<App />);
   const AppDOM = AppComponent.container.firstChild;


   const CitySearchDOM = AppDOM.querySelector('#city-search');
   const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
   await user.click(cityTextBox);


   const allEvents = await getEvents();
   const allLocations = extractLocations(allEvents);


   const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
   expect(suggestionListItems.length).toBe(allLocations.length + 1);
});

});