export interface GolfLesson {
  id: string;
  title: string;
  date: Date;
  duration: number; // in minutes
  instructor: string;
  location: string;
  notes: string;
  skills_practiced: string[];
  rating: number; // 1-5 stars
  googleEventId?: string;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  location?: string;
  description?: string;
}
