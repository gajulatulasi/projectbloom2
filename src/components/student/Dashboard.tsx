import React from 'react';
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Zap,
  PlayCircle,
  FileText,
  Users,
  Star,
  Loader
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useStudentEnrollments, useUserAnalytics } from '../../hooks/useFirebaseData';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { enrollments, loading: enrollmentsLoading } = useStudentEnrollments(user?.id);
  const { analytics, loading: analyticsLoading } = useUserAnalytics(user?.id);

  if (enrollmentsLoading || analyticsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-gray-600 dark:text-gray-400">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      name: 'Courses Enrolled', 
      value: analytics?.totalCourses?.toString() || '0', 
      icon: BookOpen, 
      color: 'bg-blue-500', 
      change: `${enrollments.length} active` 
    },
    { 
      name: 'Hours Learned', 
      value: analytics?.totalHours?.toString() || '0', 
      icon: Clock, 
      color: 'bg-green-500', 
      change: '+8 this week' 
    },
    { 
      name: 'Achievements', 
      value: user?.badges?.length?.toString() || '0', 
      icon: Trophy, 
      color: 'bg-yellow-500', 
      change: '+3 new badges' 
    },
    { 
      name: 'Current Streak', 
      value: user?.streak?.toString() || '0', 
      icon: Zap, 
      color: 'bg-orange-500', 
      change: 'Keep it up!' 
    },
  ];

  const upcomingAssignments = [
    { id: 1, title: 'React Component Assignment', course: 'React Development', dueDate: 'Due Tomorrow', priority: 'high' },
    { id: 2, title: 'JavaScript Quiz', course: 'Advanced JavaScript', dueDate: 'Due in 3 days', priority: 'medium' },
    { id: 3, title: 'Design Portfolio', course: 'UI/UX Design', dueDate: 'Due in 1 week', priority: 'low' }
  ];

  const achievements = [
    { id: 1, name: 'First Course', icon: '🎓', earned: true, description: 'Completed your first course' },
    { id: 2, name: 'Quick Learner', icon: '⚡', earned: true, description: 'Completed 3 lessons in a day' },
    { id: 3, name: 'Streak Master', icon: '🔥', earned: false, description: 'Maintain a 30-day streak' },
    { id: 4, name: 'Perfect Score', icon: '💯', earned: false, description: 'Score 100% on 5 quizzes' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
            <p className="text-blue-100 mb-4">Ready to continue your learning journey?</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>Level {user?.level}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>{user?.xp} XP</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🔥</span>
                <span>{user?.streak} day streak</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=200"
              alt="Learning illustration"
              className="w-32 h-32 object-cover rounded-lg opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-green-600 dark:text-green-400">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Continue Learning</h2>
            </div>
            <div className="p-6 space-y-6">
              {enrollments.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses yet</h3>
                  <p className="text-gray-500 dark:text-gray-400">Start your learning journey by enrolling in a course!</p>
                </div>
              ) : (
                enrollments.slice(0, 3).map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer">
                    <img
                      src={enrollment.course.thumbnail || 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=300'}
                      alt={enrollment.course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {enrollment.course.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{enrollment.course.teacherName}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(enrollment.progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                        <PlayCircle className="h-3 w-3 mr-1" />
                        Continue
                      </button>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{enrollment.course.duration}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Assignments */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Assignments</h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    assignment.priority === 'high' ? 'bg-red-500' :
                    assignment.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {assignment.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{assignment.course}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{assignment.dueDate}</p>
                  </div>
                  <FileText className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h2>
            </div>
            <div className="p-6 space-y-3">
              {achievements.slice(0, 4).map((achievement) => (
                <div key={achievement.id} className={`flex items-center space-x-3 p-2 rounded-lg ${
                  achievement.earned ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-gray-50 dark:bg-gray-900/20'
                }`}>
                  <span className="text-lg">{achievement.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      achievement.earned ? 'text-yellow-800 dark:text-yellow-200' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {achievement.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}