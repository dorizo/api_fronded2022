/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import * as Yup from 'yup';

const listKuKd = [
    { name: '12', value: 12 },
    { name: '24', value: 24 },
    { name: '48', value: 48 }
];

const listKapasitas = [
    { name: '8', value: 8 },
    { name: '16', value: 16 }
];

export default function DistribusiComponent(props) {
    const { open, onClose, item, onAdd, onUpdate, idFeeder, labelCat } = props;
    const editMode = Boolean(item && item.distribusi_id);
    const [kuKd, setKuKd] = useState(editMode ? item.distribusi_kukd : null);
    const [kapasitas, setKapasitas] = useState(editMode ? item.distribusi_capacity : '8');

    const handleSubmit = (values, { setErrors }) => {
        const core2 = kapasitas !== '8' ? values.distribusi_core_opsi : 0;
        if (editMode) {
            const item = {
                distribusi_kukd: kuKd,
                distribusi_address: values.distribusi_address,
                distribusi_lg: values.distribusi_lg,
                distribusi_benchmark_address: values.distribusi_benchmark_address,
                distribusi_odp: values.distribusi_odp,
                distribusi_lt: values.distribusi_lt,
                distribusi_core: values.distribusi_core,
                distribusi_core_opsi: core2,
                distribusi_capacity: kapasitas,
                distribusi_note: values.distribusi_note
            };
            if (labelCat === '0') {
                item.distribusi_dropcore = values.distribusi_dropcore;
            }
            onUpdate(item, idFeeder, setErrors);
        } else {
            const item = {
                distribusi_kukd: kuKd,
                distribusi_address: values.distribusi_address,
                distribusi_benchmark_address: values.distribusi_benchmark_address,
                distribusi_odp: values.distribusi_odp,
                distribusi_lg: values.distribusi_lg,
                distribusi_lt: values.distribusi_lt,
                distribusi_core: values.distribusi_core,
                distribusi_core_opsi: core2,
                distribusi_capacity: kapasitas,
                distribusi_note: values.distribusi_note
            };
            if (labelCat === '0') {
                item.distribusi_dropcore = values.distribusi_dropcore;
            }
            onAdd(item, idFeeder, setErrors);
        }
    };

    const formik = useFormik({
        initialValues: {
            distribusi_kukd: item ? item.distribusi_kukd : '',
            distribusi_dropcore: item ? item.distribusi_dropcore : '',
            distribusi_odp: item ? item.distribusi_odp : '',
            distribusi_benchmark_address: item ? item.distribusi_benchmark_address : '',
            distribusi_address: item ? item.distribusi_address : '',
            distribusi_lg: item ? item.distribusi_lg : '',
            distribusi_lt: item ? item.distribusi_lt : '',
            distribusi_core: item ? item.distribusi_core : '',
            distribusi_core_opsi: item ? item.distribusi_core_opsi : '',
            distribusi_capacity: item ? item.distribusi_capacity : '',
            distribusi_note: item ? item.distribusi_note : ''
        },
        validationSchema: Yup.object({
            distribusi_dropcore: Yup.number(),
            distribusi_odp: Yup.string().required('Harus Disisi'),
            distribusi_benchmark_address: Yup.string().required('Harus Disisi'),
            distribusi_address: Yup.string().required('Harus Disisi'),
            distribusi_lg: Yup.number().required('Harus Disisi'),
            distribusi_lt: Yup.number().required('Harus Disisi'),
            distribusi_core: Yup.number().required('Harus Disisi')
        }),
        onSubmit: handleSubmit
    });

    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div> {editMode ? 'Edit' : 'Tambah'} Distribusi</div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            name="distribusi_odp"
                            id="distribusi_odp"
                            autoComplete="off"
                            label="ODP Name"
                            type="text"
                            placeholder="ODP Name"
                            fullWidth
                            variant="standard"
                            value={formik.values.distribusi_odp}
                            onChange={formik.handleChange}
                            error={formik.touched.distribusi_odp && Boolean(formik.errors.distribusi_odp)}
                            helperText={formik.touched.distribusi_odp && formik.errors.distribusi_odp}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={formik.handleSubmit}>
                            <h5>KU/KD</h5>
                            {listKuKd.map((item, index) => (
                                <Button
                                    key={index}
                                    style={
                                        kuKd === item.name
                                            ? { backgroundColor: '#FF0303', color: 'white', margin: 2, fontWeight: '700' }
                                            : { backgroundColor: '#A7A7A7', color: 'white', margin: 2, fontWeight: '700' }
                                    }
                                    onClick={() => {
                                        setKuKd(item.name);
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))}
                            {labelCat === '0' && (
                                <Grid item xs={12}>
                                    <TextField
                                        margin="dense"
                                        name="distribusi_dropcore"
                                        id="distribusi_dropcore"
                                        label="Panjang"
                                        autoComplete="off"
                                        fullWidth
                                        variant="standard"
                                        type="number"
                                        placeholder="Masukkan Angka"
                                        value={formik.values.distribusi_dropcore}
                                        onChange={formik.handleChange}
                                        error={formik.touched.distribusi_dropcore && Boolean(formik.errors.distribusi_dropcore)}
                                        helperText={formik.touched.distribusi_dropcore && formik.errors.distribusi_dropcore}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="distribusi_address"
                                    id="distribusi_address"
                                    autoComplete="off"
                                    label="Alamat"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    placeholder="Masukkan Alamat"
                                    value={formik.values.distribusi_address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.distribusi_address && Boolean(formik.errors.distribusi_address)}
                                    helperText={formik.touched.distribusi_address && formik.errors.distribusi_address}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="distribusi_benchmark_address"
                                    id="distribusi_benchmark_address"
                                    autoComplete="off"
                                    label="Patokan Alamat"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    placeholder="Masukkan Patokan Alamat"
                                    value={formik.values.distribusi_benchmark_address}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.distribusi_benchmark_address && Boolean(formik.errors.distribusi_benchmark_address)
                                    }
                                    helperText={formik.touched.distribusi_benchmark_address && formik.errors.distribusi_benchmark_address}
                                />
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="dense"
                                        name="distribusi_lg"
                                        id="distribusi_lg"
                                        label="Koordinat Longitude"
                                        autoComplete="off"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        placeholder="Masukkan Alamat ODC"
                                        value={formik.values.distribusi_lg}
                                        onChange={formik.handleChange}
                                        error={formik.touched.distribusi_lg && Boolean(formik.errors.distribusi_lg)}
                                        helperText={formik.touched.distribusi_lg && formik.errors.distribusi_lg}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="dense"
                                        name="distribusi_lt"
                                        id="distribusi_lt"
                                        label="Koordinat Latitude"
                                        autoComplete="off"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        placeholder="Masukkan Alamat ODC"
                                        value={formik.values.distribusi_lt}
                                        onChange={formik.handleChange}
                                        error={formik.touched.distribusi_lt && Boolean(formik.errors.distribusi_lt)}
                                        helperText={formik.touched.distribusi_lt && formik.errors.distribusi_lt}
                                    />
                                </Grid>
                            </Grid>
                            <h5>Kapasitas</h5>
                            {listKapasitas.map((item, index) => (
                                <Button
                                    key={index}
                                    style={
                                        kapasitas === item.name
                                            ? { backgroundColor: '#FF0303', color: 'white', margin: 2, fontWeight: '700' }
                                            : { backgroundColor: '#A7A7A7', color: 'white', margin: 2, fontWeight: '700' }
                                    }
                                    onClick={() => {
                                        setKapasitas(item.name);
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))}
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel sx={{ padding: 0 }} id="distribusi_core-label">
                                        Core
                                    </InputLabel>
                                    <Select
                                        margin="dense"
                                        name="distribusi_core"
                                        autoComplete="off"
                                        id="distribusi_core"
                                        value={formik.values.distribusi_core}
                                        onChange={formik.handleChange}
                                        error={formik.touched.distribusi_core && Boolean(formik.errors.distribusi_core)}
                                        labelId="distribusi_core-label"
                                    >
                                        {[...Array(48)].map((a, i) => (
                                            <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {kapasitas !== '8' && (
                                <Grid item xs={12}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel sx={{ padding: 0 }} id="distribusi_core_opsi-label">
                                            Core 2
                                        </InputLabel>
                                        <Select
                                            margin="dense"
                                            name="distribusi_core_opsi"
                                            autoComplete="off"
                                            id="distribusi_core_opsi"
                                            value={formik.values.distribusi_core_opsi}
                                            onChange={formik.handleChange}
                                            error={formik.touched.distribusi_core_opsi && Boolean(formik.errors.distribusi_core_opsi)}
                                            labelId="distribusi_core_opsi-label"
                                        >
                                            {[...Array(48)].map((a, i) => (
                                                <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="distribusi_note"
                                    id="distribusi_note"
                                    autoComplete="off"
                                    label="Note"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    placeholder="Masukkan Catatan"
                                    multiline
                                    value={formik.values.distribusi_note}
                                    onChange={formik.handleChange}
                                />
                            </Grid>

                            <Button
                                style={{ marginTop: 10 }}
                                fullWidth
                                variant="contained"
                                color="success"
                                disabled={kuKd === null || kapasitas === null}
                                type="submit"
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
DistribusiComponent.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    item: PropTypes.any,
    onAdd: PropTypes.any,
    onUpdate: PropTypes.any
};
