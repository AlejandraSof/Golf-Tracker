import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Star, Target } from 'lucide-react';
import { GolfLesson } from '../types';

interface LessonFormProps {
  onSubmit: (lesson: Omit<GolfLesson, 'id'>) => void;
  onCancel: () => void;
  initialData?: Partial<GolfLesson>;
}

const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    date: initialData?.date ? initialData.date.toISOString().slice(0, 16) : '',
    duration: initialData?.duration || 60,
    instructor: initialData?.instructor || '',
    location: initialData?.location || '',
    notes: initialData?.notes || '',
    skills_practiced: initialData?.skills_practiced || [],
    rating: initialData?.rating || 0
  });

  const [newSkill, setNewSkill] = useState('');

  const commonSkills = [
    'Driving', 'Iron Play', 'Putting', 'Chipping', 'Pitching', 
    'Sand Play', 'Course Management', 'Mental Game', 'Swing Mechanics'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date) {
      alert('Please fill in the required fields (Title and Date)');
      return;
    }

    onSubmit({
      title: formData.title,
      date: new Date(formData.date),
      duration: formData.duration,
      instructor: formData.instructor,
      location: formData.location,
      notes: formData.notes,
      skills_practiced: formData.skills_practiced,
      rating: formData.rating
    });
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills_practiced.includes(skill)) {
      setFormData({
        ...formData,
        skills_practiced: [...formData.skills_practiced, skill]
      });
    }
    setNewSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills_practiced: formData.skills_practiced.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {initialData ? 'Edit Lesson' : 'Add New Golf Lesson'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lesson Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            placeholder="e.g., Weekly lesson with Pro Smith"
            required
          />
        </div>

        {/* Date and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date & Time *
            </label>
            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Duration (minutes)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
              className="input-field"
              min="15"
              max="240"
              step="15"
            />
          </div>
        </div>

        {/* Instructor and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Instructor
            </label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="input-field"
              placeholder="Instructor name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input-field"
              placeholder="Golf course or facility"
            />
          </div>
        </div>

        {/* Skills Practiced */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Target className="w-4 h-4 inline mr-1" />
            Skills Practiced
          </label>
          
          {/* Common Skills */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-2">
              {commonSkills.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  disabled={formData.skills_practiced.includes(skill)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    formData.skills_practiced.includes(skill)
                      ? 'bg-golf-100 text-golf-700 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-golf-100 hover:text-golf-700'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Skill Input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newSkill))}
              className="input-field flex-1"
              placeholder="Add custom skill..."
            />
            <button
              type="button"
              onClick={() => addSkill(newSkill)}
              className="btn-secondary"
            >
              Add
            </button>
          </div>

          {/* Selected Skills */}
          {formData.skills_practiced.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.skills_practiced.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 bg-golf-100 text-golf-800 text-sm rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-golf-600 hover:text-golf-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Star className="w-4 h-4 inline mr-1" />
            Lesson Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="text-2xl transition-colors"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= formData.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="input-field h-32 resize-none"
            placeholder="What did you work on? What did you learn? Any goals for next lesson?"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            {initialData ? 'Update Lesson' : 'Save Lesson'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;
