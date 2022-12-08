/* eslint-disable no-unused-vars */

import { Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { BottomSheet } from 'react-spring-bottom-sheet';
import * as Yup from 'yup';

export default function FeederComplete(props) {
    const { open, onClose, item, onAdd, id, note } = props;

    const handleSubmit = (values, { setErrors }) => {
        onAdd(
            {
                feeder_id: item.feeder_id,
                olt_gpon: values.olt_gpon,
                olt_slot: values.olt_slot,
                otl_port: values.otl_port,
                output_feeder: values.output_feeder,
                output_pasif: values.output_pasif
            },
            values.note,
            id,
            setErrors
        );
    };

    const formik = useFormik({
        initialValues: {
            olt_gpon: '',
            olt_slot: '',
            otl_port: '',
            output_feeder: '',
            note: note || '',
            output_pasif: ''
        },
        validationSchema: Yup.object({
            olt_gpon: Yup.number().required('Harus Disisi'),
            olt_slot: Yup.number().required('Harus Disisi'),
            otl_port: Yup.number().required('Harus Disisi'),
            output_feeder: Yup.number().required('Harus Disisi'),
            output_pasif: Yup.number().required('Harus Disisi')
        }),
        onSubmit: handleSubmit
    });
    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div>Feeder Complete</div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="olt_gpon"
                                    autoComplete="off"
                                    id="olt_gpon"
                                    label="olt gpon"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    helperText={formik.touched.olt_gpon && formik.errors.olt_gpon}
                                    placeholder="Masukkan Angka"
                                    value={formik.values.olt_gpon}
                                    onChange={formik.handleChange}
                                    error={formik.touched.olt_gpon && Boolean(formik.errors.olt_gpon)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="olt_slot"
                                    autoComplete="off"
                                    id="olt_slot"
                                    label="olt slot"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    helperText={formik.touched.olt_slot && formik.errors.olt_slot}
                                    placeholder="Masukkan Angka"
                                    value={formik.values.olt_slot}
                                    onChange={formik.handleChange}
                                    error={formik.touched.olt_slot && Boolean(formik.errors.olt_slot)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="otl_port"
                                    autoComplete="off"
                                    id="otl_port"
                                    label="olt port"
                                    type="text"
                                    fullWidth
                                    helperText={formik.touched.otl_port && formik.errors.otl_port}
                                    variant="standard"
                                    placeholder="Masukkan Angka"
                                    value={formik.values.otl_port}
                                    onChange={formik.handleChange}
                                    error={formik.touched.otl_port && Boolean(formik.errors.otl_port)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="output_feeder"
                                    autoComplete="off"
                                    id="output_feeder"
                                    label="output feeder"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    placeholder="Masukkan Angka"
                                    value={formik.values.output_feeder}
                                    helperText={formik.touched.output_feeder && formik.errors.output_feeder}
                                    onChange={formik.handleChange}
                                    error={formik.touched.output_feeder && Boolean(formik.errors.output_feeder)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="output_pasif"
                                    autoComplete="off"
                                    id="output_pasif"
                                    label="output pasif"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    helperText={formik.touched.output_pasif && formik.errors.output_pasif}
                                    placeholder="Masukkan Angka"
                                    value={formik.values.output_pasif}
                                    onChange={formik.handleChange}
                                    error={formik.touched.output_pasif && Boolean(formik.errors.output_pasif)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    name="note"
                                    autoComplete="off"
                                    id="note"
                                    label="Note"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    placeholder="Masukkan Angka"
                                    value={formik.values.note}
                                    onChange={formik.handleChange}
                                    error={formik.touched.note && Boolean(formik.errors.note)}
                                    multiline
                                    minRows={4}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                style={{ backgroundColor: 'green', width: '100%', marginTop: 10, marginBottom: 10, color: 'white' }}
                            >
                                Simpan
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </BottomSheet>
        </div>
    );
}
FeederComplete.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    item: PropTypes.any,
    onAdd: PropTypes.any,
    id: PropTypes.any,
    note: PropTypes.any
};
