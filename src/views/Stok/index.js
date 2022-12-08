import { TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import DialogConfirm from 'components/DialogConfirm';
import useSnackbar from 'components/SnackBar';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from 'services/product';
import { STOCK_ALL_HO } from 'services/stock';
import MainCard from 'ui-component/cards/MainCard';
import convertToRupiah from 'utils/curency';
import useTable from '../../hooks/useTable/index';
import Action from './Action';
import DialogComponent from './DialogComponent';

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Nama Product'
    },
    {
        id: 'portion',
        numeric: false,
        disablePadding: true,
        label: 'Portion'
    },
    {
        id: 'brand',
        numeric: false,
        disablePadding: true,
        label: 'Brand Name'
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: true,
        label: 'Price'
    },
    {
        id: 'qty',
        numeric: false,
        disablePadding: true,
        label: 'QTY'
    }
];

export default function Index() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [itemSelected, setItemSelected] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const { data, isLoading, refetch } = useQuery('STOCK_ALL_HO', STOCK_ALL_HO);

    const { snackBarOpen, SnackBarComponent } = useSnackbar();

    const rows = data && data.data.data;
    const { TableComponent, list } = useTable({
        header: headCells,
        rows,
        loading: isLoading
    });
    // HANDLE ACTION
    // const handleActionOpen = (event, item) => {
    //     setItemSelected(item);
    //     setAnchorEl(event.currentTarget);
    // };
    const handleActionClose = () => {
        setItemSelected(null);
        setAnchorEl(null);
    };
    // HANDLE MODAL
    const handleEdit = () => {
        setDialogOpen(true);
    };
    // HANDLE ALERT
    const handleAlertOpen = (text) => {
        setAlertText(text);
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertText('');
        setAlertOpen(false);
    };
    // ACTION
    const deleteMutation = useMutation((params) => DELETE_PRODUCT(params.id), {
        onSuccess: async () => {
            await refetch();
            await snackBarOpen('Success delete user', 'success');
            handleActionClose();
            handleAlertClose();
            setItemSelected(null);
        },
        onError: async (e) => {
            await snackBarOpen(e.message, 'error');
        }
    });
    // HANDLE ACTION
    const onAdd = async (data, callbackSetError) => {
        setLoading(true);
        const response = await ADD_PRODUCT(data);
        if (response.status === 400) {
            callbackSetError(response.data.error.form);
        }
        if (response.status === 200) {
            await refetch();
            await snackBarOpen(response.data.success.message, 'success');
            setDialogOpen(false);
            handleActionClose();
        }
        await setLoading(false);
    };
    const onUpdate = async (data, id, callbackSetError) => {
        setLoading(true);
        const response = await UPDATE_PRODUCT(data, id);
        if (response.status === 400) {
            callbackSetError(response.data.error.form);
        }
        if (response.status === 200) {
            await refetch();
            await snackBarOpen(response.data.success.message, 'success');
            handleActionClose();
            setDialogOpen(false);
            setItemSelected(null);
        }
        await setLoading(false);
    };
    const onDelete = async () => {
        deleteMutation.mutate({ id: itemSelected.stock_id });
    };
    const handleConfirm = async () => {
        await onDelete();
    };

    const actionOpen = Boolean(anchorEl);
    const processing = deleteMutation.isLoading || isLoading || loading;
    return (
        <MainCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Stok HO</Typography>
            </div>
            {list &&
                TableComponent(
                    list.map((row, index) => (
                        <TableRow hover tabIndex={-1} key={index}>
                            <TableCell padding="checkbox">{index + 1}</TableCell>
                            <TableCell>{row.product_name}</TableCell>
                            <TableCell>{row.product_portion}</TableCell>
                            <TableCell>{row.brand_name}</TableCell>
                            <TableCell>{convertToRupiah(row.stock_price)}</TableCell>
                            <TableCell>{row.stock_qty}</TableCell>
                        </TableRow>
                    ))
                )}
            {dialogOpen && (
                <DialogComponent
                    processing={processing}
                    onAdd={onAdd}
                    onUpdate={onUpdate}
                    onClose={() => setDialogOpen(false)}
                    item={itemSelected}
                    open={dialogOpen}
                />
            )}
            {actionOpen && (
                <Action
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
        </MainCard>
    );
}
