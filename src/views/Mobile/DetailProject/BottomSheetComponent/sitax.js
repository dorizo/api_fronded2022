/* eslint-disable react/prop-types */

import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { BottomSheet } from 'react-spring-bottom-sheet';
import * as Yup from 'yup';

const listSitaxType = [
    { label: 'Non Sitax', value: 'non-sitax' },
    { label: 'Sitax', value: 'sitax' }
];

const listSitax = [{ name: 'rt' }, { name: 'rw' }, { name: 'kelurahan' }, { name: 'pu' }, { name: 'lain-lain' }];

const NumberFormatCustom = React.forwardRef((props, ref) => {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            thousandSeparator
            isNumericString
            prefix="Rp. "
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default function SitaxComponent(props) {
    const { open, onClose, item, onAdd, onUpdate, id } = props;
    const [sitaxType, setSitaxType] = useState(null);
    const [sitaxList, setSitaxList] = useState([]);

    const handleAddList = (val) => {
        setSitaxList([...sitaxList, val]);
    };

    const handlerRemoveList = (index) => {
        const values = [...sitaxList];
        values.splice(index, 1);
        setSitaxList(values);
    };

    const handlerSitaxList = (data) => {
        sitaxList.find((v, i) => {
            if (v === data) {
                handlerRemoveList(i);
                return true;
            }
            return false;
        });
    };

    function handlerButtonSitax(item) {
        // console.log(item);
        return sitaxList.find((v) => {
            if (v === item) {
                return true;
            }
            return false;
        });
    }

    const editMode = Boolean(item && item.sitax_id);

    const handleSubmit = (values, { setErrors }) => {
        if (editMode) {
            const item =
                sitaxType?.value === 'sitax'
                    ? {
                          sitax_type: sitaxType.value,
                          sitax_total: values.sitax_total,
                          sitax_list: JSON.stringify(sitaxList)
                      }
                    : {
                          sitax_type: sitaxType.value
                      };
            onUpdate(item, id, setErrors);
        } else {
            const item =
                sitaxType?.value === 'sitax'
                    ? {
                          sitax_type: sitaxType.value,
                          sitax_total: values.sitax_total,
                          sitax_list: JSON.stringify(sitaxList)
                      }
                    : {
                          sitax_type: sitaxType.value
                      };
            onAdd(item, id, setErrors);
        }
    };

    const formik = useFormik({
        initialValues: {
            sitax_total: item ? item.sitax_total : ''
        },
        validationSchema: Yup.object({
            sitax_total: Yup.string()
        }),
        onSubmit: handleSubmit
    });

    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div> {editMode ? 'Edit' : 'Tambah'} Sitax</div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <form onSubmit={formik.handleSubmit}>
                            <Autocomplete
                                disablePortal
                                margin="dense"
                                name="sitax"
                                id="sitax"
                                value={sitaxType}
                                onChange={(e, v) => setSitaxType(v)}
                                options={listSitaxType}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        variant="standard"
                                        autoComplete="off"
                                        label="Pilih Sitax"
                                        margin="dense"
                                    />
                                )}
                            />
                            <h6>List</h6>
                            {sitaxType?.value === 'sitax' && (
                                <>
                                    {listSitax.map((item, index) => (
                                        <Button
                                            key={index}
                                            style={
                                                handlerButtonSitax(item.name)
                                                    ? { backgroundColor: '#FF0303', color: 'white', margin: 2, fontWeight: '700' }
                                                    : { backgroundColor: '#A7A7A7', color: 'white', margin: 2, fontWeight: '700' }
                                            }
                                            onClick={() => {
                                                if (handlerButtonSitax(item.name)) {
                                                    handlerSitaxList(item.name);
                                                } else {
                                                    handleAddList(item.name);
                                                }
                                            }}
                                        >
                                            {item.name}
                                        </Button>
                                    ))}
                                    <h4 className="mt-2">Total</h4>
                                    <TextField
                                        name="sitax_total"
                                        autoComplete="off"
                                        id="sitax_total"
                                        InputProps={{
                                            inputComponent: NumberFormatCustom
                                        }}
                                        variant="standard"
                                        placeholder="Rp. 1,000,000"
                                        onChange={formik.handleChange}
                                        value={formik.values.sitax_total}
                                        error={formik.touched.sitax_total && Boolean(formik.errors.sitax_total)}
                                        helperText={formik.touched.sitax_total && formik.errors.sitax_total}
                                    />
                                </>
                            )}
                            <Button
                                sx={{ marginTop: 10 }}
                                fullWidth
                                type="submit"
                                disabled={sitaxType === null}
                                variant="contained"
                                color="success"
                            >
                                {editMode ? 'Edit' : 'Tambah'}
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </BottomSheet>
        </div>
    );
}
SitaxComponent.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    item: PropTypes.any,
    onAdd: PropTypes.any,
    onUpdate: PropTypes.any
};
