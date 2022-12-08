/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable  react/prop-types */

import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardContent,
    CardHeader,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';
import { useMee } from 'contexts/MeContext';
import { useProject } from 'hooks/useProjectnew';
import React from 'react';

export default function FeederPart() {
    const {
        project,
        openModal,
        projectFeeder,
        handleChange,
        handleEditFeeder,
        handleComplateF,
        handleChange2,
        handleEditDistribusi,
        handleDeleteDistribusi,
        handleComplateD,
        handleFinal,
        expanded,
        expanded2
    } = useProject();
    const { checkPermision } = useMee();
    return (
        <Card sx={{ boxShadow: 2, marginBottom: 2 }}>
            <CardHeader title="Feeder" />
            <CardContent>
                {projectFeeder.map((fe) => (
                    <Accordion sx={{ boxShadow: 2 }} expanded={expanded === fe.feeder_id} onChange={handleChange(fe.feeder_id)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>{fe.feeder_odc}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    {project.project_status === 'Survey' && (
                                        <>
                                            {checkPermision('UFED') && (
                                                <Button variant="outlined" onClick={() => handleEditFeeder(fe)} className="float-right">
                                                    <EditIcon />
                                                </Button>
                                            )}
                                            {checkPermision('DFED') && (
                                                <Button variant="outlined" onClick={() => handleEditFeeder(fe.feeder_id)} color="error">
                                                    <DeleteIcon />
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </div>
                                {fe.olt_gpon === '0' && project.project_status === 'Valid 3' && checkPermision('CDSV3') && (
                                    <Button variant="outlined" onClick={() => handleComplateF(fe)} color="success">
                                        Complete Feeder
                                        <CheckIcon />
                                    </Button>
                                )}
                            </div>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    {[
                                        { id: 'feeder_address', title: 'feeder_address' },
                                        { id: 'feeder_capacity', title: 'feeder_capacity' },
                                        { id: 'feeder_core', title: 'bestray feeder' },
                                        { id: 'feeder_lg', title: 'feeder_lg' },
                                        { id: 'feeder_lt', title: 'feeder_lt' },
                                        { id: 'feeder_odc', title: 'feeder_odc' },
                                        { id: 'feeder_port', title: 'feeder_port' }
                                    ].map((atr) => (
                                        <TableRow>
                                            <TableCell>{atr.title.replace(/_/g, ' ')}</TableCell>
                                            <TableCell align="right">{fe[atr.id]}</TableCell>
                                        </TableRow>
                                    ))}
                                    {(project.project_status === 'Labeling' ||
                                        project.project_status === 'Valid 3' ||
                                        project.project_status === 'Valid 4' ||
                                        project.project_status === 'Done') &&
                                        fe.olt_gpon !== '0' &&
                                        ['olt_gpon', 'olt_slot', 'otl_port', 'output_feeder', 'output_pasif'].map((atr) => (
                                            <TableRow>
                                                <TableCell>{atr.replace(/_/g, ' ')}</TableCell>
                                                <TableCell align="right">{fe[atr]}</TableCell>
                                            </TableRow>
                                        ))}
                                </Table>
                            </TableContainer>
                            <Card sx={{ boxShadow: 2, marginBottom: 2 }}>
                                <CardHeader
                                    title="Distribusi"
                                    action={
                                        project.project_status === 'Survey' &&
                                        checkPermision('CDIS') && (
                                            <Button
                                                type="radio"
                                                fullWidth
                                                name="radio"
                                                onClick={() => openModal('3')}
                                                style={{
                                                    backgroundColor: '#DB1F1F',
                                                    color: 'white',
                                                    fontWeight: '700',
                                                    width: '100%'
                                                }}
                                            >
                                                Distribusi
                                            </Button>
                                        )
                                    }
                                />
                                <CardContent>
                                    {fe.distribusi.map((dis) => (
                                        <Accordion
                                            sx={{ boxShadow: 2 }}
                                            expanded={expanded2 === dis.distribusi_id}
                                            onChange={handleChange2(dis.distribusi_id)}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                                <Typography sx={{ width: '33%', flexShrink: 0 }}>{dis.distribusi_address}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        {project.project_status === 'Survey' && (
                                                            <>
                                                                {checkPermision('UDIS') && (
                                                                    <Button
                                                                        variant="outlined"
                                                                        onClick={() => handleEditDistribusi(dis)}
                                                                        className="float-right"
                                                                    >
                                                                        <EditIcon />
                                                                    </Button>
                                                                )}
                                                                {checkPermision('DDIS') && (
                                                                    <Button
                                                                        variant="outlined"
                                                                        onClick={() => handleDeleteDistribusi(dis.distribusi_id)}
                                                                        color="error"
                                                                    >
                                                                        <DeleteIcon />
                                                                    </Button>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                    {dis.odp_valid_3 === '' &&
                                                        project.project_status === 'Valid 3' &&
                                                        checkPermision('CDSV3') && (
                                                            <Button variant="outlined" onClick={() => handleComplateD(dis)} color="success">
                                                                Complete <CheckIcon />
                                                            </Button>
                                                        )}
                                                    {dis.odp_valid_4 === '' &&
                                                        dis.odp_valid_3 !== '' &&
                                                        project.project_status === 'Valid 4' &&
                                                        checkPermision('CDV4') && (
                                                            <Button variant="outlined" onClick={() => handleFinal(dis)} color="success">
                                                                Complete Final
                                                                <CheckIcon />
                                                            </Button>
                                                        )}
                                                </div>

                                                <TableContainer component={Paper}>
                                                    <Table size="small" aria-label="a dense table">
                                                        {[
                                                            { id: 'distribusi_odp', title: 'odp name' },
                                                            { id: 'distribusi_address', title: 'distribusi_address' },
                                                            { id: 'distribusi_benchmark_address', title: 'patokan alamat' },
                                                            { id: 'distribusi_capacity', title: 'distribusi_capacity' },
                                                            { id: 'distribusi_core', title: 'distribusi_core' },
                                                            { id: 'distribusi_core_opsi', title: 'distribusi_core_2' },
                                                            { id: 'distribusi_dropcore', title: 'panjang' },
                                                            { id: 'distribusi_kukd', title: 'distribusi_kukd' },
                                                            { id: 'distribusi_lg', title: 'distribusi_lg' },
                                                            { id: 'distribusi_lt', title: 'distribusi_lt' },
                                                            { id: 'distribusi_note', title: 'distribusi_note' }
                                                        ].map((atr) => (
                                                            <TableRow>
                                                                <TableCell>{atr.title.replace(/_/g, ' ')}</TableCell>
                                                                <TableCell align="right">{dis[atr.id]}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                        {(project.project_status === 'Labeling' ||
                                                            project.project_status === 'Valid 3' ||
                                                            project.project_status === 'Valid 4' ||
                                                            project.project_status === 'Done') &&
                                                            dis.odp_valid_3 !== '' &&
                                                            ['hasil_ukur_odp_valid_3', 'odp_valid_3'].map((atr) => (
                                                                <TableRow>
                                                                    <TableCell>{atr.replace(/_/g, ' ')}</TableCell>
                                                                    <TableCell align="right">{dis[atr]}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        {(project.project_status === 'Valid 4' || project.project_status === 'Done') &&
                                                            dis.odp_valid_4 !== '' &&
                                                            ['hasil_ukur_odp_valid_4', 'odp_valid_4'].map((atr) => (
                                                                <TableRow>
                                                                    <TableCell>{atr.replace(/_/g, ' ')}</TableCell>
                                                                    <TableCell align="right">{dis[atr]}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                    </Table>
                                                </TableContainer>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </CardContent>
                            </Card>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </CardContent>
        </Card>
    );
}
