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
import { GET_PRODUCTS } from 'services/product';
import * as Yup from 'yup';

export default function DialogComponent(props) {
    const { open, onClose, item, onAdd, onUpdate, processing } = props;
    const editMode = Boolean(item && item.designator_id);
    const scriptedRef = useScriptRef();

    const { data } = useQuery('GET_PRODUCTS', GET_PRODUCTS);

    const product = data && data.data;

    const options =
        product &&
        product.data.map((a) => {
            const data = { label: a.product_name, id: a.product_id };
            return data;
        });
    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            if (item && item.designator_id) {
                onUpdate(
                    { designatorCode: values.designator_code, designatorDesc: values.designator_desc, productId: values.product_id.id },
                    item.designator_id,
                    setErrors
                );
            } else {
                onAdd(
                    { designatorCode: values.designator_code, designatorDesc: values.designator_desc, productId: values.product_id.id },
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
            designator_code: item ? item.designator_code : '',
            designator_desc: item ? item.designator_desc : '',
            product_id: item ? item.product_id : null
        },
        validationSchema: Yup.object({
            designator_code: Yup.string().required('Harus Disisi'),
            designator_desc: Yup.string().required('Harus Disisi'),
            product_id: Yup.mixed().required('Harus Disisi')
        }),
        onSubmit: handleSubmit
    });
    return (
        <div>
            <Dialog fullWidth maxWidth="sm" open={open}>
                <DialogTitle> {editMode ? 'Edit' : 'Tambah'} Designator</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="designator_code"
                            id="designator_code"
                            label="Code"
                            type="text"
                            disabled={processing}
                            value={formik.values.designator_code}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.designator_code && Boolean(formik.errors.designator_code)}
                            variant="standard"
                            helperText={formik.touched.designator_code && formik.errors.designator_code}
                        />
                        <TextField
                            margin="dense"
                            name="designator_desc"
                            id="designator_desc"
                            label="Desc"
                            type="text"
                            disabled={processing}
                            value={formik.values.designator_desc}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.designator_desc && Boolean(formik.errors.designator_desc)}
                            variant="standard"
                            helperText={formik.touched.designator_desc && formik.errors.designator_desc}
                        />
                        <Autocomplete
                            disablePortal
                            margin="dense"
                            name="product_id"
                            disabled={processing}
                            value={formik.values.product_id}
                            onChange={(e, v) => formik.setValues({ ...formik.values, product_id: v })}
                            id="product_id"
                            options={options}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.touched.product_id && Boolean(formik.errors.product_id)}
                                    helperText={formik.touched.product_id && formik.errors.product_id}
                                    fullWidth
                                    variant="standard"
                                    label="Product"
                                />
                            )}
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
