Feature: Specify Number of Events

  Scenario: When user hasn’t specified a number, 32 events are shown by default
    Given the user opens the app
    And the list of upcoming events is displayed
    Then the user should see 32 events by default

  Scenario: User can change the number of events displayed
    Given the user has opened the app
    And the list of upcoming events is displayed
    When the user enters a specific number in the "Number of Events" input field
    Then the app should display that number of events
