// project imports
import UserBasedGuard from 'guards/UserBasedGuard';
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const User = Loadable(lazy(() => import('views/User')));
const UserDetail = Loadable(lazy(() => import('views/UserDetail')));
const Role = Loadable(lazy(() => import('views/Role')));
const RoleDetail = Loadable(lazy(() => import('views/RoleDetail')));
const Brand = Loadable(lazy(() => import('views/Brand')));
const Product = Loadable(lazy(() => import('views/Product')));
const Stok = Loadable(lazy(() => import('views/Stok')));
const Region = Loadable(lazy(() => import('views/Region')));
const Witel = Loadable(lazy(() => import('views/Witel')));
const WitelDetail = Loadable(lazy(() => import('views/WitelDetail')));
const WitelStok = Loadable(lazy(() => import('views/WitelStok')));
const StokWitel = Loadable(lazy(() => import('views/StokWitel')));
const Package = Loadable(lazy(() => import('views/Package')));
const PackageDesignator = Loadable(lazy(() => import('views/PackageDesignator')));
const Supplier = Loadable(lazy(() => import('views/Supplier')));
const Job = Loadable(lazy(() => import('views/Job')));
const Designator = Loadable(lazy(() => import('views/Designator')));

const Project = Loadable(lazy(() => import('views/Project')));
const ProjectDetail = Loadable(lazy(() => import('views/ProjectDetail')));
const ProjectJob = Loadable(lazy(() => import('views/ProjectJob')));
const Home = Loadable(lazy(() => import('views/Home')));

// transaksi
const PO = Loadable(lazy(() => import('views/Po')));
const DO = Loadable(lazy(() => import('views/Do')));
const RoHo = Loadable(lazy(() => import('views/RoHo')));
const RoWitel = Loadable(lazy(() => import('views/RoWitel')));

const MainRoutes = {
    path: '/',
    element: (
        <UserBasedGuard>
            <MainLayout />
        </UserBasedGuard>
    ),
    children: [
        {
            path: '/',
            element: <Home key="" />
        },
        {
            path: '/transaksi',
            children: [
                {
                    path: '/po',
                    element: <PO />
                },
                {
                    path: '/do',
                    element: <DO />
                },
                {
                    path: '/ro-ho',
                    element: <RoHo />
                },
                {
                    path: '/ro-witel',
                    element: <RoWitel />
                }
            ]
        },
        {
            path: '/master',
            children: [
                {
                    path: '/user',
                    element: <User />
                },
                {
                    path: '/user/:id',
                    element: <UserDetail />
                },
                {
                    path: '/role',
                    element: <Role />
                },
                {
                    path: '/role/:id',
                    element: <RoleDetail />
                },
                {
                    path: '/brand',
                    element: <Brand />
                },
                {
                    path: '/product',
                    element: <Product />
                },
                {
                    path: '/stok',
                    element: <Stok />
                },
                {
                    path: '/stok-witel',
                    element: <StokWitel />
                },
                {
                    path: '/region',
                    element: <Region />
                },
                {
                    path: '/witel',
                    element: <Witel />
                },
                {
                    path: '/witel/user/:id',
                    element: <WitelDetail />
                },
                {
                    path: '/witel/stok/:id',
                    element: <WitelStok />
                },
                {
                    path: '/supplier',
                    element: <Supplier />
                },
                {
                    path: '/package',
                    element: <Package />
                },
                {
                    path: '/package/designator/:id',
                    element: <PackageDesignator />
                },
                {
                    path: '/job',
                    element: <Job />
                },
                {
                    path: '/designator',
                    element: <Designator />
                }
            ]
        },
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
                }
            ]
        }
    ]
};

export default MainRoutes;
