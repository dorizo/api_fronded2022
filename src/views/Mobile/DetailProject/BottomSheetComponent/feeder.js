/* eslint-disable no-unused-vars */

import { Button, Grid, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { BottomSheet } from 'react-spring-bottom-sheet';
import * as Yup from 'yup';

export default function FeederComponent(props) {
    const { open, onClose, item, onAdd, onUpdate, id } = props;
    const editMode = Boolean(item && item.feeder_id);

    const handleSubmit = (values, { setErrors }) => {
        if (editMode) {
            onUpdate(
                {
                    feeder_odc: values.feeder_odc,
                    feeder_capacity: values.feeder_capacity,
                    feeder_lg: values.feeder_lg,
                    feeder_lt: values.feeder_lt,
                    feeder_address: values.feeder_address,
                    feeder_port: values.feeder_port,
                    feeder_core: values.feeder_core
                },
                item.feeder_id,
                setErrors
            );
        } else {
            onAdd(
                {
                    feeder_odc: values.feeder_odc,
                    feeder_capacity: values.feeder_capacity,
                    feeder_lg: values.feeder_lg,
                    feeder_lt: values.feeder_lt,
                    feeder_port: values.feeder_port,
                    feeder_address: values.feeder_address,
                    feeder_core: values.feeder_core
                },
                id,
                setErrors
            );
        }
    };

    const formik = useFormik({
        initialValues: {
            feeder_odc: item ? item.feeder_odc : '',
            feeder_capacity: item ? item.feeder_capacity : '',
            feeder_address: item ? item.feeder_address : '',
            feeder_lg: item ? item.feeder_lg : '',
            feeder_lt: item ? item.feeder_lt : '',
            feeder_port: item ? item.feeder_port : '',
            feeder_core: item ? item.feeder_core : ''
        },
        validationSchema: Yup.object({
            feeder_odc: Yup.string().required('Harus Disisi'),
            feeder_capacity: Yup.string().required('Harus Disisi'),
            feeder_address: Yup.string().required('Harus Disisi'),
            feeder_lg: Yup.number().required('Harus Disisi'),
            feeder_lt: Yup.number().required('Harus Disisi'),
            feeder_port: Yup.number().required('Harus Disisi'),
            feeder_core: Yup.number().required('Harus Disisi')
        }),
        onSubmit: handleSubmit
    });
    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div> {editMode ? 'Edit' : 'Tambah'} Feeder</div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="feeder_odc"
                                    id="feeder_odc"
                                    label="ODC Name"
                                    autoComplete="off"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    placeholder="Masukkan PORT GPON"
                                    value={formik.values.feeder_odc}
                                    onChange={formik.handleChange}
                                    error={formik.touched.feeder_odc && Boolean(formik.errors.feeder_odc)}
                                    helperText={formik.touched.feeder_odc && formik.errors.feeder_odc}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="feeder_capacity"
                                    id="feeder_capacity"
                                    label="Kapasitas"
                                    type="text"
                                    autoComplete="off"
                                    fullWidth
                                    variant="standard"
                                    placeholder="Masukkan Kapasitas ODC"
                                    value={formik.values.feeder_capacity}
                                    onChange={formik.handleChange}
                                    error={formik.touched.feeder_capacity && Boolean(formik.errors.feeder_capacity)}
                                    helperText={formik.touched.feeder_capacity && formik.errors.feeder_capacity}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="feeder_address"
                                    id="feeder_address"
                                    label="Alamat"
                                    type="text"
                                    autoComplete="off"
                                    fullWidth
                                    variant="standard"
                                    placeholder="Masukkan Alamat ODC"
                                    value={formik.values.feeder_address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.feeder_address && Boolean(formik.errors.feeder_address)}
                                    helperText={formik.touched.feeder_address && formik.errors.feeder_address}
                                />
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="dense"
                                        name="feeder_lt"
                                        id="feeder_lt"
                                        label="Koordinat Latitude"
                                        autoComplete="off"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        placeholder="-6.186002"
                                        value={formik.values.feeder_lt}
                                        onChange={formik.handleChange}
                                        error={formik.touched.feeder_lt && Boolean(formik.errors.feeder_lt)}
                                        helperText={formik.touched.feeder_lt && formik.errors.feeder_lt}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="dense"
                                        name="feeder_lg"
                                        id="feeder_lg"
                                        label="Koordinat Longitude"
                                        autoComplete="off"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        placeholder="Masukkan 106.823935"
                                        value={formik.values.feeder_lg}
                                        onChange={formik.handleChange}
                                        error={formik.touched.feeder_lg && Boolean(formik.errors.feeder_lg)}
                                        helperText={formik.touched.feeder_lg && formik.errors.feeder_lg}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel sx={{ padding: 0 }} id="port-label">
                                        Port feeder
                                    </InputLabel>
                                    <Select
                                        margin="dense"
                                        name="feeder_port"
                                        autoComplete="off"
                                        id="feeder_port"
                                        value={formik.values.feeder_port}
                                        onChange={formik.handleChange}
                                        error={formik.touched.feeder_port && Boolean(formik.errors.feeder_port)}
                                        labelId="port-label"
                                    >
                                        {[...Array(100)].map((a, i) => (
                                            <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel sx={{ padding: 0 }} id="core-label">
                                        Bestray Feeder
                                    </InputLabel>
                                    <Select
                                        margin="dense"
                                        name="feeder_core"
                                        autoComplete="off"
                                        id="feeder_core"
                                        value={formik.values.feeder_core}
                                        onChange={formik.handleChange}
                                        error={formik.touched.feeder_core && Boolean(formik.errors.feeder_core)}
                                        labelId="core-label"
                                    >
                                        {[...Array(288)].map((a, i) => (
                                            <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Button
                                type="submit"
                                style={{ backgroundColor: 'green', width: '100%', marginTop: 10, marginBottom: 10, color: 'white' }}
                            >
                                {editMode ? 'Edit' : 'Tambah'}
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </BottomSheet>
        </div>
    );
}
FeederComponent.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    item: PropTypes.any,
    onAdd: PropTypes.any,
    id: PropTypes.any,
    onUpdate: PropTypes.any
};
