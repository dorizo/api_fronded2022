import { Button, Chip, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import DialogConfirm from 'components/DialogConfirm';
import POProvider, { usePO } from 'hooks/usePo';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { DELETE_PO, GET_ALL_ITEM, GET_POS } from 'services/po';
import MainCard from 'ui-component/cards/MainCard';
import statusColor from 'utils/statusColor';
import useTable from '../../hooks/useTable/index';
import Action from './Action';
import FormStep from './FormStep';

const headCells = [
    {
        id: 'pocode',
        numeric: false,
        disablePadding: true,
        label: 'Code'
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: true,
        label: 'Tanggal'
    },
    // {
    //     id: 'supplier',
    //     numeric: false,
    //     disablePadding: true,
    //     label: 'Supplier'
    // },
    {
        id: 'stsatus',
        numeric: false,
        disablePadding: true,
        label: 'Status'
    }
];

function Content() {
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [itemSelected, setItemSelected] = React.useState(null);

    const { data, isLoading, refetch } = useQuery('GET_POS', GET_POS);

    const { setIsDetail, setOpenFS, SnackBarComponent, snackBarOpen, po, setPo } = usePO();

    const rows = data && data.data.data;
    const { TableComponent, list } = useTable({
        header: headCells,
        rows,
        loading: isLoading
    });
    // HANDLE ACTION
    const handleActionOpen = (event, item) => {
        setItemSelected(item);
        setAnchorEl(event.currentTarget);
    };
    const handleActionClose = () => {
        setItemSelected(null);
        setAnchorEl(null);
    };
    // HANDLE MODAL
    const handleEdit = async () => {
        setLoading(true);
        const item = await GET_ALL_ITEM(itemSelected.po_id);
        const items =
            item &&
            item.data.data.map((i) => {
                const it = { productId: i.product_id, id: i.item_id, qty: i.item_qty, total: i.item_total, harga: i.item_price };
                return it;
            });
        setPo({
            ...po,
            id: itemSelected.po_id,
            date: itemSelected.po_date,
            noPo: itemSelected.po_code,
            subTotal: parseFloat(itemSelected.po_subtotal),
            total: parseFloat(itemSelected.po_grandtotal),
            charge: parseFloat(itemSelected.po_charge),
            supplierId: itemSelected.supplier_id,
            items
        });
        setAnchorEl(null);
        setLoading(false);
        setOpenFS(true);
    };
    // HANDLE ALERT
    const handleAlertOpen = (text) => {
        setAlertText(text);
        setAlertOpen(true);
    };
    const handleDetail = async () => {
        setLoading(true);
        const item = await GET_ALL_ITEM(itemSelected.po_id);
        const items =
            item &&
            item.data.data.map((i) => {
                const it = { productId: i.product_id, id: i.item_id, qty: i.item_qty, total: i.item_total, harga: i.item_price };
                return it;
            });
        setPo({
            ...po,
            id: itemSelected.po_id,
            date: itemSelected.po_date,
            noPo: itemSelected.po_code,
            status: itemSelected.po_status,
            subTotal: parseFloat(itemSelected.po_subtotal),
            total: parseFloat(itemSelected.po_grandtotal),
            charge: parseFloat(itemSelected.po_charge),
            supplierId: itemSelected.supplier_id,
            items
        });
        setAnchorEl(null);
        setOpenFS(true);
        setIsDetail(true);
        setLoading(false);
    };
    const handleAlertClose = () => {
        setAlertText('');
        setAlertOpen(false);
    };

    const deleteMutation = useMutation((params) => DELETE_PO(params.id), {
        onSuccess: async (response) => {
            await refetch();
            await snackBarOpen(response.data.success.message, 'success');
            handleAlertClose();
            setItemSelected(null);
        },
        onError: async (e) => {
            await snackBarOpen(e.message, 'error');
        }
    });

    const onDelete = async () => {
        deleteMutation.mutate({ id: itemSelected.po_id });
    };
    const handleConfirm = async () => {
        handleActionClose();
        await onDelete();
    };

    const actionOpen = Boolean(anchorEl);
    const processing = loading || isLoading || deleteMutation.isLoading;
    return (
        <MainCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Purchase order </Typography>
                <Button onClick={() => setOpenFS(true)} variant="contained">
                    Tambah
                </Button>
            </div>
            {list &&
                TableComponent(
                    list.map((row, index) => (
                        <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                            <TableCell padding="checkbox">{index + 1}</TableCell>
                            <TableCell>{row.po_code}</TableCell>
                            <TableCell>{row.po_date}</TableCell>
                            <TableCell>
                                <Chip label={row.po_status} style={{ color: '#fff' }} color={statusColor(row.po_status)} size="small" />
                            </TableCell>
                        </TableRow>
                    ))
                )}
            {actionOpen && (
                <Action
                    itemSelected={itemSelected}
                    handleDetail={handleDetail}
                    actionOpen={actionOpen}
                    handleEdit={handleEdit}
                    handelDelete={() => handleAlertOpen('Apakah yakin mau delete')}
                    anchorEl={anchorEl}
                    actionClose={handleActionClose}
                />
            )}
            {alertOpen && (
                <DialogConfirm
                    processing={processing}
                    alertClose={handleAlertClose}
                    alertOpen={alertOpen}
                    handleConfirm={handleConfirm}
                    text={alertText}
                />
            )}
            <SnackBarComponent />
            <FormStep />
        </MainCard>
    );
}

export default function Index() {
    return (
        <POProvider>
            <Content />
        </POProvider>
    );
}
