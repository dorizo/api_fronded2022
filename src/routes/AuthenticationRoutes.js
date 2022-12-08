import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import GuestGuard from 'guards/GuestGuard';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/authentication/Login')));
const AuthRegister3 = Loadable(lazy(() => import('views/authentication/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: (
        <GuestGuard>
            <MinimalLayout />
        </GuestGuard>
    ),
    children: [
        {
            path: '/login',
            element: <AuthLogin3 />
        },
        {
            path: '/register',
            element: <AuthRegister3 />
        }
    ]
};

export default AuthenticationRoutes;
