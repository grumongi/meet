// src/__tests__/Event.test.js
/* eslint-env jest */
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import React from 'react';

const mockEvent = {
  id: 'test123',
  summary: 'Learn JavaScript',
  location: 'London, UK',
  created: '2020-05-19T19:17:46.000Z',
  start: {
    dateTime: '2020-05-19T16:00:00+02:00',
    timeZone: 'Europe/Berlin',
  },
  description: 'This is a test description.',
};

describe('Event Component', () => {
  test('renders summary, time, and location', () => {
    render(<Event event={mockEvent} />);
    expect(screen.queryByText(mockEvent.summary)).toBeInTheDocument();
    expect(screen.queryByText(mockEvent.start.dateTime)).toBeInTheDocument();
    expect(screen.queryByText(mockEvent.location)).toBeInTheDocument();
  });

  test('hides details by default', () => {
    render(<Event event={mockEvent} />);
    expect(screen.queryByText(mockEvent.description)).not.toBeInTheDocument();
    expect(screen.getByText('Show Details')).toBeInTheDocument();
  });

  test('shows details when "Show Details" is clicked', () => {
    render(<Event event={mockEvent} />);
    fireEvent.click(screen.getByText('Show Details'));

    expect(screen.getByText(mockEvent.description)).toBeInTheDocument();
    expect(screen.getByText('Hide Details')).toBeInTheDocument();
  });

  test('hides details again when "Hide Details" is clicked', () => {
    render(<Event event={mockEvent} />);
    fireEvent.click(screen.getByText('Show Details'));
    fireEvent.click(screen.getByText('Hide Details'));

    expect(screen.queryByText(mockEvent.description)).not.toBeInTheDocument();
    expect(screen.getByText('Show Details')).toBeInTheDocument();
  });
});