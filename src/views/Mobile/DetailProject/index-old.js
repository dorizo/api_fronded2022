/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';
import LoadingPage from 'components/Loading';
import { useMee } from 'contexts/MeContext';
import ProjectProvider, { useProject } from 'hooks/useProject';
import React, { useState } from 'react';
import { Badge, Collapse } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router';
import 'react-spring-bottom-sheet/dist/style.css';
import { GET_PROJECT } from 'services/project';
import convertToRupiah from 'utils/curency';
import CardDetailProject from '../components/CardDetailProject';
import ListDocumentComponent from '../components/ListDocument';
import {
    AddFileComponent,
    DesignatorComponent,
    DistribusiComplete,
    DistribusiComponent,
    DistribusiFinal,
    FeederComplete,
    FeederComponent,
    KhsComponent,
    SitaxComponent,
    TeknisiComponent
} from './BottomSheetComponent';
import DataTeknisiComponent from './BottomSheetComponent/dataTeknisi';
import GponComponent from './BottomSheetComponent/gpon';
import BackupFile from './Documents/backup';
import SitaxPart from './SitaxPart';
import TeknisiPart from './TeknisiPart';

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
    const location = useLocation();
    const khsSource = location.state.source;
    const { data, isLoading, refetch } = useQuery(['GET_PROJECT', params.idProject], () =>
        GET_PROJECT(params.idProject, khsSource === null ? 'WITEL' : khsSource)
    );
    // console.log(data);
    if (isLoading) {
        return <LoadingPage />;
    }
    const ds = data && data.data;
    const project = ds && ds.data;
    return (
        <ProjectProvider
            initialValue={{
                project,
                khsSource,
                refetch
            }}
        >
            <App />
        </ProjectProvider>
    );
}

