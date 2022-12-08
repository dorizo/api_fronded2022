/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useQuery, useQueryClient } from 'react-query';
import { Button, Grid } from '@mui/material';
import { GET_PROJECTSD } from 'services/projectnew';
import { GET_IMAGES, UPLOAD_IMAGES } from 'services/upload';
import LoadingPage from 'components/Loading';
// import LoadingComponent from 'components/LoadingComponent';
import ProjectProvider, { useProject } from 'hooks/useProjectnew';
import CardDetailProject from '../components/CardDetailProject';
import { useMee } from 'contexts/MeContext';
import TeknisiPart from './TeknisiPart';
import SitaxPart from './SitaxPart';
import { SitaxComponent, TeknisiComponent } from './BottomSheetComponent';
import Datateknis from './Datateknis';
import ListDocumentComponent from '../components/ListDocument';
// import { Col, Modal, Row } from 'react-bootstrap';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ModalUpload from 'ui-component/modal/ModalUpload';

const radios = [
    { name: 'Teknisi', value: '1' },
    { name: 'Feeder', value: '2' },
    { name: 'Sitax', value: '4' },
    { name: 'Unggah File', value: '5' },
    { name: 'KHS List', value: '6' },
    { name: 'KHS', value: '7' }
];

export default function Index() {
    const params = useParams();
    const { data, isLoading, refetch } = useQuery(['GET_PROJECTSINGLE', params.idProject], () => GET_PROJECTSD(params.idProject));
    if (isLoading) {
        return <LoadingPage />;
    }
    const project = data.data;
    return (
        <ProjectProvider
            initialValue={{
                project,
                refetch
            }}
        >
            <App />
        </ProjectProvider>
    );
}
function App() {
    // const inputFile = useRef(null);
    const {
        openModal,
        handleAddSitax,
        checkPermisionFile,
        setOpen,
        projectSitax,
        projectTechnician,
        radioValue,
        open,
        khsIdSelected,
        SnackBarComponent,
        snackBarOpen,
        project,
        handlekhsv2
    } = useProject();
    const [filemanagerku, setfilenamagerku] = useState({
        open: false,
        urlfile: `${project.project_id}/${project.project_status}/`
    });
    const [colapse, setColapse] = useState(null);
    const { projectSurvey, SetprojectSurvey } = useState();
    const handleColapse = (id) => {
        if (id === colapse) {
            setColapse(null);
        } else {
            setColapse(id);
        }
    };

    const handlefilemanagerclose = () => {
        setfilenamagerku({ open: false, urlfile: `${project.project_id}/${project.project_status}/` });
    };
    // console.log(filemanagerku.open);
    const navigate = useNavigate();
    const { checkPermision } = useMee();

    // untuk file upload
    const queryClient = useQueryClient();
    const [files, setFiles] = useState(null);
    const onChangeUpload = (e) => {
        const file = e.target.files[0];
        setFiles(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
    };

    const [loading, setLoading] = useState(false);
    const handleUpload = async () => {
        setLoading(true);
        const level = filemanagerku?.urlfile?.fileget;

        try {
            await UPLOAD_IMAGES({ level, files });
            setLoading(false);
            queryClient.invalidateQueries('GET_IMAGES');
            setFiles(null);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (files) {
            handleUpload();
        }
    }, [files]);

    const body = {
        level: filemanagerku?.urlfile?.fileget
    };
    const { data, isLoading } = useQuery(['GET_IMAGES', { body }], () => GET_IMAGES({ body }), {
        keepPreviousData: true,
        select: (response) => response.data.data
    });

    const onButtonClick = (fileget) => () => {
        setfilenamagerku({ open: true, urlfile: fileget });
    };

    return (
        <div>
            <div className="container mb-4">
                <Button color="error" onClick={() => navigate(-1)}>
                    <ArrowBackIcon /> Kembali
                </Button>
                <CardDetailProject project={project} />
                <Grid sx={{ marginTop: 2, marginBottom: 2 }} container spacing={3}>
                    {radios.map((radio, idx) => {
                        if (radio.value === '1') {
                            if (
                                project.project_status !== 'Pending' &&
                                project.project_status !== 'Decline' &&
                                (checkPermision('CTEC') || checkPermision('UTEC'))
                            ) {
                                return (
                                    <Grid key={idx} item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
                                        <Button
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            fullWidth
                                            variant={idx % 1 ? 'outline-success' : 'outline-danger'}
                                            name="radio"
                                            value={radio.value}
                                            onClick={() => openModal(radio.value)}
                                            checked={radioValue === radio.value}
                                            style={{
                                                backgroundColor: '#DB1F1F',
                                                color: 'white',
                                                fontWeight: '700',
                                                width: '100%'
                                            }}
                                        >
                                            {radio.name}
                                        </Button>
                                    </Grid>
                                );
                            }
                            return null;
                        }
                        if (radio.value === '4') {
                            if (project.project_status === 'Survey') {
                                return (
                                    <Grid key={idx} item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
                                        <Button
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            fullWidth
                                            variant={idx % 1 ? 'outline-success' : 'outline-danger'}
                                            name="radio"
                                            value={radio.value}
                                            onClick={() => openModal(radio.value)}
                                            checked={radioValue === radio.value}
                                            // disabled={Number(radio.value) <= status ? 0 : 1}
                                            style={{
                                                backgroundColor: '#DB1F1F',
                                                color: 'white',
                                                fontWeight: '700',
                                                width: '100%'
                                            }}
                                        >
                                            {radio.name}
                                        </Button>
                                    </Grid>
                                );
                            }
                            return null;
                        }
                        if (radio.value === '5' && checkPermisionFile()) {
                            return (
                                <Grid key={idx} item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
                                    <Button
                                        key={idx}
                                        id={`radio-${idx}`}
                                        type="radio"
                                        fullWidth
                                        variant={idx % 1 ? 'outline-success' : 'outline-danger'}
                                        name="radio"
                                        value={radio.value}
                                        // onClick={() => openModal(radio.value)}
                                        onClick={onButtonClick({
                                            fileget: `${project.project_id}/${project.project_status}/`
                                        })}
                                        checked={radioValue === radio.value}
                                        // disabled={Number(radio.value) <= status ? 0 : 1}
                                        style={{
                                            backgroundColor: '#DB1F1F',
                                            color: 'white',
                                            fontWeight: '700',
                                            width: '100%'
                                        }}
                                    >
                                        {radio.name}
                                    </Button>
                                </Grid>
                            );
                        }
                        return null;
                    })}
                </Grid>
                <TeknisiPart />
                <SitaxPart />
                <Datateknis witelid={project.witel_id} project={project} filemanager={setfilenamagerku} />
                <ListDocumentComponent idProject={project.project_id} survey={projectSurvey} />
            </div>

            <SnackBarComponent />
            <div>ddd</div>
            {open && radioValue === '1' && (
                <TeknisiComponent
                    snackBarOpen={snackBarOpen}
                    open={open}
                    onClose={() => setOpen(false)}
                    projectTechnician={projectTechnician}
                />
            )}

            {open && radioValue === '4' && (
                <SitaxComponent
                    open={open}
                    onClose={() => setOpen(false)}
                    item={projectSitax}
                    id={project.project_id}
                    onAdd={handleAddSitax}
                />
            )}
            <ModalUpload
                loading={loading}
                isLoading={isLoading}
                data={data}
                filemanagerku={filemanagerku}
                handlefilemanagerclose={handlefilemanagerclose}
                onChangeUpload={onChangeUpload}
            />
        </div>
    );
}
