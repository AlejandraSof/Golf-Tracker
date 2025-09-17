import React, { useState, useEffect } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { Calendar, RefreshCw, Plus, ExternalLink, AlertCircle } from 'lucide-react';
import { googleCalendarService } from '../services/googleCalendar';
import { GolfLesson, CalendarEvent } from '../types';

interface CalendarSyncProps {
  isSignedIn: boolean;
  lessons: GolfLesson[];
  onSignIn: () => void;
  onUpdateLesson: (id: string, lesson: Partial<GolfLesson>) => void;
}

const CalendarSync: React.FC<CalendarSyncProps> = ({ 
  isSignedIn, 
  lessons, 
  onSignIn, 
  onUpdateLesson 
}) => {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCalendarEvents = async () => {
    if (!isSignedIn) return;

    setLoading(true);
    setError(null);
    
    try {
      // Fetch events from 30 days ago to 30 days from now
      const timeMin = subDays(new Date(), 30).toISOString();
      const timeMax = addDays(new Date(), 30).toISOString();
      
      const events = await googleCalendarService.getEvents(timeMin, timeMax);
      
      // Filter for potential golf-related events
      const golfEvents = events.filter(event => 
        event.summary && (
          event.summary.toLowerCase().includes('golf') ||
          event.summary.toLowerCase().includes('lesson') ||
          event.summary.toLowerCase().includes('practice') ||
          event.summary.toLowerCase().includes('instructor')
        )
      );
      
      setCalendarEvents(golfEvents);
    } catch (err) {
      setError('Failed to fetch calendar events. Please try again.');
      console.error('Error fetching calendar events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchCalendarEvents();
    }
  }, [isSignedIn]);

  const createLessonFromEvent = async (event: CalendarEvent) => {
    try {
      const startDate = new Date(event.start.dateTime);
      const endDate = new Date(event.end.dateTime);
      const duration = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));

      // Create a new lesson based on the calendar event
      const newLesson: Omit<GolfLesson, 'id'> = {
        title: event.summary,
        date: startDate,
        duration: duration,
        instructor: '',
        location: event.location || '',
        notes: event.description || '',
        skills_practiced: [],
        rating: 0,
        googleEventId: event.id
      };

      // You would typically call a function to add this lesson
      // For now, we'll just show a success message
      alert(`Lesson "${event.summary}" would be created. This feature needs to be connected to your lesson creation function.`);
    } catch (err) {
      console.error('Error creating lesson from event:', err);
      alert('Failed to create lesson from calendar event.');
    }
  };

  const syncLessonToCalendar = async (lesson: GolfLesson) => {
    if (!isSignedIn) {
      alert('Please sign in to Google Calendar first.');
      return;
    }

    try {
      const calendarEvent = {
        summary: lesson.title,
        start: {
          dateTime: lesson.date.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: new Date(lesson.date.getTime() + lesson.duration * 60000).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        location: lesson.location,
        description: `Golf Lesson Notes:\n\n${lesson.notes}\n\nSkills Practiced: ${lesson.skills_practiced.join(', ')}\n\nRating: ${'⭐'.repeat(lesson.rating)}`
      };

      const eventId = await googleCalendarService.createEvent(calendarEvent);
      
      if (eventId) {
        onUpdateLesson(lesson.id, { googleEventId: eventId });
        alert('Lesson successfully synced to Google Calendar!');
        fetchCalendarEvents(); // Refresh the events
      } else {
        alert('Failed to sync lesson to Google Calendar.');
      }
    } catch (err) {
      console.error('Error syncing lesson to calendar:', err);
      alert('Failed to sync lesson to Google Calendar.');
    }
  };

  if (!isSignedIn) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Connect Your Google Calendar</h3>
        <p className="text-gray-500 mb-6">
          Sync your golf lessons with Google Calendar to keep everything organized in one place.
        </p>
        <button onClick={onSignIn} className="btn-primary">
          Connect Google Calendar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Calendar Sync</h2>
        <button
          onClick={fetchCalendarEvents}
          disabled={loading}
          className="btn-secondary flex items-center"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Lessons to Sync */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sync Lessons to Google Calendar
        </h3>
        
        {lessons.filter(lesson => !lesson.googleEventId).length === 0 ? (
          <p className="text-gray-500">All lessons are synced with Google Calendar.</p>
        ) : (
          <div className="space-y-3">
            {lessons
              .filter(lesson => !lesson.googleEventId)
              .map(lesson => (
                <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                    <p className="text-sm text-gray-600">
                      {format(lesson.date, 'MMM dd, yyyy @ h:mm a')} • {lesson.duration} min
                    </p>
                  </div>
                  <button
                    onClick={() => syncLessonToCalendar(lesson)}
                    className="btn-primary flex items-center text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Sync to Calendar
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Calendar Events */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Golf-Related Calendar Events
        </h3>
        
        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin text-golf-500 mx-auto mb-2" />
            <p className="text-gray-500">Loading calendar events...</p>
          </div>
        ) : calendarEvents.length === 0 ? (
          <p className="text-gray-500">No golf-related events found in your calendar.</p>
        ) : (
          <div className="space-y-3">
            {calendarEvents.map(event => {
              const isAlreadyTracked = lessons.some(lesson => lesson.googleEventId === event.id);
              
              return (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.summary}</h4>
                    <p className="text-sm text-gray-600">
                      {format(new Date(event.start.dateTime), 'MMM dd, yyyy @ h:mm a')}
                      {event.location && ` • ${event.location}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isAlreadyTracked ? (
                      <span className="text-sm text-green-600 font-medium">✓ Tracked</span>
                    ) : (
                      <button
                        onClick={() => createLessonFromEvent(event)}
                        className="btn-secondary flex items-center text-sm"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Create Lesson
                      </button>
                    )}
                    <a
                      href={`https://calendar.google.com/calendar/event?eid=${event.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-golf-600 transition-colors"
                      title="View in Google Calendar"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">How Calendar Sync Works</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Automatically detects golf-related events in your calendar</li>
          <li>• Create lesson records from existing calendar events</li>
          <li>• Sync your lesson details back to Google Calendar</li>
          <li>• Keep your golf schedule organized in one place</li>
        </ul>
      </div>
    </div>
  );
};

export default CalendarSync;