function App() {
    const {
        handelMinDT,
        openModal,
        handelPlusDT,
        handleAddDistribusi,
        handleAddFeeder,
        handleAddKhs,
        handleAddKhsList,
        handleAddSitax,
        handleChangeKhsL,
        handleDeleteKhsList,
        handleDistribusiComplete,
        handleDistribusiFinal,
        handleKhsSource,
        handleUpdateFeeder,
        handleUpdateDistribusi,
        handleUpdateKhsList,
        checkPermisionFile,
        handleEditKhsList,
        handleFeederComplete,
        setOpen,
        projectSitax,
        projectSurvey,
        projectTechnician,
        projectKhs,
        radioValue,
        open,
        feederSelected,
        disSelected,
        khsListSelected,
        dataTeknisi,
        expanded,
        expandedKhsL,
        SnackBarComponent,
        snackBarOpen,
        project,
        khsSource,
        refetch,
        handleAddDataTeknisi,
        handleDeleteDataTeknisList,
        handleAddDataTeknisiNext
    } = useProject();
    const [colapse, setColapse] = useState(null);

    const handleColapse = (id) => {
        if (id === colapse) {
            setColapse(null);
        } else {
            setColapse(id);
        }
    };
    const navigate = useNavigate();
    const { checkPermision } = useMee();

    const groupBy = (xs, key) =>
        xs.reduce((rv, x) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    const getListKhsArray = (arr, type = null) => {
        const obj = groupBy(arr, 'tipe');
        console.log(obj);
        return Object.keys(obj)
            .map((key) => {
                const ll = obj[key];
                return { opsi: key, list: ll };
            })
            .filter((a) => (type === 'GPON' ? a.opsi === 'GPON' : a.opsi !== 'GPON'));
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
                                    <Grid item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
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
                        if (radio.value === '4') {
                            if (project.project_status === 'Survey' && checkPermision('CUSI')) {
                                return (
                                    <Grid item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
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
                                <Grid item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
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
                    })}
                </Grid>
                <>
                    {/* teknisi  */}
                    <TeknisiPart />
                    {/* feeder  */}
                    {/* <FeederPart /> */}
                    {/* sitax  */}
                    <SitaxPart />
                    {/* khs  */}
                    <Card sx={{ boxShadow: 2, marginBottom: 2 }}>
                        <CardHeader title="Form Survey" />

                        <CardContent>
                            <div
                                className="rounded"
                                style={{
                                    display: 'flex',
                                    justifyContent: project.project_status === 'Survey' ? 'space-between' : 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#DB1F1F',
                                    color: '#fff'
                                }}
                            >
                                {project.project_status === 'Survey' && (
                                    <Button onClick={handelMinDT} color="inherit">
                                        <HorizontalRuleIcon />
                                    </Button>
                                )}
                                <Typography color="white" variant="h1">
                                    {dataTeknisi && dataTeknisi.length}
                                </Typography>
                                {project.project_status === 'Survey' && (
                                    <Button onClick={handelPlusDT} color="inherit">
                                        <AddIcon />
                                    </Button>
                                )}
                            </div>
                            {dataTeknisi &&
                                dataTeknisi.map((t, i) => (
                                    <div key={i} className="border p-2 my-2">
                                        <h5>Data Teknis ({i + 1})</h5>
                                        {getListKhsArray(t.khs_list)?.map((d) => (
                                            <>
                                                <h6>{d.opsi}</h6>
                                                {d.list.map((l) => (
                                                    <div className="card">
                                                        <div className="card-body row">
                                                            <div className="col-8">{l.designator_code}</div>
                                                            <div className="col-2">
                                                                <Badge bg="success">{l.khs_list_qty}</Badge>
                                                            </div>
                                                            <div className="col-2">
                                                                {project.project_status === 'Survey' && checkPermision('DKHSL') && (
                                                                    <IconButton
                                                                        aria-label="delete"
                                                                        color="error"
                                                                        onClick={() => handleDeleteDataTeknisList(l.khs_list_id)}
                                                                        size="small"
                                                                    >
                                                                        <DeleteIcon fontSize="inherit" />
                                                                    </IconButton>
                                                                )}
                                                                {project.project_status === 'KHS Check' && checkPermision('CMKHS') && (
                                                                    <Grid justifyContent="flex-end" sx={{ padding: 1 }}>
                                                                        <Button
                                                                            variant="outline-success"
                                                                            onClick={() => handleKhsSource(l)}
                                                                            style={{
                                                                                backgroundColor: '#DB1F1F',
                                                                                color: 'white',
                                                                                fontWeight: '700',
                                                                                width: '100%'
                                                                            }}
                                                                        >
                                                                            KHS
                                                                        </Button>
                                                                    </Grid>
                                                                )}
                                                            </div>
                                                            <div className="col-12">
                                                                <Button
                                                                    onClick={() => handleColapse(l.khs_list_id)}
                                                                    aria-controls={`example-collapse-text-${l.khs_list_id}`}
                                                                    aria-expanded={colapse === l.khs_list_id}
                                                                    variant="text"
                                                                >
                                                                    Detail
                                                                </Button>
                                                                <Collapse in={colapse === l.khs_list_id}>
                                                                    <div id={`example-collapse-text-${l.khs_list_id}`}>
                                                                        <TableContainer component={Paper}>
                                                                            <Table size="small" aria-label="a dense table">
                                                                                <TableRow>
                                                                                    <TableCell>desc</TableCell>
                                                                                    <TableCell align="right">{l.designator_desc}</TableCell>
                                                                                </TableRow>
                                                                                <TableRow>
                                                                                    <TableCell>qty</TableCell>
                                                                                    <TableCell align="right">{l.khs_list_qty}</TableCell>
                                                                                </TableRow>
                                                                                <TableRow>
                                                                                    <TableCell>product</TableCell>
                                                                                    <TableCell align="right">{l.product_name}</TableCell>
                                                                                </TableRow>
                                                                                <TableRow>
                                                                                    <TableCell>portion</TableCell>
                                                                                    <TableCell align="right">{l.product_portion}</TableCell>
                                                                                </TableRow>
                                                                                {l.stock_chosen && (
                                                                                    <>
                                                                                        <TableRow>
                                                                                            <TableCell>khs list service total</TableCell>
                                                                                            <TableCell align="right">
                                                                                                {convertToRupiah(
                                                                                                    l.khs_list_service_total || 0
                                                                                                )}
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                        <TableRow>
                                                                                            <TableCell>khs list material total</TableCell>
                                                                                            <TableCell align="right">
                                                                                                {convertToRupiah(
                                                                                                    l.khs_list_material_total || 0
                                                                                                )}
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    </>
                                                                                )}
                                                                                {d.opsi === 'ODC' &&
                                                                                    [
                                                                                        'address',
                                                                                        'benchmark_address',
                                                                                        'capacity',
                                                                                        'lg',
                                                                                        'lt',
                                                                                        'odc',
                                                                                        'port',
                                                                                        'core',
                                                                                        'core_opsi',
                                                                                        'dropcore',
                                                                                        'distribusi_core_opsi'
                                                                                    ].map((atr) => (
                                                                                        <TableRow>
                                                                                            <TableCell>{atr.replace(/_/g, ' ')}</TableCell>
                                                                                            <TableCell align="right">
                                                                                                {l.data && l.data[atr]}
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    ))}
                                                                                {d.opsi === 'ODP' &&
                                                                                    [
                                                                                        'address',
                                                                                        'benchmark_address',
                                                                                        'capacity',
                                                                                        'core',
                                                                                        'lg',
                                                                                        'lt',
                                                                                        'odc',
                                                                                        'port'
                                                                                    ].map((atr) => (
                                                                                        <TableRow>
                                                                                            <TableCell>{atr.replace(/_/g, ' ')}</TableCell>
                                                                                            <TableCell align="right">
                                                                                                {l.data && l.data[atr]}
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    ))}
                                                                            </Table>
                                                                        </TableContainer>
                                                                    </div>
                                                                </Collapse>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ))}
                                        {project.project_status === 'Survey' && checkPermision('CKHSL') && (
                                            <Button
                                                onClick={() => handleAddDataTeknisiNext(t, '11')}
                                                style={{ marginTop: 10 }}
                                                variant="contained"
                                                color="error"
                                            >
                                                Tambah
                                            </Button>
                                        )}
                                        <h5 style={{ marginTop: 10 }}>GPON {i + 1}</h5>
                                        {getListKhsArray(t.khs_list, 'GPON')?.map((d) => (
                                            <>
                                                {d.list.map((l) => (
                                                    <div className="card">
                                                        <div className="card-body row">
                                                            <div className="col-8">{l.designator_code}</div>
                                                            <div className="col-2">
                                                                <Badge bg="success">{l.khs_list_qty}</Badge>
                                                            </div>
                                                            <div className="col-2">
                                                                {project.project_status === 'Survey' && checkPermision('DKHSL') && (
                                                                    <IconButton
                                                                        aria-label="delete"
                                                                        color="error"
                                                                        onClick={() => handleDeleteDataTeknisList(l.khs_list_id)}
                                                                        size="small"
                                                                    >
                                                                        <DeleteIcon fontSize="inherit" />
                                                                    </IconButton>
                                                                )}
                                                                {project.project_status === 'KHS Check' && checkPermision('CMKHS') && (
                                                                    <Grid justifyContent="flex-end" sx={{ padding: 1 }}>
                                                                        <Button
                                                                            variant="outline-success"
                                                                            onClick={() => handleKhsSource(l)}
                                                                            style={{
                                                                                backgroundColor: '#DB1F1F',
                                                                                color: 'white',
                                                                                fontWeight: '700',
                                                                                width: '100%'
                                                                            }}
                                                                        >
                                                                            y
                                                                        </Button>
                                                                    </Grid>
                                                                )}
                                                            </div>
                                                            <div className="col-12">
                                                                <Button
                                                                    onClick={() => handleColapse(l.khs_list_id)}
                                                                    aria-controls={`example-collapse-text-${l.khs_list_id}`}
                                                                    aria-expanded={colapse === l.khs_list_id}
                                                                    variant="text"
                                                                >
                                                                    Detail
                                                                </Button>
                                                                <Collapse in={colapse === l.khs_list_id}>
                                                                    <div id={`example-collapse-text-${l.khs_list_id}`}>
                                                                        <TableContainer component={Paper}>
                                                                            <Table size="small" aria-label="a dense table">
                                                                                <TableRow>
                                                                                    <TableCell>desc</TableCell>
                                                                                    <TableCell align="right">{l.designator_desc}</TableCell>
                                                                                </TableRow>
                                                                                <TableRow>
                                                                                    <TableCell>qty</TableCell>
                                                                                    <TableCell align="right">{l.khs_list_qty}</TableCell>
                                                                                </TableRow>
                                                                                <TableRow>
                                                                                    <TableCell>product</TableCell>
                                                                                    <TableCell align="right">{l.product_name}</TableCell>
                                                                                </TableRow>
                                                                                <TableRow>
                                                                                    <TableCell>portion</TableCell>
                                                                                    <TableCell align="right">{l.product_portion}</TableCell>
                                                                                </TableRow>
                                                                                {l.stock_chosen && (
                                                                                    <>
                                                                                        <TableRow>
                                                                                            <TableCell>khs list service total</TableCell>
                                                                                            <TableCell align="right">
                                                                                                {convertToRupiah(
                                                                                                    l.khs_list_service_total || 0
                                                                                                )}
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                        <TableRow>
                                                                                            <TableCell>khs list material total</TableCell>
                                                                                            <TableCell align="right">
                                                                                                {convertToRupiah(
                                                                                                    l.khs_list_material_total || 0
                                                                                                )}
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    </>
                                                                                )}
                                                                                {[
                                                                                    'gpon',
                                                                                    'output_feeder',
                                                                                    'output_pasif',
                                                                                    'port',
                                                                                    'slot'
                                                                                ].map((atr) => (
                                                                                    <TableRow>
                                                                                        <TableCell>{atr.replace(/_/g, ' ')}</TableCell>
                                                                                        <TableCell align="right">{l.data[atr]}</TableCell>
                                                                                    </TableRow>
                                                                                ))}
                                                                            </Table>
                                                                        </TableContainer>
                                                                    </div>
                                                                </Collapse>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ))}
                                        {project.project_status === 'Survey' && checkPermision('CKHSL') && (
                                            <Button
                                                style={{ marginTop: 10 }}
                                                onClick={() => handleAddDataTeknisiNext(t, '12')}
                                                variant="contained"
                                                color="error"
                                            >
                                                Tambah
                                            </Button>
                                        )}
                                    </div>
                                ))}
                        </CardContent>
                    </Card>
                    <ListDocumentComponent idProject={project.project_id} survey={projectSurvey} />
                    {project.survey?.length !== 0 && <BackupFile />}
                </>
            </div>
            <SnackBarComponent />
            {open && radioValue === '1' && (
                <TeknisiComponent
                    snackBarOpen={snackBarOpen}
                    open={open}
                    onClose={() => setOpen(false)}
                    projectTechnician={projectTechnician}
                />
            )}

            {open && radioValue === '2' && (
                <FeederComponent
                    open={open}
                    onClose={() => setOpen(false)}
                    onAdd={handleAddFeeder}
                    item={feederSelected}
                    onUpdate={handleUpdateFeeder}
                    id={project.project_id}
                />
            )}

            {open && radioValue === '3' && (
                <DistribusiComponent
                    open={open}
                    item={disSelected}
                    onClose={() => setOpen(false)}
                    onAdd={handleAddDistribusi}
                    onUpdate={handleUpdateDistribusi}
                    idFeeder={expanded}
                    idProject={project.project_id}
                    labelCat={project.label_cat}
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

            {open && radioValue === '5' && (
                <AddFileComponent
                    refetch={refetch}
                    snackBarOpen={snackBarOpen}
                    open={open}
                    onClose={() => setOpen(false)}
                    id={project.project_id}
                    project={project}
                />
            )}

            {open && radioValue === '6' && (
                <DesignatorComponent
                    onAdd={handleAddKhsList}
                    onUpdate={handleUpdateKhsList}
                    open={open}
                    item={khsListSelected}
                    onClose={() => setOpen(false)}
                />
            )}
            {open && radioValue === '7' && (
                <KhsComponent
                    open={open}
                    onClose={() => setOpen(false)}
                    item={projectKhs}
                    khsList={khsListSelected}
                    id={project.project_id}
                    onAdd={handleAddKhs}
                />
            )}
            {open && radioValue === '8' && (
                <DistribusiComplete
                    open={open}
                    onClose={() => setOpen(false)}
                    item={disSelected}
                    id={project.project_id}
                    onAdd={handleDistribusiComplete}
                    note={project.project_note}
                />
            )}
            {open && radioValue === '9' && (
                <FeederComplete
                    open={open}
                    onClose={() => setOpen(false)}
                    item={feederSelected}
                    id={project.project_id}
                    onAdd={handleFeederComplete}
                    note={project.project_note}
                />
            )}
            {open && radioValue === '10' && (
                <DistribusiFinal
                    open={open}
                    onClose={() => setOpen(false)}
                    item={disSelected}
                    id={project.project_id}
                    onAdd={handleDistribusiFinal}
                    note={project.project_note}
                />
            )}
            {open && radioValue === '11' && (
                <DataTeknisiComponent
                    open={open}
                    onClose={() => setOpen(false)}
                    item={projectSitax}
                    id={project.project_id}
                    onAdd={handleAddDataTeknisi}
                />
            )}

            {open && radioValue === '12' && (
                <GponComponent
                    open={open}
                    item={disSelected}
                    onClose={() => setOpen(false)}
                    onAdd={handleAddDataTeknisi}
                    // onUpdate={handleUpdateDistribusi}
                    // idFeeder={expanded}
                    // idProject={project.project_id}
                    // labelCat={project.label_cat}
                />
            )}
        </div>
    );
}
