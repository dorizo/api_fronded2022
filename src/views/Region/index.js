import { Button, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import DialogConfirm from 'components/DialogConfirm';
import useSnackbar from 'components/SnackBar';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { ADD_REGION, DELETE_REGION, GET_REGIONS, UPDATE_REGION } from 'services/region';
import MainCard from 'ui-component/cards/MainCard';
import useTable from '../../hooks/useTable/index';
import Action from './Action';
import DialogComponent from './DialogComponent';

const headCells = [
    {
        id: 'region',
        numeric: false,
        disablePadding: true,
        label: 'Region'
    }
];

export default function Index() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [itemSelected, setItemSelected] = React.useState(null);

    const { data, isLoading, refetch } = useQuery('GET_REGIONS', GET_REGIONS);

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

    const deleteMutation = useMutation((params) => DELETE_REGION(params.id), {
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
        const response = await ADD_REGION(data);
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
        const response = await UPDATE_REGION(data, id);
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
        deleteMutation.mutate({ id: itemSelected.region_id });
    };
    const handleConfirm = async () => {
        await onDelete();
    };

    const actionOpen = Boolean(anchorEl);
    const processing = loading || isLoading || deleteMutation.isLoading;
    return (
        <MainCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Region</Typography>
                <Button onClick={() => setDialogOpen(true)} variant="contained">
                    Tambah
                </Button>
            </div>
            {list &&
                TableComponent(
                    list.map((row, index) => (
                        <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                            <TableCell padding="checkbox">{index + 1}</TableCell>
                            <TableCell>{row.region_name}</TableCell>
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
