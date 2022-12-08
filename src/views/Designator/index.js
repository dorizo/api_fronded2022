import { Button, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import DialogConfirm from 'components/DialogConfirm';
import useSnackbar from 'components/SnackBar';
import { useMee } from 'contexts/MeContext';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { ADD_DESIGNATOR, DELETE_DESIGNATOR, GET_DESIGNATORS, UPDATE_DESIGNATOR } from 'services/designator';
import MainCard from 'ui-component/cards/MainCard';
import useTable from '../../hooks/useTable/index';
import Action from './Action';
import DialogComponent from './DialogComponent';

const headCells = [
    {
        id: 'code',
        numeric: false,
        disablePadding: true,
        label: 'Designator Code'
    },
    {
        id: 'desc',
        numeric: false,
        disablePadding: true,
        label: 'Deskripsi'
    },
    {
        id: 'product_name',
        numeric: false,
        disablePadding: true,
        label: 'Produk Name'
    }
];

export default function Index() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [itemSelected, setItemSelected] = React.useState(null);
    const { checkPermision } = useMee();
    const { data, isLoading, refetch } = useQuery('GET_DESIGNATORS', GET_DESIGNATORS);
    const navigate = useNavigate();
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
        navigate(`/master/role/${itemSelected.roleCode}`);
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

    const deleteMutation = useMutation((params) => DELETE_DESIGNATOR(params.id), {
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
        const response = await ADD_DESIGNATOR(data);
        if (response.status === 400) {
            callbackSetError(response.data.error.form);
        }
        if (response.data.status === 404) {
            snackBarOpen(response.data.error.message, 'error');
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
        const response = await UPDATE_DESIGNATOR(data, id);
        if (response.data.status === 400) {
            callbackSetError(response.data.error.form);
        }
        if (response.data.status === 404) {
            snackBarOpen(response.data.error.message, 'error');
        }
        if (response.data.status === 200) {
            await refetch();
            await snackBarOpen(response.data.success.message, 'success');
            handleActionClose();
            setDialogOpen(false);
            setItemSelected(null);
        }
        await setLoading(false);
    };
    const onDelete = async () => {
        deleteMutation.mutate({ id: itemSelected.designator_id });
    };
    const handleConfirm = async () => {
        await onDelete();
    };

    const actionOpen = Boolean(anchorEl);
    const processing = loading || isLoading || deleteMutation.isLoading;
    return (
        <MainCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Designator</Typography>
                {checkPermision('CR') && (
                    <Button onClick={() => setDialogOpen(true)} variant="contained">
                        Tambah
                    </Button>
                )}
            </div>
            {list &&
                TableComponent(
                    list.map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                            <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                                <TableCell padding="checkbox">{index + 1}</TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.designator_code}
                                </TableCell>
                                <TableCell>{row.designator_desc}</TableCell>
                                <TableCell>{row.product_name}</TableCell>
                            </TableRow>
                        );
                    })
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
                    handleDetail={handleDetail}
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
