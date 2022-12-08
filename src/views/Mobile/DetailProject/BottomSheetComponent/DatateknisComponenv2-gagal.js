import { Box, Button, Collapse, FormControl, Grid, Grow, InputLabel, MenuItem, Paper, TextField } from '@mui/material';
import { margin, padding, styled } from '@mui/system';
import React, { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GridSaveAltIcon } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import qs from 'qs';
import { ADD_PROJECT_KHSV2 } from 'services/datateknis';
import { useProject } from 'hooks/useProjectnew';

const styles = {
    input1: {
        height: 50
    },
    input2: {
        height: 200,
        fontSize: '3em'
    }
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary
}));
export default function DatateknisComponenv2(props) {
    const { open, onClose, item, onAdd, onUpdate, id } = props;
    const { Age, SetAge } = useState({ value: 1 });
    const [checkedODP, setCheckedODP] = React.useState(false);
    const [checkedODC, setCheckedODC] = React.useState(false);
    const [buttonsimpan, setbuttonsimpan] = React.useState(false);
    console.log(props);
    const { khsIdSelected } = useProject();

    const handleChangedata = () => {
        setCheckedODP((prev) => !prev);
    };
    const handleChange = (event, SelectChangeEvent) => {
        console.log(khsIdSelected);
        if (event.target.value === 3 || event.target.value === 4) {
            if (event.target.value === 4) {
                setCheckedODP(true);
            } else {
                setCheckedODP(false);
            }
            setCheckedODC(true);
        } else {
            setCheckedODC(false);
            setCheckedODP(false);
        }
        setbuttonsimpan(true);
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data);
        const response = await ADD_PROJECT_KHSV2(data);
        console.log(response);
    };
    return (
        <>
            <div>
                <BottomSheet
                    open={open}
                    blocking={false}
                    onDismiss={onClose}
                    header={<div>DATA TEKNIS{khsIdSelected}</div>}
                    snapPoints={({ minHeight }) => 400}
                >
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <Grid container spacing={2} marginTop={1}>
                                <Grid item xs={3}>
                                    <Item>Category</Item>
                                </Grid>
                                <Grid item xs={9}>
                                    <Item>
                                        <FormControl fullWidth size="small">
                                            <Select
                                                name="id_khs_kategori"
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={Age}
                                                label="Pilih Kategori"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={1}>Feeder</MenuItem>
                                                <MenuItem value={2}>Pengelaran</MenuItem>
                                                <MenuItem value={3}>ODC</MenuItem>
                                                <MenuItem value={4}>ODP</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Item>
                                </Grid>
                            </Grid>
                        </div>
                        <Collapse in={checkedODC}>
                            <Grid container>
                                <Grid item xs={3} md={3}>
                                    <Item>alamat</Item>
                                </Grid>
                                <Grid item xs={9} md={9}>
                                    <Item>
                                        <FormControl fullWidth size="small">
                                            <TextField id="fullWidth" size="small" name="id_project_sub" />
                                            <TextField id="fullWidth" size="small" name="alamat" />
                                        </FormControl>
                                    </Item>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={3} md={3}>
                                    <Item>Alamat Patokan</Item>
                                </Grid>
                                <Grid item xs={9} md={9}>
                                    <Item>
                                        <FormControl fullWidth size="small">
                                            <TextField id="fullWidth" size="small" name="patokan_alamat" />
                                        </FormControl>
                                    </Item>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6} md={6}>
                                    <Item>
                                        <FormControl fullWidth size="small">
                                            <TextField label="Long" id="fullWidth" size="small" name="long" />
                                        </FormControl>
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Item>
                                        <FormControl fullWidth size="small">
                                            <TextField label="Lat" id="fullWidth" size="small" name="lat" />
                                        </FormControl>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Collapse>
                        <Box>
                            <Collapse in={checkedODP}>
                                ODP <br />
                                ODP <br />
                                ODP <br />
                                ODP <br />
                            </Collapse>
                        </Box>
                        <Collapse in={buttonsimpan}>
                            <Button fullWidth type="submit" variant="contained" endIcon={<GridSaveAltIcon />}>
                                Simpan
                            </Button>
                        </Collapse>
                    </form>
                </BottomSheet>
            </div>
        </>
    );
}
DatateknisComponenv2.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    item: PropTypes.any,
    onAdd: PropTypes.any,
    onUpdate: PropTypes.any
};
