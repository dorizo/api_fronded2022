import {
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableCell,
    TableContainer,
    TableRow
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { GET_DESIGNATORS } from 'services/designator';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const listDataTeknisi = [
    { label: 'Feeder', value: 'Feeder' },
    { label: 'Penggelaran', value: 'Penggelaran' },
    { label: 'ODP', value: 'ODP' },
    { label: 'ODC', value: 'ODC' }
];

export default function DataTeknisiComponent(props) {
    /* eslint-disable react/prop-types */
    const { open, onClose, onAdd, onUpdate, item } = props;
    const editMode = Boolean(item && item.khs_list_id);
    const intialDesi = editMode && {
        brand_id: '',
        createAt: '',
        deleteAt: null,
        designator_code: item.designator_code,
        designator_desc: item.designator_desc,
        designator_id: item.designator_id,
        product_id: null,
        product_name: item.product_name,
        product_portion: item.product_portion,
        updateAt: null
    };
    const { data, isLoading } = useQuery('GET_DESIGNATORS', GET_DESIGNATORS);
    const [desi, setDesi] = useState(editMode && intialDesi ? intialDesi : null);
    const [qty, setQty] = useState(editMode ? item.khs_list_qty : null);
    const [dataTeknisi, setDataTeknisi] = useState(null);

    const designator = data && data.data.data;

    const handleSubmit = (values) => {
        if (editMode) {
            onUpdate({
                designator_id: desi.designator_id,
                khs_list_qty: qty,
                tipe: dataTeknisi?.value
            });
        } else {
            const params = {
                designator_id: desi.designator_id,
                khs_list_qty: qty,
                tipe: dataTeknisi?.value
            };
            if (dataTeknisi?.value === 'ODC') {
                params.ODC = {
                    address: values.distribusi_address,
                    lg: values.distribusi_lg,
                    lt: values.distribusi_lt,
                    benchmark_address: values.distribusi_benchmark_address
                };
            }
            if (dataTeknisi?.value === 'ODP') {
                params.ODP = {
                    address: values.distribusi_address,
                    lg: values.distribusi_lg,
                    lt: values.distribusi_lt,
                    benchmark_address: values.distribusi_benchmark_address,
                    core: values.core,
                    core_opsi: values.core_opsi,
                    distribusi_core_opsi: values.distribusi_core_opsi,
                    distribusi_core: values.distribusi_core
                };
            }
            onAdd(params);
        }
    };
    const formik = useFormik({
        initialValues: {
            distribusi_benchmark_address: item ? item.distribusi_benchmark_address : '',
            distribusi_address: item ? item.distribusi_address : '',
            distribusi_lg: item ? item.distribusi_lg : '',
            distribusi_lt: item ? item.distribusi_lt : '',
            core: item ? item.core : '',
            core_opsi: item ? item.core_opsi : '',
            distribusi_core_opsi: item ? item.distribusi_core_opsi : '',
            distribusi_core: item ? item.distribusi_core : ''
        },
        validationSchema: Yup.object({
            distribusi_benchmark_address:
                dataTeknisi?.value === 'ODC' || dataTeknisi?.value === 'ODP' ? Yup.string().required('Harus Disisi') : Yup.string(),
            distribusi_address:
                dataTeknisi?.value === 'ODC' || dataTeknisi?.value === 'ODP' ? Yup.string().required('Harus Disisi') : Yup.string(),
            distribusi_lg:
                dataTeknisi?.value === 'ODC' || dataTeknisi?.value === 'ODP' ? Yup.number().required('Harus Disisi') : Yup.number(),
            distribusi_lt:
                dataTeknisi?.value === 'ODC' || dataTeknisi?.value === 'ODP' ? Yup.number().required('Harus Disisi') : Yup.number(),
            core: dataTeknisi?.value === 'ODP' ? Yup.number().required('Harus Disisi') : Yup.string(),
            core_opsi: dataTeknisi?.value === 'ODP' ? Yup.number().required('Harus Disisi') : Yup.string(),
            distribusi_core_opsi: dataTeknisi?.value === 'ODP' ? Yup.number().required('Harus Disisi') : Yup.number(),
            distribusi_core: dataTeknisi?.value === 'ODP' ? Yup.number().required('Harus Disisi') : Yup.number()
        }),
        onSubmit: handleSubmit
    });
    if (isLoading) {
        return <p>loadiing</p>;
    }
    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div>Opsi</div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <form onSubmit={formik.handleSubmit}>
                            <Autocomplete
                                name="opsi"
                                id="opsi"
                                value={dataTeknisi}
                                onChange={(e, v) => setDataTeknisi(v)}
                                options={listDataTeknisi}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        variant="standard"
                                        autoComplete="off"
                                        label="Pilih Salah Satu"
                                        margin="dense"
                                    />
                                )}
                            />

                            <Autocomplete
                                id="designator"
                                fullWidth
                                options={designator}
                                value={desi}
                                onChange={(e, val) => setDesi(val)}
                                getOptionLabel={(option) => `${option.designator_code} |  ${option.designator_desc}`}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Designator"
                                        placeholder="Search designator"
                                        margin="normal"
                                        variant="standard"
                                    />
                                )}
                                renderOption={(props, option, { inputValue }) => {
                                    const matches = match(option.designator_code, inputValue);
                                    const parts = parse(`${option.designator_code} |  ${option.designator_desc}`, matches);

                                    return (
                                        <li {...props}>
                                            <div className="border-bottom">
                                                {parts.map((part, index) => (
                                                    <span
                                                        key={index}
                                                        style={{
                                                            textOverflow: 'ellipsis',
                                                            overflow: 'hidden',
                                                            whiteSpace: 'nowrap',
                                                            fontWeight: part.highlight ? 700 : 400
                                                        }}
                                                    >
                                                        {part.text}
                                                    </span>
                                                ))}
                                            </div>
                                        </li>
                                    );
                                }}
                            />
                            {desi && (
                                <Card>
                                    <CardContent>
                                        <TableContainer component={Paper}>
                                            <Table size="small" aria-label="a dense table">
                                                {[
                                                    'designator_code',
                                                    'designator_desc',
                                                    'designator_id',
                                                    'product_id',
                                                    'product_name',
                                                    'product_portion'
                                                ].map((atr) => (
                                                    <TableRow>
                                                        <TableCell>{atr.replace('_', ' ')}</TableCell>
                                                        <TableCell align="right">{desi[atr]}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </Table>
                                        </TableContainer>
                                    </CardContent>
                                </Card>
                            )}
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="feeder_odc"
                                    id="feeder_odc"
                                    label="Kuantitas"
                                    autoComplete="off"
                                    type="number"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    fullWidth
                                    variant="standard"
                                    placeholder="Masukkan Angka"
                                />
                            </Grid>
                            {(dataTeknisi?.value === 'ODC' || dataTeknisi?.value === 'ODP') && (
                                <>
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
                                            formik.touched.distribusi_benchmark_address &&
                                            Boolean(formik.errors.distribusi_benchmark_address)
                                        }
                                        helperText={
                                            formik.touched.distribusi_benchmark_address && formik.errors.distribusi_benchmark_address
                                        }
                                    />
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
                                </>
                            )}
                            {dataTeknisi?.value === 'ODP' && (
                                <>
                                    <Grid item xs={12}>
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel sx={{ padding: 0 }} id="core-label">
                                                Core Feeder
                                            </InputLabel>
                                            <Select
                                                margin="dense"
                                                name="core"
                                                autoComplete="off"
                                                id="core"
                                                value={formik.values.core}
                                                onChange={formik.handleChange}
                                                error={formik.touched.core && Boolean(formik.errors.core)}
                                                labelId="core-label"
                                            >
                                                {[...Array(288)].map((a, i) => (
                                                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel sx={{ padding: 0 }} id="core-label">
                                                Bestrey ODC
                                            </InputLabel>
                                            <Select
                                                margin="dense"
                                                name="core_opsi"
                                                autoComplete="off"
                                                id="core_opsi"
                                                value={formik.values.core_opsi}
                                                onChange={formik.handleChange}
                                                error={formik.touched.core_opsi && Boolean(formik.errors.core_opsi)}
                                                labelId="core_opsi-label"
                                            >
                                                {[...Array(288)].map((a, i) => (
                                                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel sx={{ padding: 0 }} id="core-label">
                                                Core Distribusi ODC
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
                                                {[...Array(288)].map((a, i) => (
                                                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel sx={{ padding: 0 }} id="core-label">
                                                Bestrey Distribusi ODC
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
                                                {[...Array(288)].map((a, i) => (
                                                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </>
                            )}

                            <Button fullWidth type="submit" disabled={desi === null || qty === null} variant="contained" color="success">
                                {editMode ? 'Edit' : 'Tambah'}
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </BottomSheet>
        </div>
    );
}
