export interface EventCreateRequest {
  // TODO: Define properties based on API documentation for event creation
  title: string;
  description: string;
  // ... other fields like date, location, etc.
}

export interface EventDetail {
  // TODO: Define properties based on API documentation for event details
  id: string;
  title: string;
  description: string;
  // ... other fields
}

export interface EventListItem {
  // TODO: Define properties based on API documentation for event list items
  id: string;
  title: string;
  // ... other fields
}

export interface RecommendRequest {
  eventType: 'CONTENT' | 'GROUP';
  startTime?: string; // date-time
  endTime?: string; // date-time
  address?: string;
}

export interface CalendarContentRequest {
  activityId: number;
  selectedDate: string; // date-time
}
