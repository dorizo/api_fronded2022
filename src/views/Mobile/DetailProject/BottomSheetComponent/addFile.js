/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */

import { Button, CircularProgress, Divider, Grid } from '@mui/material';
import { useMee } from 'contexts/MeContext';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import {
    PROJECT_ADD_FILE_INSTALATION,
    PROJECT_ADD_FILE_LABELING,
    PROJECT_ADD_FILE_SURVEY,
    PROJECT_ADD_FILE_TERMINATION,
    PROJECT_DELETE_FILE_INSTALATION,
    PROJECT_DELETE_FILE_LABELING,
    PROJECT_DELETE_FILE_SURVEY,
    PROJECT_DELETE_FILE_TERMINATION
} from 'services/project';

export default function AddFileComponent(props) {
    const { checkPermision } = useMee();
    const { open, onClose, id, project, snackBarOpen, refetch } = props;
    const status = project.project_status;
    const survey = project.survey;
    const direction =
        status === 'Survey'
            ? 'survey'
            : status === 'Approved Instalation'
            ? 'instalasi'
            : status === 'Termination'
            ? 'terminasi'
            : 'labeling';
    const [loading, setLoading] = useState(false);

    const convertBase64 = (file) => {
        const tes = null;
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleAddFile = async (data, id) => {
        setLoading(true);
        const b = Buffer.from(data);
        const base64Data = b.toString('base64');
        if (status === 'Survey') {
            const response = await PROJECT_ADD_FILE_SURVEY(base64Data, id);
            if (response.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                await refetch();
            }
        }
        if (status === 'Approved Instalation') {
            const response = await PROJECT_ADD_FILE_INSTALATION(base64Data, id);
            if (response.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                await refetch();
            }
        }
        if (status === 'Termination') {
            const response = await PROJECT_ADD_FILE_TERMINATION(base64Data, id);
            if (response.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                await refetch();
            }
        }
        if (status === 'Labeling') {
            const response = await PROJECT_ADD_FILE_LABELING(base64Data, id);
            if (response.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                await refetch();
            }
        }
        setLoading(false);
    };

    const handleAddFiles = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        handleAddFile(base64, id);
    };

    const handleRemoveFiles = async (idProject, idSurvey) => {
        setLoading(true);
        if (status === 'Survey') {
            const response = await PROJECT_DELETE_FILE_SURVEY(idProject, idSurvey);
            if (response.data.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.data.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                await refetch();
            }
        }
        if (status === 'Termination') {
            const response = await PROJECT_DELETE_FILE_TERMINATION(idProject, idSurvey);
            if (response.data.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.data.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                await refetch();
            }
        }
        if (status === 'Approved Instalation') {
            const response = await PROJECT_DELETE_FILE_INSTALATION(idProject, idSurvey);
            if (response.data.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.data.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                await refetch();
            }
        }
        if (status === 'Labeling') {
            const response = await PROJECT_DELETE_FILE_LABELING(idProject, idSurvey);
            if (response.data.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.data.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                await refetch();
            }
        }
        setLoading(false);
    };
    const permis = [
        { delete: 'DFLS', status: 'Survey' },
        { delete: 'DFLT', status: 'Termination' },
        { delete: 'DFLL', status: 'Labeling' },
        { delete: 'DFLI', status: 'Approved Instalation' }
    ];
    function checkPermisionFile() {
        return permis.some((p) => checkPermision(p.delete) && status === p.status);
    }
    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div> Isi File </div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <h5 className="mt-1">
                            Add File{' '}
                            {status === 'Survey'
                                ? 'Survey'
                                : status === 'Approved Instalation'
                                ? 'Instalation'
                                : status === 'Termination'
                                ? 'Termination'
                                : 'Labeling'}
                        </h5>
                        {survey
                            .filter((item) => item.direktori === direction)
                            .map((item, index) => (
                                <div style={{ padding: 4, margin: 4 }} key={index}>
                                    <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                                        <i>{item.survey_file}</i>
                                        {checkPermisionFile() && (
                                            <Button
                                                disabled={loading}
                                                onClick={() => handleRemoveFiles(id, item.survey_id)}
                                                style={{ backgroundColor: 'red', marginBottom: 5, color: 'white' }}
                                            >
                                                Hapus
                                            </Button>
                                        )}
                                    </div>
                                    <Divider />
                                </div>
                            ))}
                        <Button
                            variant="contained"
                            disabled={loading}
                            component="label"
                            color="success"
                            style={{ width: '100%', marginTop: 30, marginBottom: 30, color: 'white' }}
                        >
                            Upload File {loading && <CircularProgress />}
                            <input type="file" hidden onChange={handleAddFiles} />
                        </Button>
                    </Grid>
                </Grid>
            </BottomSheet>
        </div>
    );
}

AddFileComponent.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    project: PropTypes.any,
    id: PropTypes.any,
    snackBarOpen: PropTypes.any,
    refetch: PropTypes.any
};
