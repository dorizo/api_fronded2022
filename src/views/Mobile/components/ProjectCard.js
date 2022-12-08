import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

export default function Index() {
    return (
        <Card sx={{ boxShadow: 2 }}>
            <CardActionArea>
                <h1 style={{ backgroundColor: 'grey', padding: 10, textAlign: 'center' }}>OSPF</h1>
                <CardContent style={{ padding: 10, paddingTop: 0 }}>
                    <Typography variant="body2"> C0d30091</Typography>
                    <Typography variant="caption"> 12/10/2022</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
