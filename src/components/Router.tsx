import { ElementType, ReactNode, Suspense, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';

import { authRoutes, nonAuthRoutes } from '@/constants/routes';
import { auth } from '@/firebase';

import Loader from './Loader/Loader';

const createRouter = ({
  path,
  layout,
  routes,
  redirectTo
}: {
  path: string;
  redirectTo: string;
  layout: ReactNode;
  routes: Array<{ path: string; element: ElementType }>;
}) =>
  createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path={path} element={layout}>
          {routes.map(({ path, element: Element }) => (
            <Route path={path} element={<Element />} />
          ))}
        </Route>
        <Route index element={<Navigate to={redirectTo} />} />
        <Route path="*" element={<Navigate to={redirectTo} />} />
      </>
    )
  );

const authRouter = createRouter(authRoutes);
const nonAuthRouter = createRouter(nonAuthRoutes);

const Router = () => {
  const [isAuth, setIsAuth] = useState(true);

  onAuthStateChanged(auth, function (user: unknown) {
    if (user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  });

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={isAuth ? authRouter : nonAuthRouter} />
    </Suspense>
  );
};

export default Router;
