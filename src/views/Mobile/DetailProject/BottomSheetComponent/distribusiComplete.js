/* eslint-disable react/prop-types */

import { Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { BottomSheet } from 'react-spring-bottom-sheet';
import * as Yup from 'yup';

export default function DistribusiComplete(props) {
    const { open, onClose, item, onAdd, id, note } = props;
    const handleSubmit = (values, { setErrors }) => {
        const itemm = {
            hasil_ukur_odp_valid_3: values.hasil_ukur_odp_valid_3,
            distribusi_id: item.distribusi_id
        };
        onAdd(itemm, values.note, id, setErrors);
    };

    const formik = useFormik({
        initialValues: {
            hasil_ukur_odp_valid_3: '',
            note: note || ''
        },
        validationSchema: Yup.object({
            hasil_ukur_odp_valid_3: Yup.number().required('harus di isi')
        }),
        onSubmit: handleSubmit
    });

    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div>Distribusi Complete </div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                margin="dense"
                                name="hasil_ukur_odp_valid_3"
                                autoComplete="off"
                                id="hasil_ukur_odp_valid_3"
                                label="hasil ukur odp valid 3"
                                type="number"
                                fullWidth
                                variant="standard"
                                placeholder="Masukkan Angka"
                                value={formik.values.hasil_ukur_odp_valid_3}
                                onChange={formik.handleChange}
                                error={formik.touched.hasil_ukur_odp_valid_3 && Boolean(formik.errors.hasil_ukur_odp_valid_3)}
                            />
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
                            <Button sx={{ marginTop: 10 }} fullWidth type="submit" variant="contained" color="success">
                                Simpan
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </BottomSheet>
        </div>
    );
}
DistribusiComplete.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    item: PropTypes.any,
    onAdd: PropTypes.any,
    note: PropTypes.any
};
