import { Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import PropTypes from 'prop-types';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as Yup from 'yup';

const dataWitel = [
    {
        label: 'Lampung',
        value: 'Lampung'
    },
    {
        label: 'Bandung',
        value: 'Bandung'
    },
    {
        label: 'Jakarta',
        value: 'Jakarta'
    },
    {
        label: 'Bogor',
        value: 'Bogor'
    }
];

const dataUser = [
    {
        label: 'Budi',
        value: 'Budi'
    },
    {
        label: 'Agung',
        value: 'Agung'
    },
    {
        label: 'Sopo',
        value: 'Sopo'
    },
    {
        label: 'Windi',
        value: 'Windi'
    },
    {
        label: 'Windah',
        value: 'Windah'
    }
];

export default function DialogComponent(props) {
    const { open, onClose, item, onAdd, onUpdate, processing } = props;
    const [witel, setWitel] = useState('');
    const [user, setUser] = useState([
        {
            name: ''
        }
    ]);

    const handleChangeInput = (index, e, obj) => {
        const values = [...user];
        // values[index][e.target.getAttribute('name')] = obj.value;
        values[index] = { name: obj.value };
        setUser(values);
    };

    const handleAddFields = () => {
        if (user.length <= dataUser.length) setUser([...user, { name: '' }]);
    };

    const handerRemoveFIelds = (index) => {
        const values = [...user];
        values.splice(index, 1);
        setUser(values);
    };

    const editMode = Boolean(item && item.projectCode);

    const scriptedRef = useScriptRef();

    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            if (item && item.userCode) {
                onUpdate({ ...values }, item.userCode, setErrors);
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
            name: item ? item.name : '',
            email: item ? item.email : '',
            password: item ? item.password : '',
            projectCategory: item ? item.projectCategory : ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Harus Diisi'),
            email: Yup.string().email('Must be a valid email').required('Harus Diisi'),
            password: Yup.string().required('Harus Diisi'),
            projectCategory: Yup.string().required('Harus Diisi')
        }),
        onSubmit: handleSubmit
    });

    return (
        <div>
            <Dialog fullWidth maxWidth="lg" scroll="body" open={open}>
                <DialogTitle> {editMode ? 'Edit' : 'Tambah'} project</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    margin="dense"
                                    name="project_category"
                                    id="project_category"
                                    disabled={processing}
                                    value={witel}
                                    onChange={(e, v) => setWitel(v)}
                                    options={dataWitel}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth variant="standard" label="Witel" margin="dense" />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table" style={{ marginTop: 20 }}>
                                <TableHead>
                                    <TableRow>
                                        <Grid container justifyContent="space-between" alignItems="center">
                                            <TableCell>
                                                <Typography variant="h4" gutterBottom component="div">
                                                    User
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" onClick={() => handleAddFields()}>
                                                    {' '}
                                                    <AddIcon />
                                                </Button>
                                            </TableCell>
                                        </Grid>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.map((row, index) => (
                                        <TableRow key={row.name}>
                                            <TableCell>
                                                <Grid container alignItems="end" justifyContent="space-between">
                                                    <Grid xs={11}>
                                                        <Autocomplete
                                                            key={index}
                                                            disablePortal
                                                            margin="dense"
                                                            name="name"
                                                            disabled={processing}
                                                            value={row.name}
                                                            disableClearable={1}
                                                            onChange={(e, obj) => handleChangeInput(index, e, obj)}
                                                            options={dataUser}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    fullWidth
                                                                    variant="standard"
                                                                    label="User"
                                                                    margin="dense"
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                    <Grid xs={1}>
                                                        <Button onClick={() => handerRemoveFIelds(index)}>
                                                            <RemoveIcon sx={{ color: 'red' }} />
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
