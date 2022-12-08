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
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';
import { useMee } from 'contexts/MeContext';
import ProjectProvider, { useProject } from 'hooks/useProject';
import React, { useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router';
import 'react-spring-bottom-sheet/dist/style.css';
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
import FeederPart from './FeederPart';
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
    return (
        <ProjectProvider>
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
        handleChange,
        handleChange2,
        handleChangeKhsL,
        handleComplateD,
        handleComplateF,
        handleDeleteDistribusi,
        handleDeleteKhsList,
        handleDistribusiComplete,
        handleDistribusiFinal,
        handleEditDistribusi,
        handleKhsSource,
        handleUpdateFeeder,
        handleUpdateDistribusi,
        handleUpdateKhsList,
        checkPermisionFile,
        handleEditFeeder,
        handleFinal,
        handleEditKhsList,
        handleFeederComplete,
        setOpen,
        projectFeeder,
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
        expanded2,
        expandedKhsL,
        SnackBarComponent,
        setIdProject,
        setKhsSource,
        snackBarOpen,
        project,
        khsSource,
        refetch
    } = useProject();
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { checkPermision } = useMee();

    useEffect(() => {
        const setCoy = () => {
            setIdProject(params.idProject);
            setKhsSource(location.state.source);
        };
        setCoy();
    }, []);
    const dataTL = [
        {
            opsi: 'Feeder',
            list: [
                {
                    designator_name: 'Designator 1',
                    designator_desc: 'description',
                    quantity: 200
                }
            ]
        },
        {
            opsi: 'Penggelaran',
            list: [
                {
                    designator_name: 'Designator 1',
                    designator_desc: 'description',
                    quantity: 200
                }
            ]
        },
        {
            opsi: 'ODC',
            list: [
                {
                    designator_name: 'Designator 1',
                    designator_desc: 'description',
                    quantity: 200
                }
            ]
        },
        {
            opsi: 'ODP',
            list: [
                {
                    designator_name: 'Designator 1',
                    designator_desc: 'description',
                    quantity: 200
                }
            ]
        }
    ];
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
                                    <Grid item xs={6} md={3} sx={{ padding: 1 }}>
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
                        if (radio.value === '2') {
                            if (project.project_status === 'Survey' && checkPermision('CFED')) {
                                return (
                                    <Grid item xs={6} md={3} sx={{ padding: 1 }}>
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
                                    <Grid item xs={6} md={3} sx={{ padding: 1 }}>
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
                                <Grid item xs={6} md={3} sx={{ padding: 1 }}>
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
                        if (radio.value === '6') {
                            if (project.project_status === 'Survey' && checkPermision('CKHSL')) {
                                return (
                                    <Grid item xs={6} md={3} sx={{ padding: 1 }}>
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
                        return null;
                    })}
                </Grid>
                <>
                    {/* teknisi  */}
                    <TeknisiPart projectTechnician={projectTechnician} project={project} />
                    {/* feeder  */}
                    <FeederPart
                        project={project}
                        openModal={openModal}
                        projectFeeder={projectFeeder}
                        handleChange={handleChange}
                        handleEditFeeder={handleEditFeeder}
                        handleComplateF={handleComplateF}
                        handleChange2={handleChange2}
                        handleEditDistribusi={handleEditDistribusi}
                        handleDeleteDistribusi={handleDeleteDistribusi}
                        handleComplateD={handleComplateD}
                        handleFinal={handleFinal}
                        expanded={expanded}
                        expanded2={expanded2}
                    />
                    {/* sitax  */}
                    <SitaxPart projectSitax={projectSitax} />
                    {/* khs  */}
                    <Card sx={{ boxShadow: 2, marginBottom: 2 }}>
                        <CardHeader title="KHS" />

                        <CardContent>
                            <div
                                className="rounded"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: '#DB1F1F',
                                    color: '#fff'
                                }}
                            >
                                <Button onClick={handelMinDT} color="inherit">
                                    <HorizontalRuleIcon />
                                </Button>
                                <Typography color="white" variant="h1">
                                    {dataTeknisi.length}
                                </Typography>
                                <Button onClick={handelPlusDT} color="inherit">
                                    <AddIcon />
                                </Button>
                            </div>
                            {dataTeknisi &&
                                dataTeknisi.map((t, i) => (
                                    <div key={i} className="border p-2 my-2">
                                        <h5>Data Teknisi</h5>
                                        {dataTL.map((d) => (
                                            <>
                                                <h6>{d.opsi}</h6>
                                                {d.list.map((l) => (
                                                    <div className="card">
                                                        <div className="card-body row">
                                                            <div className="col-10">{l.designator_name}</div>
                                                            <div className="col-2">
                                                                <Badge bg="info">{l.quantity}</Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ))}
                                        <Button onClick={() => openModal('11')} variant="contained" color="error">
                                            Tambah
                                        </Button>
                                        <h5>GPON</h5>
                                        <Button onClick={() => openModal('12')} variant="contained" color="error">
                                            Tambah
                                        </Button>
                                    </div>
                                ))}
                        </CardContent>
                    </Card>
                    <Card sx={{ boxShadow: 2, marginBottom: 2 }}>
                        <CardHeader title="KHS" />
                        <CardContent>
                            {project.project_status !== 'Pending' &&
                                project.project_status !== 'Survey' &&
                                project.project_status !== 'Approve' && (
                                    <TableContainer component={Paper}>
                                        <Table size="small" aria-label="a dense table">
                                            {khsSource === 'WITEL' && (
                                                <TableRow>
                                                    <TableCell>khs material total</TableCell>
                                                    <TableCell align="right">{convertToRupiah(projectKhs.khs_material_total)}</TableCell>
                                                </TableRow>
                                            )}
                                            <TableRow>
                                                <TableCell>khs service total</TableCell>
                                                <TableCell align="right">{convertToRupiah(projectKhs.khs_service_total)}</TableCell>
                                            </TableRow>
                                        </Table>
                                    </TableContainer>
                                )}
                            {projectKhs.khs_list && projectKhs.khs_list.length !== 0 && <h6 className="my-2">LIST</h6>}
                            {projectKhs.khs_list &&
                                projectKhs.khs_list.map((khslist) => (
                                    <Accordion
                                        sx={{ boxShadow: 2 }}
                                        expanded={expandedKhsL === khslist.khs_list_id}
                                        onChange={handleChangeKhsL(khslist.khs_list_id)}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>{khslist.designator_code}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {project.project_status === 'KHS Check' &&
                                                checkPermision('CMKHS') &&
                                                !khslist.stock_chosen?.stock_qty && (
                                                    <Grid justifyContent="flex-end" sx={{ padding: 1 }}>
                                                        <Button
                                                            variant="outline-success"
                                                            onClick={() => handleKhsSource(khslist)}
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
                                            {project.project_status === 'Survey' && (
                                                <>
                                                    {checkPermision('UKHSL') && (
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() => handleEditKhsList(khslist)}
                                                            className="float-right"
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                    )}
                                                    {checkPermision('DKHSL') && (
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() => handleDeleteKhsList(khslist.khs_list_id)}
                                                            color="error"
                                                        >
                                                            <DeleteIcon />
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                            <TableContainer component={Paper}>
                                                <Table size="small" aria-label="a dense table">
                                                    {[
                                                        'brand_name',
                                                        'designator_code',
                                                        'designator_desc',
                                                        'khs_list_qty',
                                                        'product_name',
                                                        'product_portion'
                                                    ].map((atr) => (
                                                        <TableRow>
                                                            <TableCell>{atr.replace(/_/g, ' ')}</TableCell>
                                                            <TableCell align="right">{khslist[atr]}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {project.project_status !== 'Pending' &&
                                                        project.project_status !== 'Survey' &&
                                                        project.project_status !== 'Approve' &&
                                                        [
                                                            'khs_list_material_price',
                                                            'khs_list_material_total',
                                                            'khs_list_service_price',
                                                            'khs_list_service_total'
                                                        ].map((atr) => {
                                                            if (
                                                                (atr === 'khs_list_material_price' || atr === 'khs_list_material_total') &&
                                                                khsSource === 'WITEL'
                                                            ) {
                                                                return (
                                                                    <TableRow>
                                                                        <TableCell>{atr.replace(/_/g, ' ')}</TableCell>
                                                                        <TableCell align="right">
                                                                            {khslist[atr] && convertToRupiah(khslist[atr])}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            }
                                                            if (atr === 'khs_list_service_price' || atr === 'khs_list_service_total') {
                                                                return (
                                                                    <TableRow>
                                                                        <TableCell>{atr.replace(/_/g, ' ')}</TableCell>
                                                                        <TableCell align="right">{convertToRupiah(khslist[atr])}</TableCell>
                                                                    </TableRow>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    {project.project_status !== 'Pending' &&
                                                        project.project_status !== 'Survey' &&
                                                        project.project_status !== 'Approve' &&
                                                        khslist.stock_chosen?.stock_qty && (
                                                            <TableRow>
                                                                <TableCell>stock chosen qty</TableCell>
                                                                <TableCell align="right">{khslist.stock_chosen.stock_qty}</TableCell>
                                                            </TableRow>
                                                        )}
                                                </Table>
                                            </TableContainer>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                        </CardContent>
                    </Card>
                    {/* list doc backup  */}
                    <ListDocumentComponent idProject={project.project_id} survey={projectSurvey} />
                    {project.survey.length !== 0 && <BackupFile />}
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
                    onAdd={handleAddSitax}
                />
            )}

            {open && radioValue === '12' && (
                <GponComponent
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
        </div>
    );
}
