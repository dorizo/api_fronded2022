import AddIcon from '@mui/icons-material/Add';
import DatePicker from '@mui/lab/DatePicker';
import { Button, Fab, FormControl, Grid, InputLabel, ListSubheader, Menu, MenuItem, Select, TextField } from '@mui/material';
import LoadingPage from 'components/Loading';
import useSnackbar from 'components/SnackBar';
import { useMee } from 'contexts/MeContext';
import moment from 'moment';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { BottomSheet } from 'react-spring-bottom-sheet';
// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import 'react-spring-bottom-sheet/dist/style.css';
import { ADD_PROJECT, DELETE_PROJECT, GET_PROJECTS_CAT, UPDATE_PROJECT } from 'services/project';
import Welcome from '../components/Welcome';
import ListProject from '../ListProject';

export default function Index() {
    const { checkPermision } = useMee();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('_');
    const [projectCategory, setProjectCategory] = useState(null);
    const [projectStart, setProjectStart] = useState(null);
    const [projectDone, setProjectDone] = useState(null);
    const [itemSelected, setItemSelected] = useState(null);
    const [note, setNote] = useState('');
    const [projectDate, setProjectDate] = useState(null);
    const { data, isLoading } = useQuery('GET_PROJECTS_CAT', GET_PROJECTS_CAT);
    const { snackBarOpen, SnackBarComponent } = useSnackbar();
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event, item) => {
        setItemSelected(item);
        setAnchorEl(event.currentTarget);
    };
    const handelEdit = () => {
        const date = moment(new Date(itemSelected.project_date));
        setProjectDate(date);
        setProjectCategory(itemSelected.cat_id);
        setNote(itemSelected.project_note);
        setCode(itemSelected.project_code);
        setOpen(true);
        setAnchorEl(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleModalAdd = () => {
        setItemSelected(null);
        setProjectDate(null);
        setProjectCategory(null);
        setNote(null);
        setCode(null);
        setOpen(true);
    };
    const cat = data && data.data;

    const qc = useQueryClient();
    if (isLoading) {
        return <LoadingPage />;
    }
    const handleSimpan = async () => {
        const c = code || '-';
        const data = {
            project_code: c,
            project_start: projectStart.format('YYYY-MM-DD'),
            project_done: projectDone.format('YYYY-MM-DD'),
            project_date: projectDate.format('YYYY-MM-DD'),
            cat_id: projectCategory,
            project_note: note
        };
        setLoading(true);
        const response = itemSelected ? await UPDATE_PROJECT(data, itemSelected.project_id) : await ADD_PROJECT(data);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            setOpen(false);
            qc.fetchQuery('GET_PROJECTS');
        }
        await setLoading(false);
    };
    const handleDelete = async () => {
        setLoading(true);
        const response = await DELETE_PROJECT(itemSelected.project_id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            setOpen(false);
            qc.fetchQuery('GET_PROJECTS');
        }
        await setLoading(false);
    };

    return (
        <div>
            <div className="container">
                <Welcome />
                {checkPermision('CPRO') && (
                    <Fab
                        variant="extended"
                        style={{ position: 'fixed', bottom: 16, right: 16 }}
                        color="primary"
                        aria-label="add"
                        onClick={handleModalAdd}
                    >
                        <AddIcon /> Tambah Project
                    </Fab>
                )}
                <ListProject handleAction={handleClick} />
            </div>
            <>
                <BottomSheet
                    open={open}
                    blocking={false}
                    onDismiss={() => setOpen(false)}
                    header={<div> {itemSelected ? 'Edit' : 'Tambah'} Project</div>}
                    snapPoints={({ maxHeight }) => 0.8 * maxHeight}
                >
                    <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="off"
                                margin="dense"
                                name="name"
                                id="name"
                                value={code}
                                defaultValue="-"
                                onChange={(e) => setCode(e.target.value)}
                                label="Project Code"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker
                                maxDate={projectDone}
                                label="Estimasi Mulai"
                                value={projectStart}
                                onChange={(newValue) => {
                                    setProjectStart(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        variant="standard"
                                        margin="dense"
                                        fullWidth
                                        style={{ marginRight: 2 }}
                                        size="small"
                                        {...params}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker
                                minDate={projectStart}
                                label="Estimasi Selesai"
                                value={projectDone}
                                onChange={(newValue) => {
                                    setProjectDone(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        variant="standard"
                                        margin="dense"
                                        fullWidth
                                        style={{ marginRight: 2 }}
                                        size="small"
                                        {...params}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="label-cat" sx={{ padding: 0 }}>
                                    Category
                                </InputLabel>
                                <Select onChange={(e) => setProjectCategory(e.target.value)} labelId="label-cat" id="select">
                                    {cat.data.map((item) => {
                                        if (item.sub_cat) {
                                            const SUB = item.sub_cat.map((sc) => {
                                                if (sc.sub_cat) {
                                                    const SUBSUB = sc.sub_cat.map((sc) => (
                                                        <MenuItem value={sc.cat_id}>{sc.cat_name}</MenuItem>
                                                    ));
                                                    return [<ListSubheader>{sc.cat_name}</ListSubheader>, SUBSUB];
                                                }
                                                return <MenuItem value={sc.cat_id}>{sc.cat_name}</MenuItem>;
                                            });
                                            return [<ListSubheader>{item.cat_name}</ListSubheader>, SUB];
                                        }
                                        return <MenuItem value={item.cat_id}>{item.cat_name}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker
                                style={{ zIndex: 100 }}
                                label="Project Date"
                                value={projectDate}
                                onChange={(newValue) => {
                                    setProjectDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} variant="standard" margin="dense" fullWidth />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                variant="standard"
                                fullWidth
                                id="outlined-multiline-flexible"
                                label="Note"
                                multiline
                                minRows={4}
                            />
                        </Grid>
                        <Button
                            className="mb-2 mt-2"
                            onClick={handleSimpan}
                            disabled={projectCategory === null || projectDate === null || loading}
                            fullWidth
                            variant="contained"
                            color="success"
                        >
                            Simpan
                        </Button>
                    </Grid>
                </BottomSheet>
                <SnackBarComponent />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button'
                    }}
                >
                    {checkPermision('RPRO') && (
                        <MenuItem
                            onClick={() =>
                                navigate(`/mobile/project/detail/${itemSelected.project_id}`, {
                                    state: {
                                        source: itemSelected.khs_source
                                    }
                                })
                            }
                        >
                            Detail
                        </MenuItem>
                    )}
                    {checkPermision('UPRO') && <MenuItem onClick={handelEdit}>Edit</MenuItem>}
                    {checkPermision('DPRO') && <MenuItem onClick={handleDelete}>Hapus</MenuItem>}
                </Menu>
            </>
        </div>
    );
}
