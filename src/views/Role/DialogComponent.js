import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
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
    const editMode = Boolean(item && item.roleCode);
    const scriptedRef = useScriptRef();

    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            if (item && item.roleCode) {
                onUpdate({ ...values }, item.roleCode, setErrors);
            } else {
                onAdd(values, setErrors);
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
            role: item ? item.role : '',
            type: item ? item.type : ''
        },
        validationSchema: Yup.object({
            role: Yup.string(),
            type: Yup.string().required('Harus Disisi')
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
                            name="role"
                            id="role"
                            label="Role"
                            type="text"
                            disabled={processing}
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            variant="standard"
                            helperText={formik.touched.role && formik.errors.role}
                        />
                        <FormControl
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            variant="standard"
                            margin="dense"
                            fullWidth
                            disabled={processing}
                        >
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.type}
                                label="type"
                                name="type"
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Public">Public</MenuItem>
                                <MenuItem value="Master">Master</MenuItem>
                            </Select>
                            <FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
                        </FormControl>
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
