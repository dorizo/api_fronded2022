import { InsertDriveFileRounded } from '@mui/icons-material';
import { Button, Grid, Paper, Skeleton, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { GET_PROJECT_FILES } from 'services/project';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ListFile() {
    const params = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery(['GET_PROJECT_FILES', params.dir], () => GET_PROJECT_FILES(params.projectId, params.dir));
    const file = data && data.data;
    const downloadFile = (item) => {
        /* eslint-disable prefer-const */
        /* eslint-disable no-alert */
        /* eslint-disable no-useless-escape */
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        let filePath = item.downloadLink;
        fetch(filePath, { headers })
            .then(async (response) => {
                const b = await response.blob();
                let a = document.createElement('a');
                let url = URL.createObjectURL(b);
                a.href = url;
                a.download = item.namaFile;
                a.click();
            })
            .catch((err) => alert(err));
    };
    if (isLoading) {
        return (
            <div className="container">
                <Skeleton variant="text" />
                {[0, 1, 2, 3, 4].map((i) => (
                    <Grid key={i} sx={{ marginBottom: 2 }} xs={12}>
                        <Skeleton height={100} />
                    </Grid>
                ))}
            </div>
        );
    }
    return (
        <div className="container">
            <Button color="error" onClick={() => navigate(-1)}>
                <ArrowBackIcon /> Kembali
            </Button>
            <Typography variant="h1" sx={{ fontSize: 24, color: '#222222', marginTop: 1 }}>
                Dokumen {params.dir}
            </Typography>
            {file.data &&
                file.data[params.dir].map((item, index) => (
                    <Button onClick={() => downloadFile(item)} key={index} style={{ width: '100%' }}>
                        <Paper elevation={1} style={{ display: 'flex', width: '100%', alignItems: 'center', padding: 8, marginTop: 10 }}>
                            <Paper elevation={1} sx={{ borderRadius: '50%', padding: 1, marginRight: 1 }}>
                                <InsertDriveFileRounded sx={{ fontSize: 40, color: '#B50000' }} />
                            </Paper>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography variant="h4" sx={{ fontSize: 18 }}>
                                    {item.namaFile}
                                </Typography>
                                <Typography variant="caption" align="left" textAlign="left" color="text.secondary">
                                    {item.createAt}
                                </Typography>
                            </div>
                        </Paper>
                    </Button>
                ))}
            <div style={{ marginBottom: 10 }} />
        </div>
    );
}
