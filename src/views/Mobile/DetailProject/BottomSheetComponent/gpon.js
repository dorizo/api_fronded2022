import { Button, Card, CardContent, Grid, Paper, Table, TableCell, TableContainer, TableRow } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { GET_DESIGNATORS } from 'services/designator';
import * as Yup from 'yup';

export default function GponComponent(props) {
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

    const designator = data && data.data.data;

    const handleSubmit = (values) => {
        if (editMode) {
            const item = {
                designator_id: desi.designator_id,
                khs_list_qty: qty,
                tipe: 'GPON',
                gpon: values.gpon,
                slot: values.slot,
                output_feeder: values.output_feeder,
                port: values.port,
                output_pasif: values.output_pasif
            };
            onUpdate(item);
        } else {
            const item = {
                designator_id: desi.designator_id,
                khs_list_qty: qty,
                tipe: 'GPON',
                gpon: values.gpon,
                slot: values.slot,
                port: values.port,
                output_feeder: values.output_feeder,
                output_pasif: values.output_pasif
            };
            onAdd(item);
        }
    };
    const formik = useFormik({
        initialValues: {
            gpon: item ? item.gpon : '',
            port: item ? item.port : '',
            slot: item ? item.slot : '',
            output_feeder: item ? item.output_feeder : '',
            output_pasif: item ? item.output_pasif : ''
        },
        validationSchema: Yup.object({
            gpon: Yup.number().required('Harus Disisi'),
            port: Yup.number().required('Harus Disisi'),
            slot: Yup.number().required('Harus Disisi'),
            output_feeder: Yup.number().required('Harus Disisi'),
            output_pasif: Yup.number().required('Harus Disisi')
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
                header={<div>GPON</div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <form onSubmit={formik.handleSubmit}>
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
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="gpon"
                                    id="gpon"
                                    label="GPON"
                                    autoComplete="off"
                                    fullWidth
                                    variant="standard"
                                    type="number"
                                    placeholder="Masukkan Angka"
                                    value={formik.values.gpon}
                                    onChange={formik.handleChange}
                                    error={formik.touched.gpon && Boolean(formik.errors.gpon)}
                                    helperText={formik.touched.gpon && formik.errors.gpon}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="slot"
                                    id="slot"
                                    autoComplete="off"
                                    label="Slot"
                                    type="number"
                                    placeholder="Masukkan Angka"
                                    fullWidth
                                    variant="standard"
                                    value={formik.values.slot}
                                    onChange={formik.handleChange}
                                    error={formik.touched.slot && Boolean(formik.errors.slot)}
                                    helperText={formik.touched.slot && formik.errors.slot}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="port"
                                    id="port"
                                    autoComplete="off"
                                    label="Port"
                                    type="number"
                                    placeholder="Masukkan Angka"
                                    fullWidth
                                    variant="standard"
                                    value={formik.values.port}
                                    onChange={formik.handleChange}
                                    error={formik.touched.port && Boolean(formik.errors.port)}
                                    helperText={formik.touched.port && formik.errors.port}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="output_feeder"
                                    id="output_feeder"
                                    label="Output Feeder"
                                    autoComplete="off"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    placeholder="Masukkan Angka"
                                    value={formik.values.output_feeder}
                                    onChange={formik.handleChange}
                                    error={formik.touched.output_feeder && Boolean(formik.errors.output_feeder)}
                                    helperText={formik.touched.output_feeder && formik.errors.output_feeder}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="output_pasif"
                                    id="output_pasif"
                                    label="Output Pasif 1:4"
                                    autoComplete="off"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    placeholder="Masukkan Angka"
                                    value={formik.values.output_pasif}
                                    onChange={formik.handleChange}
                                    error={formik.touched.output_pasif && Boolean(formik.errors.output_pasif)}
                                    helperText={formik.touched.output_pasif && formik.errors.output_pasif}
                                />
                            </Grid>
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
