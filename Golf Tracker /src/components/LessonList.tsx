import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, User, Star, Edit, Trash2, Target } from 'lucide-react';
import { GolfLesson } from '../types';
import LessonForm from './LessonForm';

interface LessonListProps {
  lessons: GolfLesson[];
  onUpdateLesson: (id: string, lesson: Partial<GolfLesson>) => void;
  onDeleteLesson: (id: string) => void;
}

const LessonList: React.FC<LessonListProps> = ({ lessons, onUpdateLesson, onDeleteLesson }) => {
  const [editingLesson, setEditingLesson] = useState<GolfLesson | null>(null);

  const sortedLessons = lessons.sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleEdit = (lesson: GolfLesson) => {
    setEditingLesson(lesson);
  };

  const handleUpdate = (updatedLesson: Omit<GolfLesson, 'id'>) => {
    if (editingLesson) {
      onUpdateLesson(editingLesson.id, updatedLesson);
      setEditingLesson(null);
    }
  };

  const handleDelete = (lessonId: string) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      onDeleteLesson(lessonId);
    }
  };

  if (editingLesson) {
    return (
      <LessonForm
        initialData={editingLesson}
        onSubmit={handleUpdate}
        onCancel={() => setEditingLesson(null)}
      />
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-golf-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-12 h-12 text-golf-500" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No lessons yet</h3>
        <p className="text-gray-500 mb-6">Start tracking your golf lessons to see your progress over time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Golf Lessons</h2>
        <p className="text-gray-500">{lessons.length} lesson{lessons.length !== 1 ? 's' : ''} recorded</p>
      </div>

      <div className="grid gap-6">
        {sortedLessons.map((lesson) => (
          <div key={lesson.id} className="card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                <div className="flex items-center text-gray-600 space-x-4 text-sm">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {format(lesson.date, 'MMM dd, yyyy')}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {lesson.duration} min
                  </span>
                  {lesson.instructor && (
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {lesson.instructor}
                    </span>
                  )}
                  {lesson.location && (
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {lesson.location}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {lesson.rating > 0 && (
                  <div className="flex items-center">
                    {[...Array(lesson.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                )}
                <button
                  onClick={() => handleEdit(lesson)}
                  className="p-2 text-gray-500 hover:text-golf-600 transition-colors"
                  title="Edit lesson"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(lesson.id)}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  title="Delete lesson"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {lesson.skills_practiced.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Target className="w-4 h-4 text-golf-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Skills Practiced:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lesson.skills_practiced.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-golf-100 text-golf-800 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {lesson.notes && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Notes:</h4>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {lesson.notes}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonList;
