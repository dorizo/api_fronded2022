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
    const editMode = Boolean(item && item.supplier_id);
    const scriptedRef = useScriptRef();

    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            if (item && item.supplier_id) {
                onUpdate(
                    { supplierName: values.supplier_name, supplierPhone: values.supplier_phone, supplierAddress: values.supplier_address },
                    item.supplier_id,
                    setErrors
                );
            } else {
                onAdd(
                    { supplierName: values.supplier_name, supplierPhone: values.supplier_phone, supplierAddress: values.supplier_address },
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
            supplier_name: item ? item.supplier_name : '',
            supplier_phone: item ? item.supplier_phone : '',
            supplier_address: item ? item.supplier_address : ''
        },
        validationSchema: Yup.object({
            supplier_name: Yup.string().required('Harus Disisi'),
            supplier_phone: Yup.string().required('Harus Disisi'),
            supplier_address: Yup.string().required('Harus Disisi')
        }),
        onSubmit: handleSubmit
    });
    return (
        <div>
            <Dialog fullWidth maxWidth="sm" open={open}>
                <DialogTitle> {editMode ? 'Edit' : 'Tambah'} Supplier</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="supplier_name"
                            id="supplier_name"
                            label="Name"
                            type="text"
                            disabled={processing}
                            value={formik.values.supplier_name}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.supplier_name && Boolean(formik.errors.supplier_name)}
                            variant="standard"
                            helperText={formik.touched.supplier_name && formik.errors.supplier_name}
                        />
                        <TextField
                            margin="dense"
                            name="supplier_phone"
                            id="supplier_phone"
                            label="Phone"
                            type="text"
                            disabled={processing}
                            value={formik.values.supplier_phone}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.supplier_phone && Boolean(formik.errors.supplier_phone)}
                            variant="standard"
                            helperText={formik.touched.supplier_phone && formik.errors.supplier_phone}
                        />
                        <TextField
                            margin="dense"
                            name="supplier_address"
                            id="supplier_address"
                            label="Address"
                            type="text"
                            disabled={processing}
                            value={formik.values.supplier_address}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.supplier_address && Boolean(formik.errors.supplier_address)}
                            variant="standard"
                            helperText={formik.touched.supplier_address && formik.errors.supplier_address}
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
