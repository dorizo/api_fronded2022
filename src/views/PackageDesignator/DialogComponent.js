import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { GET_DESIGNATORS } from 'services/designator';
import * as Yup from 'yup';

export default function DialogComponent(props) {
    const { open, onClose, item, onAdd, onUpdate, processing } = props;
    const editMode = Boolean(item && item.product_id);
    const scriptedRef = useScriptRef();

    const { data, isLoading } = useQuery('GET_DESIGNATORS', GET_DESIGNATORS);

    const designator = data && data.data;

    const options =
        designator &&
        designator.data.map((a) => {
            const data = { label: a.designator_code, id: a.designator_id };
            return data;
        });

    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            if (item && item.product_id) {
                onUpdate(
                    { materialprice: values.material_price, serviceprice: values.service_price, designatorid: values.designator_id.id },
                    item.product_id,
                    setErrors
                );
            } else {
                onAdd(
                    { materialprice: values.material_price, serviceprice: values.service_price, designatorid: values.designator_id.id },
                    setErrors
                );
            }
        } catch (err) {
            if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
            }
        }
    };
    const formik = useFormik({
        initialValues: {
            material_price: item ? item.material_price : '',
            service_price: item ? item.service_price : '',
            designator_id: item ? item.designator_id : null
        },
        validationSchema: Yup.object({
            material_price: Yup.number().required('Harus Disisi'),
            service_price: Yup.number().required('Harus Disisi'),
            designator_id: Yup.mixed().required('Harus Disisi')
        }),
        onSubmit: handleSubmit
    });
    if (isLoading) {
        return <p>Loading..</p>;
    }
    return (
        <div>
            <Dialog fullWidth maxWidth="sm" open={open}>
                <DialogTitle> {editMode ? 'Edit' : 'Tambah'}</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <Autocomplete
                            disablePortal
                            margin="dense"
                            name="brand_id"
                            disabled={processing}
                            value={formik.values.designator_id}
                            onChange={(e, v) => formik.setValues({ ...formik.values, designator_id: v })}
                            id="brand_id"
                            options={options}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.touched.designator_id && Boolean(formik.errors.designator_id)}
                                    helperText={formik.touched.designator_id && formik.errors.designator_id}
                                    fullWidth
                                    variant="standard"
                                    label="Designator"
                                />
                            )}
                        />
                        <TextField
                            margin="dense"
                            name="material_price"
                            id="material_price"
                            label="Material"
                            type="text"
                            disabled={processing}
                            value={formik.values.material_price}
                            onChange={formik.handleChange}
                            fullWidth
                            variant="standard"
                            error={formik.touched.material_price && Boolean(formik.errors.material_price)}
                            helperText={formik.touched.material_price && formik.errors.material_price}
                        />
                        <TextField
                            margin="dense"
                            name="service_price"
                            id="service_price"
                            label="Service"
                            type="text"
                            disabled={processing}
                            value={formik.values.service_price}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.service_price && Boolean(formik.errors.service_price)}
                            variant="standard"
                            helperText={formik.touched.service_price && formik.errors.service_price}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={processing} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit" disabled={processing}>
                            {editMode ? 'Edit' : 'Tambah'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
DialogComponent.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    item: PropTypes.any,
    onAdd: PropTypes.any,
    onUpdate: PropTypes.any,
    processing: PropTypes.any
};
