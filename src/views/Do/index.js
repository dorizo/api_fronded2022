import { Button, Chip, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import DialogConfirm from 'components/DialogConfirm';
import DOProvider, { useDO } from 'hooks/useDo';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { DELETE_DO, GET_ALL_ITEM, GET_DOS } from 'services/do';
import MainCard from 'ui-component/cards/MainCard';
import statusColor from 'utils/statusColor';
import useTable from '../../hooks/useTable/index';
import Action from './Action';
import DialogSelectItem from './DialogSelectItem';
import FormStep from './FormStep';

const headCells = [
    {
        id: 'docodee',
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

    const { data, isLoading, refetch } = useQuery('GET_DOS', GET_DOS);

    const { setIsDetail, setOpenFS, SnackBarComponent, snackBarOpen, doo, setDo } = useDO();

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
        const item = await GET_ALL_ITEM(itemSelected.do_id);
        const items =
            item &&
            item.data.data.map((i) => {
                const it = {
                    id: i.item_id,
                    productName: i.product.product_name,
                    productId: i.product.product_id,
                    brandName: i.product.brand_name,
                    productPortion: i.product.product_portion,
                    qty: i.item_qty,
                    stockId: i.product.stock_id,
                    maxQty: i.product.stock_qty,
                    harga: i.product.stock_price,
                    total: i.item_total
                };
                return it;
            });
        setDo({
            ...doo,
            id: itemSelected.do_id,
            date: itemSelected.do_date,
            doCode: itemSelected.do_code,
            status: itemSelected.do_status,
            subTotal: parseFloat(itemSelected.do_subtotal),
            total: parseFloat(itemSelected.do_grandtotal),
            charge: parseFloat(itemSelected.do_charge),
            witelId: itemSelected.witel_id,
            items
        });
        setLoading(false);
        setAnchorEl(null);
        setOpenFS(true);
    };
    // HANDLE ALERT
    const handleAlertOpen = (text) => {
        setAlertText(text);
        setAlertOpen(true);
    };
    const handleDetail = async () => {
        setLoading(true);
        const item = await GET_ALL_ITEM(itemSelected.do_id);
        const items =
            item &&
            item.data.data.map((i) => {
                const it = {
                    id: i.item_id,
                    productName: i.product.product_name,
                    productId: i.product.product_id,
                    brandName: i.product.brand_name,
                    productPortion: i.product.product_portion,
                    qty: i.item_qty,
                    stockId: i.product.stock_id,
                    maxQty: i.product.stock_qty,
                    harga: i.product.stock_price,
                    total: i.item_total
                };
                return it;
            });
        setDo({
            ...doo,
            id: itemSelected.do_id,
            date: itemSelected.do_date,
            doCode: itemSelected.do_code,
            status: itemSelected.do_status,
            subTotal: parseFloat(itemSelected.do_subtotal),
            total: parseFloat(itemSelected.do_grandtotal),
            charge: parseFloat(itemSelected.do_charge),
            witelId: itemSelected.witel_id,
            items
        });
        setLoading(false);
        setAnchorEl(null);

        setOpenFS(true);
        setIsDetail(true);
    };
    const handleAlertClose = () => {
        setAlertText('');
        setAlertOpen(false);
    };

    const deleteMutation = useMutation((params) => DELETE_DO(params.id), {
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
        deleteMutation.mutate({ id: itemSelected.do_id });
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
                <Typography variant="h4">Delivery order </Typography>
                <Button onClick={() => setOpenFS(true)} variant="contained">
                    Tambah
                </Button>
            </div>
            {list &&
                TableComponent(
                    list.map((row, index) => (
                        <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                            <TableCell padding="checkbox">{index + 1}</TableCell>
                            <TableCell>{row.do_code}</TableCell>
                            <TableCell>{row.do_date}</TableCell>
                            <TableCell>
                                <Chip label={row.do_status} style={{ color: '#fff' }} color={statusColor(row.do_status)} size="small" />
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
            <DialogSelectItem />
        </MainCard>
    );
}

export default function Index() {
    return (
        <DOProvider>
            <Content />
        </DOProvider>
    );
}
