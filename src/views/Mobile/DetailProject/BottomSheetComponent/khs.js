/* eslint-disable react/prop-types */

import {
    Autocomplete,
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    FormControl
} from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import * as Yup from 'yup';
import convertToRupiah from 'utils/curency';

const listKHS = [
    { label: 'WITEL', value: 'WITEL' },
    { label: 'TA', value: 'TA' }
];

export default function KhsComponent(props) {
    const { open, onClose, item, onAdd, onUpdate, id, khsList } = props;
    const [khs, setKhsType] = useState({ label: 'TA', value: 'TA' });

    const editMode = Boolean(item && item.khs_id);
    const handleSubmit = (values, { setErrors }) => {
        if (editMode) {
            const item = {
                khs_source: khs.value,
                stock_id: values.stock_id
            };

            onUpdate(item, id, setErrors);
        } else {
            const item = {
                khs_source: khs.value,
                stock_id: values.stock_id
            };
            onAdd(item, id, setErrors);
        }
    };

    const formik = useFormik({
        initialValues: {
            khs_source: item ? item.khs_source : '',
            stock_id: khsList ? khsList.stock_id : ''
        },
        validationSchema: Yup.object({
            khs_source: Yup.string(),
            stock_id: Yup.number().required('Harus disi')
        }),
        onSubmit: handleSubmit
    });
    console.log(khsList, 'asasa');
    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div> {editMode ? 'Edit' : 'Tambah'} Khs</div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <form onSubmit={formik.handleSubmit}>
                            <Autocomplete
                                disablePortal
                                margin="dense"
                                name="khs_source"
                                id="khs_source"
                                value={khs}
                                onChange={(e, v) => setKhsType(v)}
                                options={listKHS}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        variant="standard"
                                        autoComplete="off"
                                        label="Pilih Source"
                                        margin="dense"
                                    />
                                )}
                            />
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    {khs.value === 'WITEL' && (
                                        <TableRow>
                                            <TableCell>khs material total</TableCell>
                                            <TableCell align="right">{convertToRupiah(khsList.khs_material_price || 0)}</TableCell>
                                        </TableRow>
                                    )}
                                    <TableRow>
                                        <TableCell>khs service total</TableCell>
                                        <TableCell align="right">{convertToRupiah(khsList.khs_list_service_price || 0)}</TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                            <FormControl sx={{ marginTop: 4 }} fullWidth>
                                <InputLabel htmlFor="grouped-select">Pilih Stock</InputLabel>
                                <Select
                                    variant="standard"
                                    value={formik.values.stock_id}
                                    name="stock_id"
                                    id="stock_id"
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem aria-label="None" value="">
                                        Pilih
                                    </MenuItem>
                                    {khsList.stock.map((stock) => (
                                        <MenuItem value={stock.stock_id}>
                                            Stock: {stock.stock_qty} | Price:{stock.stock_price}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                sx={{ marginTop: 10 }}
                                fullWidth
                                type="submit"
                                disabled={khs === null || formik.values.stock_id === ''}
                                variant="contained"
                                color="success"
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
KhsComponent.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    item: PropTypes.any,
    onAdd: PropTypes.any,
    khsList: PropTypes.any,
    onUpdate: PropTypes.any
};
