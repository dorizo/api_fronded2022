import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { GET_PROJECTALL } from 'services/projectnew';
import { useQuery } from 'react-query';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import { useNavigate } from 'react-router';

export default function Index() {
    const navigate = useNavigate();
    const { isLoading, data } = useQuery(['GET_PROJECT_DATA'], GET_PROJECTALL);
    if (isLoading) {
        return true;
    }
    return (
        <div>
            <h4>LIST PROJECT</h4>
            <Grid container marginBottom={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                <Grid item xs={4} md={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                        <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" label="Age">
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={5} md={5}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                        <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" label="Age">
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Button fullWidth variant="contained" endIcon={<TravelExploreIcon />}>
                        Search
                    </Button>
                </Grid>
            </Grid>
            {data.data.map((post, index) => (
                <Card key={index} sx={{ boxShadow: 2, marginBottom: 2 }}>
                    <CardContent sx={{ pb: 0, '&:last-child': { pb: 0 } }}>
                        <Typography gutterBottom variant="body1" component="div">
                            {post.project_code}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Nama Witel : {post.witel_name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Tanggal Project : {post.project_date}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Status Project : {post.project_status}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            {post?.project_note}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                        <Button variant="contained" size="small" startIcon={<DeleteSweepIcon />}>
                            Hapus
                        </Button>
                        <Button variant="contained" size="small" startIcon={<EditRoadIcon />}>
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                navigate(`/mobile/project/detail/${post.project_id}`, {
                                    state: {
                                        source: post.khs_source
                                    }
                                });
                            }}
                            size="small"
                            startIcon={<NextPlanIcon />}
                        >
                            Detail
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
}
