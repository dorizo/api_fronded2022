import { InsertDriveFileRounded } from '@mui/icons-material';
import { Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';
/* eslint-disable react/prop-types */

export default function ListDocumentComponent({ survey, idProject }) {
    const navigate = useNavigate();
    const handleNavigate = (item) => {
        navigate(`/mobile/project/detail/file/${item}/${idProject}`);
    };
    const ss = survey && survey?.map((item) => item.direktori).filter((value, index, self) => self.indexOf(value) === index);

    return (
        <>
            {ss?.map((item, index) => (
                <Button key={index} style={{ width: '100%' }} onClick={() => handleNavigate(item.toLocaleLowerCase())}>
                    <Paper elevation={1} style={{ display: 'flex', width: '100%', alignItems: 'center', padding: 8, marginTop: 10 }}>
                        <Paper elevation={1} sx={{ borderRadius: '50%', padding: 1, marginRight: 1 }}>
                            <InsertDriveFileRounded sx={{ fontSize: 40 }} />
                        </Paper>
                        <div>
                            <Typography variant="h4" sx={{ fontSize: 25 }}>
                                {item}
                            </Typography>
                        </div>
                    </Paper>
                </Button>
            ))}
            <div style={{ marginBottom: 10 }} />
        </>
    );
}
