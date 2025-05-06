# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# meet

**# App Key Features:**

**1. Filter Events by City.**

User Story:

As a user,
I should be able to filter events by city,
so that I can quickly find events happening in my desired location.

Scenario 1: Show all upcoming events when no city is selected
  Given the user is on the events page
  And the user has not searched for a city
  When the page loads
  Then the user should see a list of upcoming events from all cities

Scenario 2: Show city suggestions as user types
  Given the user is on the events page
  When the user starts typing a city name into the search field
  Then the user should see a list of matching city suggestions

Scenario 3: Filter events by selected city
  Given the user has typed a city name
  And the city appears in the suggestion list
  When the user selects a city from the suggestion list
  Then the user should see only the events happening in the selected city


**2. Show/Hide Event Details.**

User Story:

As a user,  
I should be able to expand or collapse event details,  
so that I can view more information about an event when needed and keep the interface clean.

Scenario 1: An event element is collapsed by default  
  Given the user is on the events page  
  When the page loads  
  Then all event elements should be collapsed, showing only basic information (e.g., event name, date, and location)

Scenario 2: User can expand an event to see details  
  Given the user is on the events page  
  And the event elements are collapsed  
  When the user clicks on an event's "Show Details" button  
  Then the event element should expand to display additional details (e.g., description, organizer, and link)

Scenario 3: User can collapse an event to hide details  
  Given the user has expanded an event to view its details  
  When the user clicks on the event's "Hide Details" button  
  Then the event element should collapse, hiding the additional details and showing only the basic information

**3. Specify Number of Events.**

User Story:

As a user,  
I should be able to specify the number of events displayed,  
so that I can control how many events I see at a time.

Scenario 1: When user hasn’t specified a number, 32 events are shown by default  
  Given the user is on the events page  
  And the user has not specified the number of events to display  
  When the page loads  
  Then the user should see a list of 32 events by default

Scenario 2: User can change the number of events displayed  
  Given the user is on the events page  
  And the user wants to see a specific number of events  
  When the user changes the number of events in the settings  
  Then the user should see the specified number of events displayed


**4. Use the App When Offline.**

User Story:

As a user,  
I should be able to use the app when offline,  
so that I can still view cached event data and understand when changes cannot be made.

Scenario 1: Show cached data when there’s no internet connection  
  Given the user is offline  
  When the user opens the app  
  Then the user should see cached event data from their last session

Scenario 2: Show error when user changes search settings (city, number of events)  
  Given the user is offline  
  When the user tries to change the search settings (e.g., city or number of events)  
  Then the user should see an error message indicating that the app is offline and changes cannot be made


**5. Add an App Shortcut to the Home Screen.**

User Story:

As a user,  
I should be able to add the app as a shortcut to my device home screen,  
so that I can quickly access the app without opening a browser.

Scenario 1: User can install the meet app as a shortcut on their device home screen  
  Given the user is using a compatible browser or device  
  When the user is prompted to install the app  
  Then the user should be able to add the app as a shortcut to their home screen


**6. Display Charts Visualizing Event Details.**

User Story:

As a user,  
I should be able to view charts visualizing event details,  
so that I can better understand the distribution of events.

Scenario 1: Show a chart with the number of upcoming events in each city  
  Given the user is on the events page  
  When the user views the event details section  
  Then the user should see a chart displaying the number of upcoming events in each city
