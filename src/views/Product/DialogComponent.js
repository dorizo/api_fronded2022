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
import { useState } from 'react';
import { useQuery } from 'react-query';
import { GET_BRANDS } from 'services/brand';
import * as Yup from 'yup';

export default function DialogComponent(props) {
    const { open, onClose, item, onAdd, onUpdate, processing } = props;
    const editMode = Boolean(item && item.product_id);
    const [brandV, setBrandV] = useState(null);
    const scriptedRef = useScriptRef();

    const { data, isLoading } = useQuery('GET_BRANDS', GET_BRANDS);

    const brand = data && data.data;

    const options =
        brand &&
        brand.data.map((a) => {
            const data = { label: a.brand_name, id: a.brand_id };
            return data;
        });

    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            if (item && item.product_id) {
                onUpdate({ product: values.product_name, portion: values.product_portion, brand: brandV.id }, item.product_id, setErrors);
            } else {
                onAdd({ product: values.product_name, portion: values.product_portion, brand: brandV.id }, setErrors);
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
            product_name: item ? item.product_name : '',
            product_portion: item ? item.product_portion : ''
        },
        validationSchema: Yup.object({
            product_name: Yup.string().required('Harus Disisi'),
            product_portion: Yup.string().required('Harus Disisi')
        }),
        onSubmit: handleSubmit
    });
    if (isLoading) {
        return <p>Loading..</p>;
    }
    return (
        <div>
            <Dialog fullWidth maxWidth="sm" open={open}>
                <DialogTitle> {editMode ? 'Edit' : 'Tambah'} Product</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="product_name"
                            id="product_name"
                            label="Nama"
                            type="text"
                            disabled={processing}
                            value={formik.values.product_name}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.product_name && Boolean(formik.errors.product_name)}
                            variant="standard"
                            helperText={formik.touched.product_name && formik.errors.product_name}
                        />
                        <TextField
                            margin="dense"
                            name="product_portion"
                            id="product_portion"
                            label="Portion"
                            type="text"
                            disabled={processing}
                            value={formik.values.product_portion}
                            onChange={formik.handleChange}
                            fullWidth
                            error={formik.touched.product_portion && Boolean(formik.errors.product_portion)}
                            variant="standard"
                            helperText={formik.touched.product_portion && formik.errors.product_portion}
                        />
                        <Autocomplete
                            disablePortal
                            margin="dense"
                            name="brand_id"
                            disabled={processing}
                            value={brandV}
                            onChange={(e, v) => setBrandV(v)}
                            id="brand_id"
                            options={options}
                            renderInput={(params) => <TextField {...params} fullWidth variant="standard" label="Brand" />}
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
