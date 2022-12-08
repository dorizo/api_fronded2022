import { Card, CardContent, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useMee } from 'contexts/MeContext';
import Welcome from '../../../assets/welcome.svg';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router';

export default function Index() {
    const { me, checkRole } = useMee();
    const navigate = useNavigate();
    const pm = checkRole('Project Manager');
    const t = checkRole('Technician');
    return (
        <Card sx={{ boxShadow: 2, marginBottom: 2 }}>
            <CardContent>
                <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <div>
                        <Typography sx={{ fontSize: 30 }} gutterBottom>
                            Selamat Datang
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {me.name}
                        </Typography>
                        {!(pm || t) && (
                            <Button onClick={() => navigate('/')} variant="outlined" color="info">
                                <HomeIcon />
                            </Button>
                        )}
                    </div>
                    <div>
                        <img height={100} src={Welcome} alt="icon" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
