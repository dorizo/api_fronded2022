// assets
import {
    IconDashboard,
    IconMap,
    IconMapPins,
    IconRun,
    IconShoppingCart,
    IconSitemap,
    IconTextWrapDisabled,
    IconTicket,
    IconTools,
    IconTrademark,
    IconUser
} from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const master = {
    id: 'master',
    title: 'Master',
    type: 'group',
    children: [
        {
            id: 'User',
            title: 'User',
            type: 'item',
            url: '/master/user',
            icon: IconUser,
            breadcrumbs: false,
            access: 'RU'
        },
        {
            id: 'Role',
            title: 'Role',
            type: 'item',
            url: '/master/role',
            icon: IconTools,
            breadcrumbs: false,
            access: 'RR'
        },
        {
            id: 'Brand',
            title: 'Brand',
            type: 'item',
            url: '/master/brand',
            icon: IconTrademark,
            breadcrumbs: false,
            access: 'RB'
        },
        {
            id: 'Product',
            title: 'Product',
            type: 'item',
            url: '/master/product',
            icon: IconShoppingCart,
            breadcrumbs: false,
            access: 'RPP'
        },
        {
            id: 'Stok',
            title: 'Stok HO',
            type: 'item',
            url: '/master/stok',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            access: 'RSTOCKHO'
        },
        {
            id: 'Stok-w',
            title: 'Stok Witel',
            type: 'item',
            url: '/master/stok-witel',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            access: 'RSTOCKBYWITEL'
        },
        {
            id: 'Region',
            title: 'Region',
            type: 'item',
            url: '/master/region',
            icon: IconMap,
            breadcrumbs: false,
            access: 'RRR'
        },
        {
            id: 'Witel',
            title: 'Witel',
            type: 'item',
            url: '/master/witel',
            icon: IconMapPins,
            breadcrumbs: false,
            access: 'RW'
        },
        {
            id: 'Supplier',
            title: 'Supplier',
            type: 'item',
            url: '/master/supplier',
            icon: IconSitemap,
            breadcrumbs: false,
            access: 'RS'
        },
        {
            id: 'Package',
            title: 'Package',
            type: 'item',
            url: '/master/package',
            icon: IconTicket,
            breadcrumbs: false,
            access: 'RP'
        },
        {
            id: 'Designator',
            title: 'Designator',
            type: 'item',
            url: '/master/designator',
            icon: IconTextWrapDisabled,
            breadcrumbs: false,
            access: 'RD'
        },
        {
            id: 'Job',
            title: 'Job',
            type: 'item',
            url: '/master/job',
            icon: IconRun,
            breadcrumbs: false,
            access: 'RJ'
        }
    ]
};

export default master;
