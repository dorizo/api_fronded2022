import { Avatar, Button, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import useTable from '../../hooks/useTable/index';
import DialogComponent from './DialogComponent';
import Action from './Action';
import { useMutation, useQuery } from 'react-query';
import DialogConfirm from 'components/DialogConfirm';
import useSnackbar from 'components/SnackBar';

const headCells = [
    {
        id: 'witel',
        numeric: false,
        disablePadding: true,
        label: 'Witel'
    },
    {
        id: 'user',
        numeric: false,
        disablePadding: true,
        label: 'User'
    }
];

const rows = [
    {
        witel: 'Lampung',
        user: ['Windi', 'Budi']
    },
    {
        witel: 'Jakarta',
        user: ['Windi']
    },
    {
        witel: 'Bandung',
        user: ['Agung', 'Sopo', 'Jarwo']
    }
];

export default function Index() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [itemSelected, setItemSelected] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    // const { data, isLoading, refetch } = useQuery('GET_USERS', GET_USERS);
    const { isLoading } = false;

    const { snackBarOpen, SnackBarComponent } = useSnackbar();

    // const rows = data && data.data.data;
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
    // // HANDLE ALERT
    const handleAlertOpen = (text) => {
        setAlertText(text);
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertText('');
        setAlertOpen(false);
    };

    // HANDLE ACTION
    const onAdd = async (data, callbackSetError) => {
        //
    };
    const onUpdate = async (data, id, callbackSetError) => {
        //
    };
    const handleConfirm = async () => {
        //
    };

    const actionOpen = Boolean(anchorEl);
    const processing = loading || isLoading;
    return (
        <MainCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Table Project</Typography>
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
                                    <div style={{ display: 'flex', alignItems: 'center' }}>{row.witel}</div>
                                </TableCell>
                                <TableCell>{row.user.map((item, index) => (index === row.user.length - 1 ? item : `${item}, `))}</TableCell>
                            </TableRow>
                        );
                    })
                )}
            {dialogOpen && (
                <DialogComponent
                    processing={processing}
                    // onAdd={onAdd}
                    // onUpdate={onUpdate}
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
