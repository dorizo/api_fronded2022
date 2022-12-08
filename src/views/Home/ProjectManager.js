import { Box, Button, Card, CardActions, CardContent, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import Approve from '../../assets/approve.svg';
import Dashboard from '../../assets/dashboard.svg';

export default function Index() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2}>
                <Grid item md={6} xs={12}>
                    <Card>
                        <CardContent style={{ paddingBottom: 0 }}>
                            <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <Typography sx={{ fontSize: 23 }} color="text.primary" gutterBottom>
                                        Pekerjaan
                                    </Typography>
                                    <List style={{ padding: 0 }}>
                                        <ListItem style={{ padding: 0 }}>
                                            <ListItemText primary="Terbaru" secondary="Kordinator a" />
                                        </ListItem>
                                    </List>
                                </div>
                                <div style={{ display: 'grid' }}>
                                    <Typography
                                        variant="subtitle"
                                        sx={{ fontSize: 15, margin: 0, textAlign: 'center' }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Total
                                    </Typography>
                                    <Typography sx={{ fontSize: 50, margin: 0 }} color="blue" gutterBottom>
                                        30
                                    </Typography>
                                </div>
                            </div>
                        </CardContent>
                        <CardActions sx={{ paddingTop: 2 }}>
                            <Button sx={{ padding: 0 }} size="small">
                                Lihat detail
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item md={3} xs={6}>
                    <Card>
                        <CardContent>
                            <img height={72} src={Approve} alt="icon" />
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
                            <img height={72} src={Dashboard} alt="icon" />
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
