// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const kas = {
    id: 'kas',
    title: 'Kas',
    type: 'group',
    children: [
        {
            id: 'kas-masuk',
            title: 'Masuk',
            type: 'item',
            url: '/kas/masuk',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            roleAllow: ['Super Admin', 'Owner']
        },
        {
            id: 'kas-keluar',
            title: 'Keluar',
            type: 'item',
            url: '/kas/keluar',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            roleAllow: ['Super Admin', 'Owner']
        }
    ]
};

export default kas;
