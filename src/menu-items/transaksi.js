// assets
import { IconCreditCard, IconShoppingCartPlus, IconTruckDelivery } from '@tabler/icons';

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const transaksi = {
    id: 'transaksi',
    title: 'Transaksi',
    type: 'group',
    children: [
        {
            id: 'PurchaseOrder',
            title: 'PO',
            type: 'item',
            url: '/transaksi/po',
            icon: IconCreditCard,
            breadcrumbs: false,
            access: 'RPO'
        },
        {
            id: 'DeliveryOrder',
            title: 'DO',
            type: 'item',
            url: '/transaksi/do',
            icon: IconTruckDelivery,
            breadcrumbs: false,
            access: 'RDO'
        },
        {
            id: 'ReciveOrder',
            title: 'RO',
            type: 'item',
            url: '/transaksi/ro-ho',
            icon: IconShoppingCartPlus,
            breadcrumbs: false,
            access: 'RROPODO'
        },
        {
            id: 'ReciveOrderWitel',
            title: 'RO Witel',
            type: 'item',
            url: '/transaksi/ro-witel',
            icon: IconShoppingCartPlus,
            breadcrumbs: false,
            access: 'RROPODOBW'
        }
    ]
};

export default transaksi;
