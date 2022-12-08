import { Container } from '@mui/material';
import Navbar from 'components/Navbar';
import UserBasedGuard from 'guards/UserBasedGuard';
import { lazy } from 'react';
import { Outlet } from 'react-router';
// project imports
import Loadable from 'ui-component/Loadable';

// login option 3 routing
const Project = Loadable(lazy(() => import('views/Mobilev2/Home')));
const ProjectDetail = Loadable(lazy(() => import('views/Mobile/DetailProject')));
const ProjectJob = Loadable(lazy(() => import('views/ProjectJob')));
const ListFile = Loadable(lazy(() => import('views/Mobile/DetailProject/Documents')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const MobileRoutes = {
    path: '/mobile',
    element: (
        <UserBasedGuard>
            <Container maxWidth="sm" style={{ paddingTop: 0, paddingBottom: 20, paddingLeft: 0, paddingRight: 0 }}>
                <Navbar />
                <Outlet />
            </Container>
        </UserBasedGuard>
    ),
    children: [
        {
            path: '/project',
            children: [
                {
                    path: '/',
                    element: <Project />
                },
                {
                    path: '/detail/:idProject',
                    element: <ProjectDetail />
                },
                {
                    path: '/job/:idProject',
                    element: <ProjectJob />
                },
                {
                    path: '/detail/file/:dir/:projectId',
                    element: <ListFile />
                }
            ]
        }
    ]
};

export default MobileRoutes;
