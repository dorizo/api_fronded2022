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
    const editMode = Boolean(item && item.job_id);
    const scriptedRef = useScriptRef();

    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            if (item && item.job_id) {
                onUpdate({ jobName: values.job_name, jobPercent: values.job_percent, jobDay: values.job_day }, item.job_id, setErrors);
            } else {
                onAdd({ jobName: values.job_name, jobPercent: values.job_percent, jobDay: values.job_day }, setErrors);
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
            job_name: item ? item.job_name : '',
            job_percent: item ? item.job_percent : '',
            job_day: item ? item.job_day : ''
        },
        validationSchema: Yup.object({
            job_percent: Yup.number('harus nomor').required('Harus Disisi'),
            job_day: Yup.number('harus nomor').required('Harus Disisi'),
            job_name: Yup.string().required('Harus Disisi')
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
                            name="job_name"
                            id="job_name"
                            label="Job Name"
                            type="text"
                            disabled={processing}
                            value={formik.values.job_name}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.job_name && Boolean(formik.errors.job_name)}
                            variant="standard"
                            helperText={formik.touched.job_name && formik.errors.job_name}
                        />
                        <TextField
                            margin="dense"
                            name="job_percent"
                            id="job_percent"
                            label="Job Percent"
                            type="text"
                            disabled={processing}
                            value={formik.values.job_percent}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.job_percent && Boolean(formik.errors.job_percent)}
                            variant="standard"
                            helperText={formik.touched.job_percent && formik.errors.job_percent}
                        />
                        <TextField
                            margin="dense"
                            name="job_day"
                            id="job_day"
                            label="Job Day"
                            type="text"
                            disabled={processing}
                            value={formik.values.job_day}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.job_day && Boolean(formik.errors.job_day)}
                            variant="standard"
                            helperText={formik.touched.job_day && formik.errors.job_day}
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
