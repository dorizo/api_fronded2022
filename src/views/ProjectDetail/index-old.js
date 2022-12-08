import { Button, Card, CardContent, Chip, DialogActions, DialogContent } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import LoadingComponent from 'components/LoadingComponent';
import useSnackbar from 'components/SnackBar';
import { useMee } from 'contexts/MeContext';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router';
import { GET_PROJECT, PROJECT_TASK_RECONSILIASI } from 'services/project';

/* eslint-disable no-nested-ternary */

const listRecon = [
    { name: 'uji teskom', status: 0 },
    { name: 'uji terima', status: 0 },
    { name: 'recon jasa', status: 0 },
    { name: 'recon material', status: 0 },
    { name: 'prpo', status: 0 },
    { name: 'sp', status: 0 },
    { name: 'pemberkasan', status: 0 },
    { name: 'invoice', status: 0 },
    { name: 'submit', status: 0 },
    { name: 'paid', status: 0 }
];

export default function Index() {
    const { checkPermision } = useMee();
    const params = useParams();
    const [loading, setLoading] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const { SnackBarComponent, snackBarOpen } = useSnackbar();
    const [checked, setChecked] = React.useState(listRecon);
    const location = useLocation();
    const khsSource = location.state.source;
    const { data, isLoading, refetch } = useQuery(['GET_PROJECT', params.idProject], () =>
        GET_PROJECT(params.idProject, khsSource === null ? 'WITEL' : khsSource)
    );

    if (isLoading) {
        return <LoadingComponent />;
    }
    const ds = data && data.data;

    const project = ds && ds.data;
    const handleToggle = (index) => () => {
        if (project.project_status === 'Reconsiliasi' && checkPermision('URECON')) {
            const currentIndex = checked[index].status;
            const newChecked = [...checked];

            if (currentIndex === 0) {
                checked[index].status = 1;
            } else {
                checked[index].status = 0;
            }
            setChecked(newChecked);
        }
    };
    const handleOpenRecon = () => {
        const recon = project.project_reconsiliasi || listRecon;
        setChecked(recon);
        setDialogOpen(true);
    };
    const onUpdateRecon = async () => {
        if (project.project_status === 'Reconsiliasi' && checkPermision('URECON')) {
            await setLoading(true);
            const data = JSON.stringify(checked);
            const response = await PROJECT_TASK_RECONSILIASI({ project_reconsiliasi: data }, project.project_id);
            if (response.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.status === 200) {
                await refetch();
                await snackBarOpen(response.data.success.message, 'success');
                setDialogOpen(false);
            }
            await setLoading(false);
        }
    };
    const processing = isLoading || loading;
    return (
        <div>
            <SnackBarComponent />
            <Card style={{ boxShadow: 2, padding: 1, marginBottom: 20 }}>
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography style={{ marginBottom: 10, marginTop: 10 }} variant="h3">
                            Detail Project {project.project_code} | {project.cat_name}
                        </Typography>
                        <Typography
                            color={project.persen <= 30 ? 'error' : project.persen > 30 && project.persen <= 70 ? '#f57c00' : '#388e3c'}
                            style={{ marginBottom: 10, marginTop: 10 }}
                            variant="h1"
                        >
                            {project.persen} %
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', marginBottom: 20 }}>
                        <Chip
                            size="small"
                            style={{ marginRight: 2 }}
                            label="Estimate :  not set - not set"
                            color="secondary"
                            variant="outlined"
                        />
                        <Chip size="small" label="Est day : " color="info" variant="outlined" />
                        <Chip size="small" label="Late : " color="error" variant="outlined" />
                    </div>
                    {(project.project_status === 'Reconsiliasi' ||
                        project.project_status === 'Pemberkasan' ||
                        project.project_status === 'Submit' ||
                        project.project_status === 'Paid') && (
                        <Button onClick={handleOpenRecon} style={{ marginLeft: 10 }} variant="outlined" color="success">
                            Reconsiliasi
                        </Button>
                    )}
                </CardContent>
            </Card>

            {project.jobs.map((item) => (
                <Card style={{ boxShadow: 2, padding: 1, marginBottom: 2 }}>
                    <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <div>
                            <Typography variant="h3" style={{ marginBottom: 5 }}>
                                {item.job_name}
                                {item}
                            </Typography>
                            {/* <div style={{ display: 'flex' }}>
                                <Chip
                                    size="small"
                                    style={{ marginRight: 2 }}
                                    label={`Estimate : ${item.est_date_start || 'not set'} - ${item.est_date_done || 'not set'}`}
                                    color="secondary"
                                    variant="outlined"
                                />
                                <Chip size="small" label={`Est day : ${item.est_day}`} color="info" variant="outlined" />
                                <Chip size="small" label={`Late : ${item.late}`} color="error" variant="outlined" />
                            </div> */}
                            <div style={{ display: 'flex', marginTop: 5 }}>
                                <Chip
                                    size="small"
                                    style={{ marginRight: 2 }}
                                    label={`${item.date_start} - ${item.date_done}`}
                                    color="info"
                                    variant="outlined"
                                />
                                <Chip size="small" label={`Day : ${item.day}`} color="success" variant="outlined" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <DialogComponent
                onUpdateRecon={onUpdateRecon}
                handleToggle={handleToggle}
                checked={checked}
                checkPermision={checkPermision}
                status={project.project_status}
                open={dialogOpen}
                processing={processing}
                onClose={() => setDialogOpen(false)}
            />
        </div>
    );
}

function DialogComponent(props) {
    const { open, onClose, checked, onUpdateRecon, handleToggle, processing, checkPermision, status } = props;
    return (
        <div>
            <Dialog fullWidth maxWidth="md" open={open}>
                <DialogTitle>Reconsiliasi</DialogTitle>
                <DialogContent>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {checked.map((value, index) => {
                            const labelId = `checkbox-list-label-${index}`;
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                color="success"
                                                checked={value.status === 1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={value.name} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button disabled={processing} onClick={onClose}>
                        Cancel
                    </Button>
                    {status === 'Reconsiliasi' && checkPermision('URECON') && (
                        <Button onClick={onUpdateRecon} variant="contained" type="submit" disabled={processing}>
                            Simpan
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
DialogComponent.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    checked: PropTypes.any,
    onUpdateRecon: PropTypes.any,
    handleToggle: PropTypes.any,
    checkPermision: PropTypes.any,
    status: PropTypes.any,
    processing: PropTypes.any
};
