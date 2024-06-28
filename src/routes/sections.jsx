import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const EmployeePage = lazy(() => import('src/pages/employee'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignupPage = lazy(() => import('src/pages/signup'));
export const RequestPasswordResetPage = lazy(() => import('src/pages/request-password-reset'));
export const VerifyResetOTPPage = lazy(() => import('src/pages/verify-reset-otp'));
export const AssetsPage = lazy(() => import('src/pages/assets'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'employees', element: <EmployeePage /> },
        { path: 'assets', element: <AssetsPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: 'request-password-reset',
      element: <RequestPasswordResetPage />,
    },
    {
      path: 'verify-reset-otp',
      element: <VerifyResetOTPPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
