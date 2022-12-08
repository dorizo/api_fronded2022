import { Box, Button, Card, CardActions, CardContent, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import Approve from '../../assets/approve.svg';
import Request from '../../assets/request.svg';
import Stok from '../../assets/stok.svg';
import Supplier from '../../assets/supplier.svg';

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
                                        Barang
                                    </Typography>
                                    <List style={{ padding: 0 }}>
                                        <ListItem style={{ padding: 0 }}>
                                            <ListItemText primary="100" secondary="Masuk" />
                                        </ListItem>
                                        <ListItem style={{ padding: 0 }}>
                                            <ListItemText primary="100" secondary="Keluar" />
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
                                        200
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
                <Grid item md={6} xs={12}>
                    <Card>
                        <CardContent style={{ paddingBottom: 0 }}>
                            <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <Typography sx={{ fontSize: 23 }} color="text.primary" gutterBottom>
                                        Warning Stok
                                    </Typography>
                                    <List style={{ padding: 0 }}>
                                        <ListItem style={{ padding: 0 }}>
                                            <ListItemText primary="Stok a" secondary="jumlah&nbsp;10" />
                                        </ListItem>
                                        <ListItem style={{ padding: 0 }}>
                                            <ListItemText primary="Stok b" secondary="jumlah&nbsp;20" />
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
                            <img height={72} src={Supplier} alt="icon" />
                            <Typography
                                sx={{ marginTop: 3, marginBottom: 0, fontSize: 20, textAlign: 'center' }}
                                color="#21A3F6"
                                gutterBottom
                            >
                                Supplier
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={3} xs={6}>
                    <Card>
                        <CardContent>
                            <img height={72} src={Request} alt="icon" />
                            <Typography
                                sx={{ marginTop: 3, marginBottom: 0, fontSize: 20, textAlign: 'center' }}
                                color="#21A3F6"
                                gutterBottom
                            >
                                Request
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={3} xs={6}>
                    <Card>
                        <CardContent>
                            <img height={72} src={Stok} alt="icon" />
                            <Typography
                                sx={{ marginTop: 3, marginBottom: 0, fontSize: 20, textAlign: 'center' }}
                                color="#21A3F6"
                                gutterBottom
                            >
                                Stok View
                            </Typography>
                        </CardContent>
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
            </Grid>
        </Box>
    );
}
