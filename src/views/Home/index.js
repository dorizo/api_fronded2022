import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import { useMee } from 'contexts/MeContext';
import { Navigate, useNavigate } from 'react-router';
import Welcome from '../../assets/welcome.svg';
// import Dashboard from '../dashboard/Default';
// import Inventory from './Inventory';
// import ProjectManager from './ProjectManager';
// import Teknisi from './Teknisi';

export default function Index() {
    const navigate = useNavigate();
    const { me, checkRole, role, checkPermision } = useMee();
    // const sa = checkRole('Super Admin');
    // const aa = checkRole('Admin Area');
    // const i = checkRole('Inventory');
    // const o = checkRole('Owner');
    const pm = checkRole('Project Manager');
    const t = checkRole('Technician');
    if (pm || t) {
        return <Navigate to="/mobile/project" />;
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container direction="row" sx={{ marginBottom: 2 }} justifyContent="flex-start" alignItems="stretch" spacing={2}>
                <Grid item xs={12}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <Typography sx={{ fontSize: 30 }} color="blue" gutterBottom>
                                        Hallo, {me.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {role}
                                    </Typography>
                                </div>
                                <div>
                                    <img height={100} src={Welcome} alt="icon" />
                                </div>
                            </div>
                            {checkPermision('RPRO') && (
                                <Button
                                    className="mt-3"
                                    fullWidth
                                    variant="outlined"
                                    color="info"
                                    onClick={() => navigate('/mobile/project')}
                                >
                                    TO PROJECT
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* {sa && <Dashboard />}
            {o && <Dashboard />}
            {aa && <Dashboard />}
            {pm && <ProjectManager />}
            {t && <Teknisi />}
            {i && <Inventory />} */}
        </Box>
    );
}
