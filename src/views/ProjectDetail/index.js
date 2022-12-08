import { CardContent, Chip, Typography } from '@mui/material';
import useSnackbar from 'components/SnackBar';
import { Button, Card } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { SUB_PROJEC_VIEW } from 'services/datateknis';
// import { GET_PROJECT } from 'services/project';
import { GET_PROJECTSD } from 'services/projectnew';

export default function Index() {
    const params = useParams();
    const { SnackBarComponent } = useSnackbar();
    const {
        data: projectdata,
        isLoading: loadingproject
        // refetch
    } = useQuery(['GET_PROJECT', params.idProject], () => GET_PROJECTSD(params.idProject));
    const { data: datateknisget, isLoading: islodingdatateknis } = useQuery(['SUB_PROJECT_VIEW', params.idProject], () =>
        SUB_PROJEC_VIEW(params.idProject)
    );
    if (loadingproject) {
        return true;
    }
    if (islodingdatateknis) {
        return true;
    }
    const project = projectdata?.data;

    return (
        <>
            <SnackBarComponent />
            <Card style={{ boxShadow: 2, padding: 1, marginBottom: 20 }}>
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography style={{ marginBottom: 10, marginTop: 10 }} variant="h3">
                            Detail Project {project.project_code} | {project.cat_name}
                        </Typography>
                        <Typography
                            // color={project.persen <= 30 ? 'error' : project.persen > 30 && project.persen <= 70 ? '#f57c00' : '#388e3c'}
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
                            label={project?.project_status}
                            color="secondary"
                            variant="outlined"
                        />
                    </div>
                </CardContent>
            </Card>
            {project?.project_status === 'KHS Check' && (
                <div>
                    <h1>ESTIMASI PEKERJAAN</h1>
                    {datateknisget?.data?.data.map((i) => (
                        <Card>
                            <CardContent>
                                <h1>Project data {i?.urutan_project}</h1>
                                {i?.datateknisdisini.map((ii) => (
                                    <Card>
                                        <CardContent>
                                            <h2>{ii?.nama_khs_kategori}</h2>
                                            {ii?.dataafter.map((iii) => (
                                                <Card>
                                                    <CardContent>
                                                        <p>{iii.designator_code}</p>
                                                        <p>{iii.designator_desc}</p>
                                                        <p>{iii.totalkebutuhan}</p>
                                                        <h6>Detail pemasangan</h6>
                                                        <div className="block-example border border-dark mb-2 p-2">
                                                            <p>Harga Jasa {parseInt(iii.service_price, 10).toLocaleString()}</p>
                                                            <p>total jasa {(iii.totalkebutuhan * iii.service_price).toLocaleString()}</p>
                                                        </div>
                                                        <div className="block-example border border-dark mb-2  p-2">
                                                            <p>Harga Material {parseInt(iii.material_price, 10).toLocaleString()}</p>
                                                            <p>
                                                                total Material {(iii.totalkebutuhan * iii.material_price).toLocaleString()}
                                                            </p>
                                                            <p>{iii.product_id}</p>
                                                        </div>
                                                        <Button>Penangung Jawab</Button>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </CardContent>
                                    </Card>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}
