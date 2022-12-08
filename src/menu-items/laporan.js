// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const laporan = {
    id: 'laporan',
    title: 'Laporan',
    type: 'group',
    children: [
        {
            id: 'payment',
            title: 'Payment',
            type: 'item',
            url: '/laporan/payment',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            roleAllow: ['Super Admin']
        },
        {
            id: 'inventory',
            title: 'Inventory',
            type: 'item',
            url: '/laporan/inventory',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            roleAllow: ['Super Admin']
        },
        {
            id: 'buku-besar',
            title: 'Buku besar',
            type: 'item',
            url: '/laporan/buku-besar',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            roleAllow: ['Super Admin']
        }
    ]
};

export default laporan;
