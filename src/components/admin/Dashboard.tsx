import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Shield,
  Database,
  Activity,
  UserCheck,
  UserX,
  Eye,
  Calendar,
  Download,
  MessageSquare,
  Settings,
  FileText,
  BarChart3,
  PieChart,
  Globe,
  Bell,
  CreditCard,
  Flag,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Award,
  Target,
  Loader
} from 'lucide-react';
import { Line, Doughnut, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { usePlatformAnalytics } from '../../hooks/useFirebaseData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const { analytics, loading } = usePlatformAnalytics();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="h-6 w-6 animate-spin text-red-500" />
          <span className="text-gray-600 dark:text-gray-400">Loading admin dashboard...</span>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      name: 'Total Users', 
      value: analytics?.totalUsers?.toLocaleString() || '0', 
      icon: Users, 
      color: 'bg-blue-500', 
      change: '+12% this month', 
      trend: 'up' 
    },
    { 
      name: 'Active Courses', 
      value: analytics?.totalCourses?.toLocaleString() || '0', 
      icon: BookOpen, 
      color: 'bg-green-500', 
      change: '+8% this month', 
      trend: 'up' 
    },
    { 
      name: 'Monthly Revenue', 
      value: `$${analytics?.totalRevenue?.toLocaleString() || '0'}`, 
      icon: DollarSign, 
      color: 'bg-yellow-500', 
      change: '+15% this month', 
      trend: 'up' 
    },
    { 
      name: 'System Health', 
      value: '99.9%', 
      icon: Activity, 
      color: 'bg-purple-500', 
      change: 'All systems operational', 
      trend: 'stable' 
    },
    { 
      name: 'Active Students', 
      value: analytics?.activeUsers?.toLocaleString() || '0', 
      icon: UserCheck, 
      color: 'bg-indigo-500', 
      change: '+156 today', 
      trend: 'up' 
    },
    { 
      name: 'Active Teachers', 
      value: '2,456', 
      icon: Award, 
      color: 'bg-pink-500', 
      change: '+23 this week', 
      trend: 'up' 
    },
    { 
      name: 'Course Completion', 
      value: `${analytics?.courseCompletionRate?.toFixed(1) || '0'}%`, 
      icon: Target, 
      color: 'bg-emerald-500', 
      change: '+2.3% this month', 
      trend: 'up' 
    },
    { 
      name: 'Support Tickets', 
      value: '47', 
      icon: AlertTriangle, 
      color: 'bg-red-500', 
      change: '-12 resolved today', 
      trend: 'down' 
    },
  ];

  const userGrowthData = {
    labels: analytics?.userGrowth?.map(item => item.month) || [],
    datasets: [
      {
        label: 'New Users',
        data: analytics?.userGrowth?.map(item => item.users) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const userRoleData = {
    labels: ['Students', 'Teachers', 'Admins'],
    datasets: [
      {
        data: [analytics?.activeUsers || 0, 2456, 146],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(16, 185, 129)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const revenueData = {
    labels: analytics?.revenueData?.map(item => item.month) || [],
    datasets: [
      {
        label: 'Revenue ($)',
        data: analytics?.revenueData?.map(item => item.revenue) || [],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
    ],
  };

  const engagementData = {
    labels: ['Course Views', 'Lesson Completions', 'Quiz Attempts', 'Assignments Submitted', 'Forum Posts'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const recentUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Student', status: 'Active', joinDate: '2024-01-15', lastActive: '2 hours ago' },
    { id: 2, name: 'Dr. Robert Smith', email: 'robert@example.com', role: 'Teacher', status: 'Active', joinDate: '2024-01-10', lastActive: '1 hour ago' },
    { id: 3, name: 'Emily Davis', email: 'emily@example.com', role: 'Student', status: 'Suspended', joinDate: '2024-01-08', lastActive: '1 day ago' },
    { id: 4, name: 'Prof. Michael Brown', email: 'michael@example.com', role: 'Teacher', status: 'Pending', joinDate: '2024-01-12', lastActive: '30 min ago' },
  ];

  const pendingCourses = [
    { id: 1, title: 'Advanced Machine Learning', instructor: 'Dr. Sarah Chen', category: 'Technology', status: 'Pending Review', submitted: '2 days ago', students: 0 },
    { id: 2, title: 'Digital Marketing Mastery', instructor: 'John Wilson', category: 'Business', status: 'Under Review', submitted: '1 day ago', students: 0 },
    { id: 3, title: 'Creative Writing Workshop', instructor: 'Maria Garcia', category: 'Arts', status: 'Flagged', submitted: '3 days ago', students: 12 },
  ];

  const systemAlerts = [
    { id: 1, type: 'security', message: 'Multiple failed login attempts detected', severity: 'high', time: '5 min ago' },
    { id: 2, type: 'performance', message: 'Server response time increased by 15%', severity: 'medium', time: '1 hour ago' },
    { id: 3, type: 'content', message: 'Course content flagged for review', severity: 'medium', time: '2 hours ago' },
    { id: 4, type: 'payment', message: 'Payment gateway maintenance scheduled', severity: 'low', time: '4 hours ago' },
  ];

  const auditLogs = [
    { id: 1, admin: 'Michael Chen', action: 'User suspended', target: 'emily@example.com', timestamp: '2024-01-15 14:30:00' },
    { id: 2, admin: 'Michael Chen', action: 'Course approved', target: 'React Fundamentals', timestamp: '2024-01-15 13:45:00' },
    { id: 3, admin: 'Sarah Admin', action: 'Role updated', target: 'john@example.com', timestamp: '2024-01-15 12:20:00' },
    { id: 4, admin: 'Michael Chen', action: 'Announcement sent', target: 'All Users', timestamp: '2024-01-15 11:15:00' },
  ];

  const renderOverviewTab = () => (
    <div className="space-y-8">
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
            <div className="mt-4 flex items-center">
              <span className={`text-xs ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : stat.trend === 'down' ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Growth Trends</h3>
            <select 
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <Line data={userGrowthData} options={chartOptions} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Distribution</h3>
          <div className="flex justify-center">
            <div className="w-64 h-64">
              <Doughnut data={userRoleData} />
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Platform Engagement</h3>
          <div className="flex justify-center">
            <div className="w-64 h-64">
              <Pie data={engagementData} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Revenue</h3>
          <Bar data={revenueData} options={chartOptions} />
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">System Alerts</h2>
        </div>
        <div className="p-6 space-y-4">
          {systemAlerts.map((alert) => (
            <div key={alert.id} className={`flex items-center space-x-4 p-4 rounded-lg border ${
              alert.severity === 'high' ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20' :
              alert.severity === 'medium' ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20' :
              'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                alert.severity === 'high' ? 'bg-red-500' :
                alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{alert.type} • {alert.time}</p>
              </div>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUserManagementTab = () => (
    <div className="space-y-6">
      {/* User Management Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage all platform users and their permissions</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
          <button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="admin">Admins</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{user.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'Student' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                      user.role === 'Teacher' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      user.status === 'Suspended' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                      'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                      <Ban className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCourseManagementTab = () => (
    <div className="space-y-6">
      {/* Course Management Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Review, approve, and manage all platform courses</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Pending Courses */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Course Reviews</h3>
        </div>
        <div className="p-6 space-y-4">
          {pendingCourses.map((course) => (
            <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{course.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">by {course.instructor}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{course.category}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Submitted {course.submitted}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'Pending Review' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                    course.status === 'Under Review' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                    'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approve
                </button>
                <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                  <XCircle className="h-3 w-3 mr-1" />
                  Reject
                </button>
                <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                  <Eye className="h-3 w-3 mr-1" />
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Course Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics?.courseCompletionRate?.toFixed(1) || '0'}%</p>
              <p className="text-xs text-green-600 dark:text-green-400">+2.3% from last month</p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Session Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24.5 min</p>
              <p className="text-xs text-green-600 dark:text-green-400">+1.2 min from last month</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">User Retention</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">85.2%</p>
              <p className="text-xs text-red-600 dark:text-red-400">-1.1% from last month</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Support Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5</p>
              <p className="text-xs text-green-600 dark:text-green-400">+0.2 from last month</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Engagement Over Time</h3>
          <Line data={userGrowthData} options={chartOptions} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Breakdown</h3>
          <Bar data={revenueData} options={chartOptions} />
        </div>
      </div>
    </div>
  );

  const renderAuditLogsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Audit Logs</h2>
          <p className="text-gray-600 dark:text-gray-400">Track all administrative actions and system changes</p>
        </div>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="">All Actions</option>
            <option value="user">User Actions</option>
            <option value="course">Course Actions</option>
            <option value="system">System Actions</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {log.admin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.action.includes('suspended') || log.action.includes('deleted') ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                      log.action.includes('approved') || log.action.includes('updated') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {log.target}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Dashboard Overview', icon: BarChart3 },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'courses', name: 'Course Management', icon: BookOpen },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'communications', name: 'Communications', icon: MessageSquare },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'moderation', name: 'Moderation', icon: Shield },
    { id: 'audit', name: 'Audit Logs', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Super Admin Control Center 🛡️</h1>
            <p className="text-gray-300 mb-4">Complete platform management and oversight</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>Global Platform Control</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="h-4 w-4" />
                <span>Real-time Monitoring</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Advanced Security</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?w=200"
              alt="Admin control illustration"
              className="w-32 h-32 object-cover rounded-lg opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'users' && renderUserManagementTab()}
          {activeTab === 'courses' && renderCourseManagementTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
          {activeTab === 'audit' && renderAuditLogsTab()}
          {activeTab === 'communications' && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Communications Center</h3>
              <p className="text-gray-500 dark:text-gray-400">Platform-wide messaging and announcements coming soon</p>
            </div>
          )}
          {activeTab === 'payments' && (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Payment Management</h3>
              <p className="text-gray-500 dark:text-gray-400">Subscription and payment oversight coming soon</p>
            </div>
          )}
          {activeTab === 'moderation' && (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Content Moderation</h3>
              <p className="text-gray-500 dark:text-gray-400">Advanced moderation tools coming soon</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Platform Settings</h3>
              <p className="text-gray-500 dark:text-gray-400">Global configuration options coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}