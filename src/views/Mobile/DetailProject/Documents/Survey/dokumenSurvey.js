import { InsertDriveFileRounded } from '@mui/icons-material';
import { Button, Paper, Typography } from '@mui/material';

const listDocument = [
    {
        name: 'dokumenSurvey.pbf'
    },
    {
        name: 'Instalasi.psdf'
    },
    {
        name: 'Terminasi.jpeg'
    }
];

export default function DocumentSurvey() {
    return (
        <div className="container">
            <Typography variant="h1" sx={{ fontSize: 24, color: '#222222', marginTop: 1 }}>
                Dokumen Survey
            </Typography>
            {listDocument?.map((item, index) => (
                <Button key={index} style={{ width: '100%' }}>
                    <Paper elevation={1} style={{ display: 'flex', width: '100%', alignItems: 'center', padding: 8, marginTop: 10 }}>
                        <Paper elevation={1} sx={{ borderRadius: '50%', padding: 1, marginRight: 1 }}>
                            <InsertDriveFileRounded sx={{ fontSize: 40, color: '#B50000' }} />
                        </Paper>
                        <div>
                            <Typography variant="h4" sx={{ fontSize: 18 }}>
                                {item.name}
                            </Typography>
                        </div>
                    </Paper>
                </Button>
            ))}
            <div style={{ marginBottom: 10 }} />
        </div>
    );
}
