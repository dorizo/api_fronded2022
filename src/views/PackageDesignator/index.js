import { Button, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import DialogConfirm from 'components/DialogConfirm';
import useSnackbar from 'components/SnackBar';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { ADD_DESIGNATOR_PACAKGE, DELETE_DESIGNATOR_PACKAGE } from 'services/designator';
import { GET_PACKAGE_DESIGNATOR } from 'services/package_api';
import MainCard from 'ui-component/cards/MainCard';
import useTable from '../../hooks/useTable/index';
import Action from './Action';
import DialogComponent from './DialogComponent';

const headCells = [
    {
        id: 'code',
        numeric: false,
        disablePadding: true,
        label: 'Code'
    },
    {
        id: 'desc',
        numeric: false,
        disablePadding: true,
        label: 'Desc'
    },
    {
        id: 'materialp',
        numeric: false,
        disablePadding: true,
        label: 'Material Price'
    },
    {
        id: 'servicep',
        numeric: false,
        disablePadding: true,
        label: 'Service Price'
    }
];

export default function Index() {
    const params = useParams();

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [itemSelected, setItemSelected] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const { data, isLoading, refetch } = useQuery('GET_PACKAGE_DESIGNATOR', () => GET_PACKAGE_DESIGNATOR(params.id));

    const { snackBarOpen, SnackBarComponent } = useSnackbar();

    const result = data && data.data.data;
    const rows = result && result.designator;
    const paket = result && result.package;

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
    // ACTION
    // HANDLE ACTION
    const onAdd = async (data, callbackSetError) => {
        setLoading(true);
        const response = await ADD_DESIGNATOR_PACAKGE({ ...data, packageid: params.id });
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
    const onUpdate = async () => {
        setLoading(true);
        await setLoading(false);
    };
    const onDelete = async () => {
        setLoading(true);
        const response = await DELETE_DESIGNATOR_PACKAGE(itemSelected.designator_package_id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 404) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await refetch();
            await snackBarOpen(response.data.success.message, 'success');
            setDialogOpen(false);
            setAlertOpen(false);
            handleActionClose();
        }
        await setLoading(false);
    };
    const handleConfirm = async () => {
        await onDelete();
    };

    const actionOpen = Boolean(anchorEl);
    const processing = isLoading || loading;
    return (
        <MainCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h3">Designator Package</Typography>
                <Button onClick={() => setDialogOpen(true)} variant="contained">
                    Tambah
                </Button>
            </div>
            <Typography variant="h4">Package Name : {paket?.package_name}</Typography>
            <Typography variant="h5">Package Desc : {paket?.package_desc}</Typography>
            <Typography variant="h5">Total Material Price : {result?.total_material_price}</Typography>
            <Typography variant="h5" style={{ marginBottom: 10 }}>
                Total Service Price : {result?.total_service_price}
            </Typography>
            {list &&
                TableComponent(
                    list.map((row, index) => (
                        <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                            <TableCell padding="checkbox">{index + 1}</TableCell>
                            <TableCell>{row.designator_code}</TableCell>
                            <TableCell>{row.designator_desc}</TableCell>
                            <TableCell>{row.material_price}</TableCell>
                            <TableCell>{row.service_price}</TableCell>
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
