import { Box, Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import Deploy from '../../assets/deploy.svg';
import Maintenance from '../../assets/maintenance.svg';

export default function Index() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2}>
                <Grid item md={3} xs={6}>
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 23 }} color="text.primary" gutterBottom>
                                Payment
                            </Typography>
                            <Typography sx={{ fontSize: 60, padding: 0.2, textAlign: 'center' }} color="blue" gutterBottom>
                                30
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={3} xs={6}>
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 23 }} color="text.primary" gutterBottom>
                                Pekerjaan
                            </Typography>
                            <List style={{ padding: 0 }}>
                                <ListItem style={{ padding: 0 }}>
                                    <ListItemText primary="10" secondary="Maintenance" />
                                </ListItem>
                                <ListItem style={{ padding: 0 }}>
                                    <ListItemText primary="5" secondary="Deployment" />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={3} xs={6}>
                    <Card>
                        <CardContent>
                            <img height={72} style={{ marginTop: 14 }} src={Maintenance} alt="icon" />
                            <Typography
                                sx={{ marginTop: 3, marginBottom: 0, fontSize: 20, textAlign: 'center' }}
                                color="#21A3F6"
                                gutterBottom
                            >
                                Approve
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={3} xs={6}>
                    <Card>
                        <CardContent>
                            <img height={72} style={{ marginTop: 14 }} src={Deploy} alt="icon" />
                            <Typography
                                sx={{ marginTop: 3, marginBottom: 0, fontSize: 20, textAlign: 'center' }}
                                color="#21A3F6"
                                gutterBottom
                            >
                                Dashboard
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
