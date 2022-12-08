import { Button, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import DialogConfirm from 'components/DialogConfirm';
import useSnackbar from 'components/SnackBar';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { ADD_SUPPLIER, DELETE_SUPPLIER, GET_SUPPLIERS, UPDATE_SUPPLIER } from 'services/supplier';
import MainCard from 'ui-component/cards/MainCard';
import useTable from '../../hooks/useTable/index';
import Action from './Action';
import DialogComponent from './DialogComponent';

const headCells = [
    {
        id: 'supplier_name',
        numeric: false,
        disablePadding: true,
        label: 'Name'
    },
    {
        id: 'supplier_phone',
        numeric: false,
        disablePadding: true,
        label: 'Phone'
    },
    {
        id: 'supplier_address',
        numeric: false,
        disablePadding: true,
        label: 'Address'
    }
];

export default function Index() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [itemSelected, setItemSelected] = React.useState(null);

    const { data, isLoading, refetch } = useQuery('GET_SUPPLIERS', GET_SUPPLIERS);

    const { snackBarOpen, SnackBarComponent } = useSnackbar();

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

    const deleteMutation = useMutation((params) => DELETE_SUPPLIER(params.id), {
        onSuccess: async (response) => {
            await refetch();
            await snackBarOpen(response.data.success.message, 'success');
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
        const response = await ADD_SUPPLIER(data);
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
        const response = await UPDATE_SUPPLIER(data, id);
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
        deleteMutation.mutate({ id: itemSelected.supplier_id });
    };
    const handleConfirm = async () => {
        await onDelete();
    };

    const actionOpen = Boolean(anchorEl);
    const processing = loading || isLoading || deleteMutation.isLoading;
    return (
        <MainCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Supplier</Typography>
                <Button onClick={() => setDialogOpen(true)} variant="contained">
                    Tambah
                </Button>
            </div>
            {list &&
                TableComponent(
                    list.map((row, index) => (
                        <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                            <TableCell padding="checkbox">{index + 1}</TableCell>
                            <TableCell>{row.supplier_name}</TableCell>
                            <TableCell>{row.supplier_phone}</TableCell>
                            <TableCell>{row.supplier_address}</TableCell>
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
