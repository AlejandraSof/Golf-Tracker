import { CalendarEvent } from '../types';

// Google Calendar API configuration
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events';

// You'll need to replace this with your actual Google API client ID
const CLIENT_ID = 'your-google-client-id.apps.googleusercontent.com';
const API_KEY = 'your-google-api-key';

class GoogleCalendarService {
  private gapi: any;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    await new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).gapi) {
        (window as any).gapi.load('client:auth2', resolve);
      } else {
        // If gapi is not available, resolve immediately to prevent hanging
        resolve(undefined);
      }
    });

    this.gapi = (window as any).gapi;

    // Only initialize if gapi is available
    if (this.gapi && this.gapi.client) {
      await this.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [DISCOVERY_DOC],
        scope: SCOPES
      });
    }

    this.isInitialized = true;
  }

  async signIn(): Promise<boolean> {
    try {
      await this.initialize();
      const authInstance = this.gapi.auth2.getAuthInstance();
      
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }
      
      return authInstance.isSignedIn.get();
    } catch (error) {
      console.error('Error signing in:', error);
      return false;
    }
  }

  async signOut(): Promise<void> {
    try {
      const authInstance = this.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  isSignedIn(): boolean {
    if (!this.isInitialized || !this.gapi?.auth2) return false;
    return this.gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  async getEvents(timeMin?: string, timeMax?: string): Promise<CalendarEvent[]> {
    try {
      await this.initialize();
      
      if (!this.isSignedIn()) {
        throw new Error('User not signed in');
      }

      const response = await this.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: timeMin || new Date().toISOString(),
        timeMax: timeMax,
        showDeleted: false,
        singleEvents: true,
        maxResults: 100,
        orderBy: 'startTime'
      });

      return response.result.items || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  async createEvent(event: Partial<CalendarEvent>): Promise<string | null> {
    try {
      await this.initialize();
      
      if (!this.isSignedIn()) {
        throw new Error('User not signed in');
      }

      const response = await this.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      return response.result.id;
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  }

  async updateEvent(eventId: string, event: Partial<CalendarEvent>): Promise<boolean> {
    try {
      await this.initialize();
      
      if (!this.isSignedIn()) {
        throw new Error('User not signed in');
      }

      await this.gapi.client.calendar.events.update({
        calendarId: 'primary',
        eventId: eventId,
        resource: event
      });

      return true;
    } catch (error) {
      console.error('Error updating event:', error);
      return false;
    }
  }

  async deleteEvent(eventId: string): Promise<boolean> {
    try {
      await this.initialize();
      
      if (!this.isSignedIn()) {
        throw new Error('User not signed in');
      }

      await this.gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId
      });

      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  }
}

export const googleCalendarService = new GoogleCalendarService();
