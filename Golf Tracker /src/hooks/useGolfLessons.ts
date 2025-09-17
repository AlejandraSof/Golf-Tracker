import { useState, useEffect } from 'react';
import { GolfLesson } from '../types';

export const useGolfLessons = () => {
  const [lessons, setLessons] = useState<GolfLesson[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load lessons from localStorage on mount
    const savedLessons = localStorage.getItem('golfLessons');
    if (savedLessons) {
      const parsedLessons = JSON.parse(savedLessons).map((lesson: any) => ({
        ...lesson,
        date: new Date(lesson.date)
      }));
      setLessons(parsedLessons);
    }
  }, []);

  const saveLessons = (updatedLessons: GolfLesson[]) => {
    setLessons(updatedLessons);
    localStorage.setItem('golfLessons', JSON.stringify(updatedLessons));
  };

  const addLesson = (lesson: Omit<GolfLesson, 'id'>) => {
    const newLesson: GolfLesson = {
      ...lesson,
      id: Date.now().toString()
    };
    saveLessons([...lessons, newLesson]);
  };

  const updateLesson = (id: string, updatedLesson: Partial<GolfLesson>) => {
    const updatedLessons = lessons.map(lesson =>
      lesson.id === id ? { ...lesson, ...updatedLesson } : lesson
    );
    saveLessons(updatedLessons);
  };

  const deleteLesson = (id: string) => {
    const updatedLessons = lessons.filter(lesson => lesson.id !== id);
    saveLessons(updatedLessons);
  };

  const getLessonById = (id: string): GolfLesson | undefined => {
    return lessons.find(lesson => lesson.id === id);
  };

  return {
    lessons,
    loading,
    addLesson,
    updateLesson,
    deleteLesson,
    getLessonById,
    setLoading
  };
};
