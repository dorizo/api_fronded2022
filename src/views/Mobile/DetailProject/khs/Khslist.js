/* eslint-disable consistent-return */
import { Button } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import React, { useState } from 'react';
import { Card, Col, Form, Modal, Row, Button as ButtonAtt } from 'react-bootstrap';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import { useQuery, useQueryClient } from 'react-query';
import { ADD_PROJECT_KHSV2_DETAIL, DESIGNATOR_VIEW_ALL } from 'services/datateknis';
// import { Search } from '@mui/icons-material';
import Khsdetaillist from './Khsdetaillist';

function Khslist(props) {
    const { data, witelid, project, filemanager } = props;
    const querylagi = useQueryClient();
    const [showkhs, setshowkhs] = useState(false);
    const [showsetketerangan, Setsetshowsetketerangan] = useState(false);
    const [idprojectsub, Setidprojectsub] = useState(false);
    // const handleClosekhs = () => setshowkhs(false);
    const handleClosekhsketerangan = () => Setsetshowsetketerangan(false);
    // const [variable, Setvariable] = useState(props);
    const [serching, Setseraching] = useState('');
    const [d, setd] = useState('');
    const [dataafter, Setdataafter] = useState('');
    const [Singledatakhs, Setsinggledatakhs] = useState('');

    // const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    function handleShowkhs(id) {
        setshowkhs(true);
        Setidprojectsub(id);
    }
    const onButtonClick = (fileget) => () => {
        // console.log(fileget?.fileget);
        filemanager({ open: true, urlfile: fileget });
    };
    const {
        data: designatordata,
        isLoading: lodingdesignator,
        isError: errordesignator
    } = useQuery(['DESIGNATOR_DATA', serching], () => DESIGNATOR_VIEW_ALL(serching));
    if (lodingdesignator) {
        return true;
    }
    if (errordesignator) {
        // console.log(errordesignator);
        return errordesignator;
    }
    if (designatordata?.length >= 0) {
        // console.log('loading lagi ya');
        Setdataafter(designatordata);
    }
    const submitsinglekhs = (koooo) => () => {
        // console.log(koooo);
        setshowkhs(false);
        Setsetshowsetketerangan(true);
        Setsinggledatakhs(koooo);
    };

    function changesdesinatorsearch(event) {
        if (event.target.value.length >= 3) {
            setd(event.target.value);
        }
    }
    const handleFormSubmitkhsproject = async (e) => {
        e.preventDefault();
        // console.log(props);
        const dataalls = new FormData(e.target);
        const resp = await ADD_PROJECT_KHSV2_DETAIL(dataalls);
        const x = await querylagi.fetchQuery(['SUB_PROJECT_VIEW', props?.projectid]);
        Setsetshowsetketerangan(false);
    };
    return (
        <>
            <div className="card">
                <div className="card-header p-2 d-flex justify-content-between align-items-center">
                    <div>{data?.nama_khs_kategori}</div>
                    <ButtonAtt
                        onClick={onButtonClick({
                            fileget: `${project.project_id}/${project.project_status}/${data.id_project_sub}/${data.id_project_khs_v2}/`
                        })}
                        size="sm"
                        variant="outline-danger"
                    >
                        <AttachmentIcon /> att
                    </ButtonAtt>
                </div>
                <div className="card-body position-relative">
                    <h6>Khs List</h6>
                    {data?.dataafter?.map((v, i) => (
                        <Khsdetaillist
                            data={v}
                            key={v.id_project_khs_v2_detail}
                            index="0"
                            projectid={props?.projectid}
                            witelid={props?.witelid}
                            project={project}
                            filemanager={filemanager}
                        />
                    ))}
                </div>
                <div className="d-flex justify-content-end pb-3" style={{ paddingRight: 17 }}>
                    <Button
                        onClick={() => {
                            // console.log(props?.data);
                            handleShowkhs(data?.data);
                        }}
                        variant="contained"
                        sx={{ bgcolor: '#f00' }}
                        size="small"
                        value={data?.id_project_sub}
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                    >
                        Insert KHS
                    </Button>
                </div>
            </div>
            <Modal show={showsetketerangan} onHide={handleClosekhsketerangan} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="myFormkhsproject" onSubmit={handleFormSubmitkhsproject}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control type="hidden" name="service_price" value={Singledatakhs.service_price} required />
                            <Form.Control type="hidden" name="material_price" value={Singledatakhs.material_price} required />
                            <Form.Control type="hidden" name="designator_id" value={Singledatakhs.designator_id} required />
                            <Form.Control type="hidden" name="designator_desc" value={Singledatakhs.designator_desc} required />
                            <Form.Control type="hidden" name="designator_code" value={Singledatakhs.designator_code} required />
                            <Form.Control type="hidden" name="product_id" value={Singledatakhs.product_id} required />
                            <Form.Control type="hidden" name="id_project_sub" value={data?.id_project_sub} required />
                            <Form.Control type="hidden" name="witel_id" value={witelid} required />
                            <Form.Control type="hidden" name="id_project_khs_v2" value={data?.id_project_khs_v2} required />
                            <Form.Control
                                type="number"
                                placeholder="Masukan jumlah kebutuhan"
                                autoComplete="off"
                                name="totalkebutuhan"
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosekhsketerangan}>
                        Gagal
                    </Button>
                    <Button type="submit" Form="myFormkhsproject" variant="primary">
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showkhs} onHide={handleClosekhsketerangan} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data Teknis</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control
                                    type="text"
                                    placeholder="Search Box"
                                    name="search"
                                    autoComplete="off"
                                    onChange={(e) => {
                                        changesdesinatorsearch(e);
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <>
                        {designatordata.data.data
                            // eslint-disable-next-line array-callback-return
                            .filter((i) => {
                                if (d === '') {
                                    return i;
                                }
                                if (i.designator_desc.toLowerCase().includes(d.toLowerCase())) {
                                    return i;
                                }
                            })
                            .map((i, index) => (
                                <Card key={i.designator_code} className="p-1 m-1">
                                    <Row className="align-items-center">
                                        <Col>
                                            <h4>
                                                {serching} {i.designator_code}
                                            </h4>
                                            <p>{i.designator_desc}</p>
                                        </Col>
                                        <Col xs={2}>
                                            <QueuePlayNextIcon className="flex align-middle" onClick={submitsinglekhs(i)} />
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                    </>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Khslist;
