import { Button, Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import useSnackbar from 'components/SnackBar';
import { useMee } from 'contexts/MeContext';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import {
    PROJECT_APPROVE,
    PROJECT_APPROVE_INSTALATION,
    PROJECT_APPROVE_LABELING,
    PROJECT_APPROVE_PAID,
    PROJECT_APPROVE_PEMBERKASAAN,
    PROJECT_APPROVE_RECONSILIASI,
    PROJECT_APPROVE_SUBMIT,
    PROJECT_APPROVE_TERMINASI,
    PROJECT_APPROVE_VALID3,
    PROJECT_APPROVE_VALID4,
    PROJECT_DECLINE,
    PROJECT_KHS_INSTALLATION,
    PROJECT_SURVEY_TO_KHS
} from 'services/project';
import TeknisiAmbilBarang from './TeknisiAmbilBarang';

/* eslint-disable react/prop-types */

export default function Index({ project }) {
    const { checkPermision } = useMee();
    const [open, setOpen] = useState(false);

    const { snackBarOpen, SnackBarComponent } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const qc = useQueryClient();
    const handleApprove = async (id) => {
        setLoading(true);
        const response = await PROJECT_APPROVE(id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECTSINGLE', project.project_id]);
        }
        await setLoading(false);
    };
    const handleSurveyToKhs = async (id) => {
        setLoading(true);
        const response = await PROJECT_SURVEY_TO_KHS(id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
        }
        await setLoading(false);
    };
    const handleApproveInstallation = async (userCode) => {
        setLoading(true);
        const response = await PROJECT_APPROVE_INSTALATION(project.project_id, userCode);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
            setOpen(false);
        }
        await setLoading(false);
    };
    const handleInstallation = async () => {
        setLoading(true);
        const response = await PROJECT_KHS_INSTALLATION(project.project_id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
            setOpen(false);
        }
        await setLoading(false);
    };
    const handleApproveTermination = async (id) => {
        setLoading(true);
        const response = await PROJECT_APPROVE_TERMINASI(id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
        }
        await setLoading(false);
    };
    const handleApproveValid3 = async (id) => {
        setLoading(true);
        const response = await PROJECT_APPROVE_VALID3(id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
        }
        await setLoading(false);
    };
    const handleApproveValid4 = async (id) => {
        setLoading(true);
        const response = await PROJECT_APPROVE_VALID4(id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
        }
        await setLoading(false);
    };
    const handleApproveLabeling = async (id) => {
        setLoading(true);
        const response = await PROJECT_APPROVE_LABELING(id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
        }
        await setLoading(false);
    };
    const handleApproveReconsiliasi = async (id) => {
        setLoading(true);
        const response = await PROJECT_APPROVE_RECONSILIASI(id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
        }
        await setLoading(false);
    };
    const handleApproveSubmit = async (id) => {
        setLoading(true);
        const response = await PROJECT_APPROVE_SUBMIT(id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
        }
        await setLoading(false);
    };
    const handleApprovePaid = async (id) => {
        setLoading(true);
        const response = await PROJECT_APPROVE_PAID(id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
        }
        await setLoading(false);
    };
    const handleApprovePemberkasaan = async (id) => {
        setLoading(true);
        const response = await PROJECT_APPROVE_PEMBERKASAAN(id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
        }
        await setLoading(false);
    };
    // const handleApproveDone = async (id) => {
    //     setLoading(true);
    //     const response = await PROJECT_APPROVE_DONE(id);
    //     if (response.status === 400) {
    //         await snackBarOpen(response.data.error.message, 'error');
    //     }
    //     if (response.status === 200) {
    //         await snackBarOpen(response.data.success.message, 'success');
    //         qc.fetchQuery(['GET_PROJECT', project.project_id]);
    //     }
    //     await setLoading(false);
    // };
    const handleDecline = async (id) => {
        setLoading(true);
        const response = await PROJECT_DECLINE(id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            qc.fetchQuery(['GET_PROJECT', project.project_id]);
        }
        await setLoading(false);
    };
    return (
        <Card sx={{ boxShadow: 2, marginBottom: 2 }}>
            <SnackBarComponent />
            <CardContent>
                <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <div>
                        <Typography variant="h1" sx={{ fontSize: 25 }} gutterBottom>
                            {project.project_code}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {`category : ${project.cat_name}`}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {`date : ${project.project_date}`}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {`region : ${project.region_name}`}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            {`witel : ${project.witel_name}`}
                        </Typography>
                    </div>
                    <div>
                        <Typography align="right" variant="body1" color="text.secondary">
                            status
                        </Typography>
                        <Typography align="right" variant="h1" sx={{ fontSize: 20 }} gutterBottom>
                            {project.project_status}
                        </Typography>
                        <Typography align="right" variant="subtitle2" color="text.secondary">
                            {`estimate date : ${project.estimate_date}`}
                        </Typography>
                    </div>
                </div>
                <div style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                    {project.project_status === 'Pending' && (
                        <div style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                            {checkPermision('DEPRO') && (
                                <Button
                                    disabled={loading}
                                    onClick={() => handleDecline(project.project_id)}
                                    variant="outlined"
                                    color="error"
                                >
                                    Decline
                                </Button>
                            )}
                            {checkPermision('APRO') && (
                                <Button
                                    disabled={loading}
                                    onClick={() => handleApprove(project.project_id)}
                                    style={{ marginLeft: 10 }}
                                    variant="outlined"
                                    color="success"
                                >
                                    Approve
                                </Button>
                            )}
                        </div>
                    )}
                    {project.project_status === 'Survey' && checkPermision('CTKHS') && project.sitax?.length !== 0 && (
                        <Button
                            disabled={loading}
                            onClick={() => handleSurveyToKhs(project.project_id)}
                            style={{ marginLeft: 10 }}
                            variant="outlined"
                            color="success"
                        >
                            Approve KHS
                        </Button>
                    )}
                    {project.project_status === 'KHS Check' &&
                        project.khs.every((f) => f.khs_list?.every((a) => a.stock_chosen?.length !== 0)) &&
                        checkPermision('CMKHS') && (
                            <Button
                                disabled={loading}
                                onClick={handleInstallation}
                                style={{ marginLeft: 10 }}
                                variant="outlined"
                                color="success"
                            >
                                Installation
                            </Button>
                        )}
                    {project.project_status === 'Instalation' && checkPermision('CSAI') && (
                        <Button
                            disabled={loading}
                            onClick={() => setOpen(true)}
                            style={{ marginLeft: 10 }}
                            variant="outlined"
                            color="success"
                        >
                            Approve Installation
                        </Button>
                    )}
                    {project.project_status === 'Approved Instalation' &&
                        project.survey.some((a) => a.direktori === 'instalasi') &&
                        checkPermision('CSAT') && (
                            <Button
                                disabled={loading}
                                onClick={() => handleApproveTermination(project.project_id)}
                                style={{ marginLeft: 10 }}
                                variant="outlined"
                                color="success"
                            >
                                Approve Terminasi
                            </Button>
                        )}
                    {project.project_status === 'Termination' &&
                        checkPermision('CSV3') &&
                        project.survey.some((a) => a.direktori === 'terminasi') && (
                            <Button
                                disabled={loading}
                                onClick={() => handleApproveValid3(project.project_id)}
                                style={{ marginLeft: 10 }}
                                variant="outlined"
                                color="success"
                            >
                                Approve Valid 3
                            </Button>
                        )}
                    {project.project_status === 'Valid 3' &&
                        checkPermision('CSL') &&
                        project.feeder.every((z) => z.olt_gpon !== '0') &&
                        project.feeder.every((f) => f.distribusi.every((d) => d.odp_valid_3 !== '')) && (
                            <Button
                                disabled={loading}
                                onClick={() => handleApproveLabeling(project.project_id)}
                                style={{ marginLeft: 10 }}
                                variant="outlined"
                                color="success"
                            >
                                Approve Labeling
                            </Button>
                        )}
                    {project.project_status === 'Labeling' &&
                        project.survey.some((a) => a.direktori === 'labeling') &&
                        checkPermision('CSV4') && (
                            <Button
                                disabled={loading}
                                onClick={() => handleApproveValid4(project.project_id)}
                                style={{ marginLeft: 10 }}
                                variant="outlined"
                                color="success"
                            >
                                Approve Valid 4
                            </Button>
                        )}
                    {project.project_status === 'Valid 4' &&
                        project.feeder.every((f) => f.distribusi.every((d) => d.odp_valid_4 !== '')) &&
                        checkPermision('CSTD') && (
                            <Button
                                disabled={loading}
                                onClick={() => handleApproveReconsiliasi(project.project_id)}
                                style={{ marginLeft: 10 }}
                                variant="outlined"
                                color="success"
                            >
                                Reconsiliasi
                            </Button>
                        )}
                    {project.project_status === 'Reconsiliasi' &&
                        project.project_reconsiliasi !== null &&
                        project.project_reconsiliasi.every((r) => r.status === 1) &&
                        checkPermision('CRTP') && (
                            <Button
                                disabled={loading}
                                onClick={() => handleApprovePemberkasaan(project.project_id)}
                                style={{ marginLeft: 10 }}
                                variant="outlined"
                                color="success"
                            >
                                Pemberkasan
                            </Button>
                        )}
                    {project.project_status === 'Pemberkasan' && checkPermision('CPTS') && (
                        <Button
                            disabled={loading}
                            onClick={() => handleApproveSubmit(project.project_id)}
                            style={{ marginLeft: 10 }}
                            variant="outlined"
                            color="success"
                        >
                            Submit
                        </Button>
                    )}
                    {project.project_status === 'Submit' && checkPermision('CSTP') && (
                        <Button
                            disabled={loading}
                            onClick={() => handleApprovePaid(project.project_id)}
                            style={{ marginLeft: 10 }}
                            variant="outlined"
                            color="success"
                        >
                            Paid
                        </Button>
                    )}
                </div>
            </CardContent>
            {open && (
                <TeknisiAmbilBarang
                    open={open}
                    onClose={() => setOpen(false)}
                    handleApproveInstallation={handleApproveInstallation}
                    teknisi={project.technician}
                />
            )}
        </Card>
    );
}
