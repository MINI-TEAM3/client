import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Calendar from '@/pages/Calendar';
import RequestList from '@/pages/RequestList';
import UserInfo from '@/pages/UserInfo';
import Layout from '@/pages/Layout';
import Password from '@/pages/Password';
import Attendance from '@/pages/Attendance';

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
