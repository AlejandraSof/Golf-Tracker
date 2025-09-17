# Golf Lesson Tracker

A modern web application for tracking your golf lessons and syncing them with Google Calendar.

## Features

- 📅 **Lesson Tracking**: Record detailed information about your golf lessons
- ⭐ **Progress Monitoring**: Rate your lessons and track skills practiced
- 📱 **Modern UI**: Clean, responsive design with a golf-themed color scheme
- 🔄 **Google Calendar Sync**: Two-way sync with your Google Calendar
- 📝 **Detailed Notes**: Keep track of what you learned and practiced
- 🎯 **Skills Tracking**: Monitor which skills you're working on

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- A Google Cloud project with Calendar API enabled

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd golf-lesson-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Google Calendar API:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Calendar API
   - Create credentials (OAuth 2.0 client ID)
   - Add your domain to authorized origins

4. Update the Google API configuration:
   - Open `src/services/googleCalendar.ts`
   - Replace `CLIENT_ID` and `API_KEY` with your actual values

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Usage

### Adding Lessons

1. Click "Add Lesson" in the navigation
2. Fill in the lesson details:
   - Title (required)
   - Date and time (required)
   - Duration
   - Instructor name
   - Location
   - Skills practiced
   - Rating (1-5 stars)
   - Notes

### Google Calendar Integration

1. Click "Connect Google Calendar" in the header
2. Sign in with your Google account
3. Grant permissions for calendar access
4. Use the "Calendar Sync" tab to:
   - Import golf-related events from your calendar
   - Sync your lessons to Google Calendar
   - View and manage calendar integration

### Managing Lessons

- View all lessons in the "My Lessons" tab
- Edit lessons by clicking the edit icon
- Delete lessons with the trash icon
- Lessons are automatically saved to browser storage

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Calendar Integration**: Google Calendar API

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with auth
│   ├── LessonForm.tsx  # Add/edit lesson form
│   ├── LessonList.tsx  # Display lessons
│   └── CalendarSync.tsx # Google Calendar integration
├── hooks/              # Custom React hooks
│   └── useGolfLessons.ts # Lesson management
├── services/           # External services
│   └── googleCalendar.ts # Google Calendar API
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Configuration

### Google Calendar API Setup

1. **Create a Google Cloud Project**:
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project

2. **Enable the Calendar API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

3. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Configure the consent screen
   - Add authorized origins (e.g., `http://localhost:3000`)

4. **Update the App**:
   - Copy your Client ID and API Key
   - Update `src/services/googleCalendar.ts`

### Environment Variables (Optional)

Create a `.env` file for sensitive configuration:

```env
VITE_GOOGLE_CLIENT_ID=your-client-id
VITE_GOOGLE_API_KEY=your-api-key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
