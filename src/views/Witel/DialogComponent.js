import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { GET_REGIONS } from 'services/region';
import * as Yup from 'yup';

export default function DialogComponent(props) {
    const { open, onClose, item, onAdd, onUpdate, processing } = props;
    const editMode = Boolean(item && item.witel_id);
    const [regionV, setBrandV] = useState(null);

    const { data } = useQuery('GET_REGIONS', GET_REGIONS);

    const region = data && data.data;

    const options =
        region &&
        region.data.map((a) => {
            const data = { label: a.region_name, id: a.region_id };
            return data;
        });

    const handleSubmit = (values, { setErrors }) => {
        if (item && item.witel_id) {
            onUpdate({ witel: values.witel_name, code: values.witel_code, region: regionV.id }, item.witel_id, setErrors);
        } else {
            onAdd({ witel: values.witel_name, code: values.witel_code, region: regionV.id }, setErrors);
        }
    };
    const formik = useFormik({
        initialValues: {
            witel_name: item ? item.witel_name : '',
            witel_code: item ? item.witel_code : ''
        },
        validationSchema: Yup.object({
            witel_name: Yup.string().required('Harus Disisi'),
            witel_code: Yup.string().required('Harus Disisi')
        }),
        onSubmit: handleSubmit
    });
    return (
        <div>
            <Dialog fullWidth maxWidth="sm" open={open}>
                <DialogTitle> {editMode ? 'Edit' : 'Tambah'} Product</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="witel_code"
                            id="witel_code"
                            label="Code"
                            type="text"
                            disabled={processing}
                            value={formik.values.witel_code}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.witel_code && Boolean(formik.errors.witel_code)}
                            variant="standard"
                            helperText={formik.touched.witel_code && formik.errors.witel_code}
                        />
                        <TextField
                            margin="dense"
                            name="witel_name"
                            id="witel_name"
                            label="Nama"
                            type="text"
                            disabled={processing}
                            value={formik.values.witel_name}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.witel_name && Boolean(formik.errors.witel_name)}
                            variant="standard"
                            helperText={formik.touched.witel_name && formik.errors.witel_name}
                        />
                        <Autocomplete
                            disablePortal
                            margin="dense"
                            name="region_id"
                            disabled={processing}
                            value={regionV}
                            onChange={(e, v) => setBrandV(v)}
                            id="region_id"
                            options={options}
                            renderInput={(params) => <TextField {...params} fullWidth variant="standard" label="Region" />}
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
