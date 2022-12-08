// assets
import { IconApps } from '@tabler/icons';

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const project = {
    id: 'project',
    title: 'Project',
    type: 'group',
    children: [
        {
            id: 'project',
            title: 'List Project',
            type: 'item',
            url: '/project',
            icon: IconApps,
            breadcrumbs: false,
            access: 'RPRO'
        }
    ]
};

export default project;
