import { useState, useEffect } from 'react';
import { CourseService } from '../services/courseService';
import { AnalyticsService } from '../services/analyticsService';
import { Course, Analytics } from '../types';

export function useCourses(filters?: {
  teacherId?: string;
  category?: string;
  level?: string;
  isPublished?: boolean;
  limit?: number;
}) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await CourseService.getCourses(filters);
        setCourses(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [JSON.stringify(filters)]);

  return { courses, loading, error, refetch: () => fetchCourses() };
}

export function useStudentEnrollments(studentId: string | undefined) {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const data = await CourseService.getStudentEnrollments(studentId);
        setEnrollments(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [studentId]);

  return { enrollments, loading, error };
}

export function usePlatformAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await AnalyticsService.getPlatformAnalytics();
        setAnalytics(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { analytics, loading, error };
}

export function useUserAnalytics(userId: string | undefined) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await AnalyticsService.getUserAnalytics(userId);
        setAnalytics(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId]);

  return { analytics, loading, error };
}

export function useTeacherAnalytics(teacherId: string | undefined) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teacherId) {
      setLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await AnalyticsService.getTeacherAnalytics(teacherId);
        setAnalytics(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [teacherId]);

  return { analytics, loading, error };
}