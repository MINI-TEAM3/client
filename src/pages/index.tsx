import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const App = lazy(() => import('@/App'));
const Login = lazy(() => import('@/pages/Login'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const Calendar = lazy(() => import('@/pages/Calendar'));
const RequestList = lazy(() => import('@/pages/RequestList'));
const UserInfo = lazy(() => import('@/pages/UserInfo'));
const Layout = lazy(() => import('@/pages/Layout'));
const Password = lazy(() => import('@/pages/Password'));
const Attendance = lazy(() => import('@/pages/Attendance'));

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Calendar />,
          },
          {
            path: '/request',
            element: <RequestList />,
          },
          {
            path: '/userinfo',
            element: <UserInfo />,
          },
          {
            path: '/password',
            element: <Password />,
          },
          {
            path: '/attendance',
            element: <Attendance />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
