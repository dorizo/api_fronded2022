import { Avatar, Button, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import useTable from '../../hooks/useTable/index';
import DialogComponent from './DialogComponent';
import Action from './Action';
import { useMutation, useQuery } from 'react-query';
import { ADD_USER, DELETE_USER, GET_USERS, UPDATE_USER } from 'services/user';
import DialogConfirm from 'components/DialogConfirm';
import useSnackbar from 'components/SnackBar';
import { useNavigate } from 'react-router';
import { GET_PACKAGES } from 'services/package_api';

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Nama'
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: 'Email'
    },
    {
        id: 'nik_ta',
        numeric: false,
        disablePadding: true,
        label: 'NIK TA'
    },
    {
        id: 'nik_api',
        numeric: false,
        disablePadding: true,
        label: 'NIK api'
    }
];

export default function Index() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [itemSelected, setItemSelected] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const { data, isLoading, refetch } = useQuery('GET_USERS', GET_USERS);

    const { data: d, isLoading: il } = useQuery('GET_PACKAGES', GET_PACKAGES);

    const datap = d && d.data;

    const option =
        datap &&
        datap.data.map((s) => {
            const d = { label: s.package_name, id: s.package_id };
            return d;
        });
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
        navigate(`/master/user/${itemSelected.userCode}`);
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

    const deleteMutation = useMutation((params) => DELETE_USER(params.id), {
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
        const response = await ADD_USER(data);
        if (response.status === 400) {
            callbackSetError(response.data.error.form);
        }
        if (response.status === 200) {
            await refetch();
            await snackBarOpen(response.data.success.message, 'success');
            setDialogOpen(false);
            handleActionClose();
        }
        if (response.status === 500) {
            await snackBarOpen('Internal server error', 'error');
        }
        await setLoading(false);
    };
    const onUpdate = async (data, id, callbackSetError) => {
        setLoading(true);
        const response = await UPDATE_USER(data, id);
        if (response.data.status === 400) {
            callbackSetError(response.data.error.form);
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
        deleteMutation.mutate({ id: itemSelected.userCode });
    };
    const handleConfirm = async () => {
        await onDelete();
    };

    const actionOpen = Boolean(anchorEl);
    const processing = loading || deleteMutation.isLoading || isLoading || il;
    return (
        <MainCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">User</Typography>
                <Button onClick={() => setDialogOpen(true)} variant="contained">
                    Tambah
                </Button>
            </div>
            {list &&
                TableComponent(
                    list.map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                            <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                                <TableCell padding="checkbox">{index + 1}</TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ margin: 1 }} alt={row.name} src={row.photo} />
                                        {row.name}
                                    </div>
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.nik_ta}</TableCell>
                                <TableCell>{row.nik_api}</TableCell>
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
                    option={option}
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
