/* eslint-disable react/prop-types */

import { Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { BottomSheet } from 'react-spring-bottom-sheet';
import * as Yup from 'yup';

export default function DistribusiFinal(props) {
    const { open, onClose, item, onAdd, id, note } = props;

    const handleSubmit = (values, { setErrors }) => {
        const itemm = {
            hasil_ukur_odp_valid_4: values.hasil_ukur_odp_valid_4,
            odp_valid_4: values.odp_valid_4,
            distribusi_id: item.distribusi_id
        };
        onAdd(itemm, values.note, id, setErrors);
    };

    const formik = useFormik({
        initialValues: {
            hasil_ukur_odp_valid_4: '',
            odp_valid_4: '',
            note: note || ''
        },
        validationSchema: Yup.object({
            hasil_ukur_odp_valid_4: Yup.number().required('harus di isi'),
            odp_valid_4: Yup.string().required('harus di isi')
        }),
        onSubmit: handleSubmit
    });

    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div> Distribusi Complete Final</div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                margin="dense"
                                name="hasil_ukur_odp_valid_4"
                                autoComplete="off"
                                id="hasil_ukur_odp_valid_4"
                                label="hasil ukur odp valid 4"
                                type="number"
                                fullWidth
                                variant="standard"
                                placeholder="Masukkan Angka"
                                value={formik.values.hasil_ukur_odp_valid_4}
                                onChange={formik.handleChange}
                                error={formik.touched.hasil_ukur_odp_valid_4 && Boolean(formik.errors.hasil_ukur_odp_valid_4)}
                            />
                            <TextField
                                margin="dense"
                                name="odp_valid_4"
                                autoComplete="off"
                                id="odp_valid_4"
                                label="odp valid 4"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={formik.values.odp_valid_4}
                                onChange={formik.handleChange}
                                error={formik.touched.odp_valid_4 && Boolean(formik.errors.odp_valid_4)}
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
DistribusiFinal.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    item: PropTypes.any,
    onAdd: PropTypes.any,
    note: PropTypes.any
};
