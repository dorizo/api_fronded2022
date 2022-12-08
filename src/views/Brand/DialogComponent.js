import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

export default function DialogComponent(props) {
    const { open, onClose, item, onAdd, onUpdate, processing } = props;
    const editMode = Boolean(item && item.brand_id);
    const scriptedRef = useScriptRef();

    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            if (item && item.brand_id) {
                onUpdate({ brand: values.brand_name }, item.brand_id, setErrors);
            } else {
                onAdd({ brand: values.brand_name }, setErrors);
                // console.log(a);
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
            brand_name: item ? item.brand_name : ''
        },
        validationSchema: Yup.object({
            brand_name: Yup.string().required('Harus Disisi')
        }),
        onSubmit: handleSubmit
    });
    return (
        <div>
            <Dialog fullWidth maxWidth="sm" open={open}>
                <DialogTitle> {editMode ? 'Edit' : 'Tambah'} Brand</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="brand_name"
                            id="brand_name"
                            label="Brand"
                            type="text"
                            disabled={processing}
                            value={formik.values.brand_name}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.brand_name && Boolean(formik.errors.brand_name)}
                            variant="standard"
                            helperText={formik.touched.brand_name && formik.errors.brand_name}
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
