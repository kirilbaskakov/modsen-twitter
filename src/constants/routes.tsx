import { lazy } from 'react';

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
      path: 'tweets/:id',
      element: lazy(() => import('@/pages/TweetPage'))
    },
    {
      path: 'feed',
      element: lazy(() => import('@/pages/FeedPage'))
    },
    {
      path: 'search',
      element: lazy(() => import('@/pages/SearchPage'))
    },
    {
      path: 'profile/:id',
      element: lazy(() => import('@/pages/ProfilePage'))
    },
    {
      path: 'profile/:id/following',
      element: lazy(() => import('@/pages/FollowingPage'))
    },
    {
      path: 'profile/:id/followers',
      element: lazy(() => import('@/pages/FollowersPage'))
    }
  ]
};
