import { Card, CardContent, CardHeader, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { useState, useEffect } from 'react';
import { ADD_PROJECT_KHSV2, ADD_PROJECT_SUB, SUB_PROJEC_VIEW } from 'services/datateknis';
import { useParams } from 'react-router';
import { useQuery, useQueryClient } from 'react-query';
import { Col, Container, Form, Modal, Row, Button as ButtonAtt } from 'react-bootstrap';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Khslist from './khs/Khslist';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));
export default function Datateknis(props) {
    const { witelid, project, filemanager } = props;
    const [show, setShow] = useState(false);
    const [Idprojectsub, Setidprojectsub] = useState(null);
    const [showodc, setShowodc] = useState(false);
    const [showodp, setShowodp] = useState(false);
    const core1 = [1, 2, 3, 4, 5];
    const core2 = [1, 2, 3, 4, 5];
    const core3 = [1, 2, 3, 4, 5];
    const core4 = [1, 2, 3, 4, 5];

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        Setidprojectsub(id);
    };
    const qc = useQueryClient();
    const params = useParams();
    const { data: datateknisget, isLoading: islodingdatateknis } = useQuery(['SUB_PROJECT_VIEW', params.idProject], () =>
        SUB_PROJEC_VIEW(params.idProject)
    );
    const [datatambah, Setdatatamabah] = useState(0);
    useEffect(() => {
        if (!islodingdatateknis) {
            Setdatatamabah(datateknisget?.data?.data?.length);
        }
    }, [islodingdatateknis]);
    if (islodingdatateknis) {
        return true;
    }
    const tambahdataku = async (fungsi) => {
        if (fungsi === 'plus') {
            Setdatatamabah(datatambah + 1);
            const data = {
                urutan_project: datatambah + 1,
                nm_project_sub: 'TAMBAH DATA',
                id_project: params.idProject
            };
            console.log(data);
            await ADD_PROJECT_SUB(data);
            await qc.fetchQuery(['SUB_PROJECT_VIEW', params.idProject]);
            // console.log(response.data);
        } else {
            Setdatatamabah(datatambah - 1);
        }
    };
    const khschange = (event, SelectChangeEvent) => {
        // console.log(event.target.value);
        if (event.target.value === '3' || event.target.value === '4') {
            if (event.target.value === '4') {
                setShowodc(true);
                setShowodp(true);
            } else {
                setShowodc(true);
                setShowodp(false);
                // console.log(event.target.value);
            }
        } else {
            setShowodc(false);
            setShowodp(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        // console.log(e);
        const response = await ADD_PROJECT_KHSV2(data);
        setShow(false);
        await qc.fetchQuery(['SUB_PROJECT_VIEW', params.idProject]);
    };

    const onButtonClick = (fileget) => () => {
        filemanager({ open: true, urlfile: fileget });
    };

    return (
        <>
            <Card sx={{ boxShadow: 2 }}>
                <CardHeader title="Form Survey" />
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1}>
                            <Grid item xs>
                                <Item sx={{ bgcolor: 'error.main' }}>
                                    <RemoveCircleOutlineRoundedIcon onClick={() => tambahdataku('minus')} style={{ color: '#FFF' }} />
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{datatambah}</Item>
                            </Grid>
                            <Grid item xs>
                                <Item sx={{ bgcolor: 'error.main' }}>
                                    <AddCircleOutlineOutlinedIcon onClick={() => tambahdataku('plus')} style={{ color: '#FFF' }} />
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                    {datateknisget?.data?.data?.map((i) => (
                        <Box key={i.id_project_sub} sx={{ paddingTop: 3 }}>
                            <div className="d-flex justify-content-between my-2">
                                <h6>Data Teknis {i.urutan_project}</h6>

                                <ButtonAtt
                                    onClick={onButtonClick({
                                        fileget: `${project.project_id}/${project.project_status}/${i.id_project_sub}/`
                                    })}
                                    size="sm"
                                    variant="outline-danger"
                                >
                                    <AttachmentIcon /> att
                                </ButtonAtt>
                            </div>
                            <div className="mb-3">
                                <div sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                                    {i?.datateknisdisini?.map((xx) => (
                                        <div key={xx.id_project_khs_v2} className="mb-2">
                                            <Khslist
                                                data={xx}
                                                projectid={params.idProject}
                                                witelid={witelid}
                                                project={project}
                                                filemanager={filemanager}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    onClick={() => {
                                        // console.log(i.id_project_sub);
                                        handleShow(i.id_project_sub);
                                    }}
                                    variant="contained"
                                    sx={{ bgcolor: '#f00' }}
                                    size="small"
                                    value={i.id_project_sub}
                                    startIcon={<AddCircleOutlineOutlinedIcon />}
                                >
                                    Tambah Data Teknis
                                </Button>
                            </div>
                            <h6>Data GPON {i.urutan_project}</h6>
                        </Box>
                    ))}
                </CardContent>
            </Card>
            <Modal show={show} onHide={handleClose} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data Teknis {Idprojectsub}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="myForm" onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Select name="id_khs_kategori" onChange={khschange}>
                                <option value={1}>Feeder</option>
                                <option value={2}>Pengelaran</option>
                                <option value={3}>ODC</option>
                                <option value={4}>ODP</option>
                            </Form.Select>
                        </Form.Group>
                        <Container style={{ display: showodc ? 'block' : 'none' }}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>ALAMAT</Form.Label>
                                <Form.Control type="hidden" value={Idprojectsub} name="id_project_sub" placeholder="Enter email" />
                                <Form.Control type="text" placeholder="Enter email" name="alamat" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>ALAMAT PATOKAN</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" name="patokan_alamat" />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>LONGITUDE</Form.Label>
                                        <Form.Control type="number" step="0.9999999999" placeholder="" name="long" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>LATITUDE</Form.Label>
                                        <Form.Control type="number" step="0.9999999999" placeholder="Enter email" name="lat" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                        <Container style={{ display: showodp ? 'block' : 'none' }}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Core Feeder</Form.Label>
                                        <Form.Select name="odp_core_feeder">
                                            <option value={0}>pilih</option>
                                            {core1.map((number) => (
                                                <option key={number} value={number}>
                                                    {number}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Bestray ODC</Form.Label>
                                        <Form.Select name="odp_bestrey_odc">
                                            <option value={0}>pilih</option>
                                            {core2.map((number) => (
                                                <option key={number} value={number}>
                                                    {number}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Core Distribusi ODC</Form.Label>
                                        <Form.Select name="odp_core_distribusi">
                                            <option value={0}>pilih</option>
                                            {core3.map((number) => (
                                                <option key={number} value={number}>
                                                    {number}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Bastray Distribusi ODC</Form.Label>
                                        <Form.Select name="odp_bastrey_distribusi">
                                            <option value={0}>pilih</option>
                                            {core4.map((number) => (
                                                <option key={number} value={number}>
                                                    {number}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Keluar
                    </Button>
                    <Button type="submit" Form="myForm" variant="primary">
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
