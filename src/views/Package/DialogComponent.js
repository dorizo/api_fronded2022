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
    const editMode = Boolean(item && item.package_id);
    const scriptedRef = useScriptRef();

    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            if (item && item.package_id) {
                onUpdate({ packageName: values.package_name, packageDesc: values.package_desc }, item.package_id, setErrors);
            } else {
                onAdd({ packageName: values.package_name, packageDesc: values.package_desc }, setErrors);
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
            package_name: item ? item.package_name : '',
            package_desc: item ? item.package_desc : ''
        },
        validationSchema: Yup.object({
            package_name: Yup.string().required('Harus Disisi'),
            package_desc: Yup.string().required('Harus Disisi')
        }),
        onSubmit: handleSubmit
    });
    return (
        <div>
            <Dialog fullWidth maxWidth="sm" open={open}>
                <DialogTitle> {editMode ? 'Edit' : 'Tambah'} Role</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="package_name"
                            id="package_name"
                            label="Package name"
                            type="text"
                            disabled={processing}
                            value={formik.values.package_name}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.package_name && Boolean(formik.errors.package_name)}
                            variant="standard"
                            helperText={formik.touched.package_name && formik.errors.package_name}
                        />
                        <TextField
                            margin="dense"
                            name="package_desc"
                            id="package_desc"
                            label="Package desc"
                            type="text"
                            disabled={processing}
                            value={formik.values.package_desc}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.package_desc && Boolean(formik.errors.package_desc)}
                            variant="standard"
                            helperText={formik.touched.package_desc && formik.errors.package_desc}
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
