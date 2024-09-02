import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';

export const nonAuthRoutes = {
  layout: null,
  redirectTo: '/signup',
  routes: [
    {
      path: '/signup',
      element: lazy(() => import('@/pages/SignupPage'))
    },
    {
      path: '/login',
      element: lazy(() => import('@/pages/LoginPage'))
    },
    {
      path: '/register',
      element: lazy(() => import('@/pages/RegisterPage'))
    }
  ]
};

export const authRoutes = {
  layout: <Layout />,
  redirectTo: '/feed',
  routes: [
    {
      path: 'feed',
      element: lazy(() => import('@/pages/FeedPage'))
    },
    {
      path: 'profile',
      element: lazy(() => import('@/pages/ProfilePage'))
    },
    {
      path: 'profile/following',
      element: lazy(() => import('@/pages/FollowingPage'))
    },
    {
      path: 'profile/followers',
      element: lazy(() => import('@/pages/FollowersPage'))
    },
  ]
};
