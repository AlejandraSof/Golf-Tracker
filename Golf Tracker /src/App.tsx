import React, { useState, useEffect } from 'react';
import { Calendar, Plus, User } from 'lucide-react';
import { googleCalendarService } from './services/googleCalendar';
import { useGolfLessons } from './hooks/useGolfLessons';
import LessonList from './components/LessonList';
import LessonForm from './components/LessonForm';
import CalendarSync from './components/CalendarSync';
import Header from './components/Header';

function App() {
  const [currentView, setCurrentView] = useState<'lessons' | 'calendar' | 'add'>('lessons');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { lessons, addLesson, updateLesson, deleteLesson } = useGolfLessons();

  useEffect(() => {
    // Check if user is already signed in
    const checkSignInStatus = async () => {
      try {
        await googleCalendarService.initialize();
        setIsSignedIn(googleCalendarService.isSignedIn());
      } catch (error) {
        console.error('Error checking sign-in status:', error);
      }
    };

    checkSignInStatus();
  }, []);

  const handleSignIn = async () => {
    const success = await googleCalendarService.signIn();
    setIsSignedIn(success);
  };

  const handleSignOut = async () => {
    await googleCalendarService.signOut();
    setIsSignedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isSignedIn={isSignedIn}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            <button
              onClick={() => setCurrentView('lessons')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'lessons'
                  ? 'bg-golf-500 text-white'
                  : 'text-gray-600 hover:text-golf-600 hover:bg-white'
              }`}
            >
              <User className="w-5 h-5 mr-2" />
              My Lessons
            </button>
            <button
              onClick={() => setCurrentView('calendar')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'calendar'
                  ? 'bg-golf-500 text-white'
                  : 'text-gray-600 hover:text-golf-600 hover:bg-white'
              }`}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Calendar Sync
            </button>
            <button
              onClick={() => setCurrentView('add')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'add'
                  ? 'bg-golf-500 text-white'
                  : 'text-gray-600 hover:text-golf-600 hover:bg-white'
              }`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Lesson
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {currentView === 'lessons' && (
            <LessonList 
              lessons={lessons}
              onUpdateLesson={updateLesson}
              onDeleteLesson={deleteLesson}
            />
          )}
          
          {currentView === 'calendar' && (
            <CalendarSync 
              isSignedIn={isSignedIn}
              lessons={lessons}
              onSignIn={handleSignIn}
              onUpdateLesson={updateLesson}
            />
          )}
          
          {currentView === 'add' && (
            <LessonForm 
              onSubmit={(lesson) => {
                addLesson(lesson);
                setCurrentView('lessons');
              }}
              onCancel={() => setCurrentView('lessons')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
