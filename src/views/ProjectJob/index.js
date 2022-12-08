import { DatePicker } from '@mui/lab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Card, CardContent, DialogActions, DialogContent, Grid, TextField } from '@mui/material';
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
import moment from 'moment';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router';
import { GET_PROJECT, GET_PROJECT_JOB, PROJECT_JOB } from 'services/project';

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
    const [start, setStart] = React.useState({});
    const [done, setDone] = React.useState({});
    const [checked, setChecked] = React.useState(listRecon);
    const navigate = useNavigate();
    const location = useLocation();
    const khsSource = location.state?.source;
    const { data, isLoading, refetch } = useQuery(['GET_PROJECT_JOB', params.idProject], () => GET_PROJECT_JOB(params.idProject));
    const { data: dataProject, isLoading: lp } = useQuery(['GET_PROJECT', params.idProject], () =>
        GET_PROJECT(params.idProject, khsSource === null ? 'WITEL' : khsSource)
    );
    if (isLoading || lp) {
        return <LoadingComponent />;
    }
    const ds = data && data.data;
    const dsp = dataProject && dataProject.data;

    const project = dsp && dsp.data;
    const jobs = ds && ds.data;
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
    const handleChangeStart = (val, idJob) => {
        start[`job-${idJob}`] = val;
        setStart({ ...start });
    };
    const handleChangeDone = (val, idJob) => {
        done[`job-${idJob}`] = val;
        setDone({ ...done });
    };

    const onUpdateRecon = async (idJob) => {
        await setLoading(true);
        const data = {
            project_id: project.project_id,
            est_date_start: start[`job-${idJob}`].format('YYYY-MM-DD'),
            est_date_done: done[`job-${idJob}`].format('YYYY-MM-DD'),
            job_id: idJob
        };
        const response = await PROJECT_JOB(data);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await refetch();
            await snackBarOpen(response.data.success.message, 'success');
            setDialogOpen(false);
        }
        await setLoading(false);
    };
    const processing = isLoading || loading;
    return (
        <div style={{ padding: 5 }}>
            <SnackBarComponent />
            <Button color="error" onClick={() => navigate(-1)}>
                <ArrowBackIcon /> Kembali
            </Button>
            <Card sx={{ boxShadow: 2, padding: 1, marginBottom: 5 }}>
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
                </CardContent>
            </Card>

            {jobs.map((item) => {
                const esStart = item.est_date_start ? moment(new Date(item.est_date_start)) : null;
                const esDone = item.est_date_done ? moment(new Date(item.est_date_done)) : null;
                return (
                    <Card sx={{ boxShadow: 2, padding: 1, marginBottom: 1 }}>
                        <CardContent style={{ paddingRight: 5 }}>
                            <Grid container spacing={2}>
                                <Typography variant="h3" style={{ marginBottom: 20 }}>
                                    {item.job_name}
                                </Typography>
                                <Grid container spacing={1}>
                                    <Grid item md={5} xs={6}>
                                        <DatePicker
                                            maxDate={done[`job-${item.job_id}`] || esDone}
                                            disabled={project.project_status !== 'Pending'}
                                            label="Estimasi Mulai"
                                            value={start[`job-${item.job_id}`] || esStart}
                                            onChange={(newValue) => {
                                                handleChangeStart(newValue, item.job_id);
                                            }}
                                            renderInput={(params) => <TextField style={{ marginRight: 2 }} size="small" {...params} />}
                                        />
                                    </Grid>
                                    <Grid item md={5} xs={6}>
                                        <DatePicker
                                            minDate={start[`job-${item.job_id}`] || esStart}
                                            disabled={project.project_status !== 'Pending'}
                                            label="Estimasi Selesai"
                                            value={done[`job-${item.job_id}`] || esDone}
                                            onChange={(newValue) => {
                                                handleChangeDone(newValue, item.job_id);
                                            }}
                                            renderInput={(params) => <TextField style={{ marginRight: 2 }} size="small" {...params} />}
                                        />
                                    </Grid>
                                    <Grid item md={2} xs={12}>
                                        {project.project_status === 'Pending' && checkPermision('UJOB') && (
                                            <Button
                                                fullWidth
                                                disabled={!(done[`job-${item.job_id}`] && start[`job-${item.job_id}`]) || loading}
                                                onClick={() => onUpdateRecon(item.job_id)}
                                                size="large"
                                                variant="outlined"
                                                color="success"
                                            >
                                                SET
                                            </Button>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                );
            })}
            <DialogComponent
                onUpdateRecon={onUpdateRecon}
                handleToggle={handleToggle}
                checked={checked}
                checkPermision={checkPermision}
                status={project.status}
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
