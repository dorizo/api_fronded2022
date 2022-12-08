import { Button, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import DialogConfirm from 'components/DialogConfirm';
import useSnackbar from 'components/SnackBar';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { ADD_PACKAGE, DELETE_PACKAGE, GET_PACKAGES, UPDATE_PACKAGE } from 'services/package_api';
import MainCard from 'ui-component/cards/MainCard';
import useTable from '../../hooks/useTable/index';
import Action from './Action';
import DialogComponent from './DialogComponent';

const headCells = [
    {
        id: 'package_name',
        numeric: false,
        disablePadding: true,
        label: 'Name'
    },
    {
        id: 'package_desc',
        numeric: false,
        disablePadding: true,
        label: 'Description'
    }
];

export default function Index() {
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [itemSelected, setItemSelected] = React.useState(null);

    const { data, isLoading, refetch } = useQuery('GET_PACKAGES', GET_PACKAGES);

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
    const handleDetail = () => {
        navigate(`/master/package/designator/${itemSelected.package_id}`);
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

    const deleteMutation = useMutation((params) => DELETE_PACKAGE(params.id), {
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
        const response = await ADD_PACKAGE(data);
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
        const response = await UPDATE_PACKAGE(data, id);
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
        deleteMutation.mutate({ id: itemSelected.package_id });
    };
    const handleConfirm = async () => {
        await onDelete();
    };

    const actionOpen = Boolean(anchorEl);
    const processing = loading || isLoading || deleteMutation.isLoading;
    return (
        <MainCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Package</Typography>
                <Button onClick={() => setDialogOpen(true)} variant="contained">
                    Tambah
                </Button>
            </div>
            {list &&
                TableComponent(
                    list.map((row, index) => (
                        <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                            <TableCell padding="checkbox">{index + 1}</TableCell>
                            <TableCell>{row.package_name}</TableCell>
                            <TableCell>{row.package_desc}</TableCell>
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
        </MainCard>
    );
}
