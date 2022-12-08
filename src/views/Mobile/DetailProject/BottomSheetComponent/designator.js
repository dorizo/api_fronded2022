import { Button, Card, CardContent, Grid, Paper, Table, TableCell, TableContainer, TableRow } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { GET_DESIGNATORS } from 'services/designator';

export default function DesignatorComponent(props) {
    /* eslint-disable react/prop-types */
    const { open, onClose, onAdd, onUpdate, item } = props;
    const editMode = Boolean(item && item.khs_list_id);
    const intialDesi = editMode && {
        brand_id: '',
        createAt: '',
        deleteAt: null,
        designator_code: item.designator_code,
        designator_desc: item.designator_desc,
        designator_id: item.designator_id,
        product_id: null,
        product_name: item.product_name,
        product_portion: item.product_portion,
        updateAt: null
    };
    const { data, isLoading } = useQuery('GET_DESIGNATORS', GET_DESIGNATORS);
    const [desi, setDesi] = useState(editMode && intialDesi ? intialDesi : null);
    const [qty, setQty] = useState(editMode ? item.khs_list_qty : null);

    const designator = data && data.data.data;

    const handleSubmit = () => {
        if (editMode) {
            onUpdate({
                designator_id: desi.designator_id,
                khs_list_qty: qty
            });
        } else {
            onAdd({
                designator_id: desi.designator_id,
                khs_list_qty: qty
            });
        }
    };
    if (isLoading) {
        return <p>loadiing</p>;
    }
    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div> {editMode ? 'Edit' : 'Tambah'} Designator</div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <h5>Designator</h5>
                        <Autocomplete
                            id="designator"
                            fullWidth
                            options={designator}
                            value={desi}
                            onChange={(e, val) => setDesi(val)}
                            getOptionLabel={(option) => `${option.designator_code} |  ${option.designator_desc}`}
                            renderInput={(params) => <TextField {...params} placeholder="Search designator" margin="normal" />}
                            renderOption={(props, option, { inputValue }) => {
                                const matches = match(option.designator_code, inputValue);
                                const parts = parse(`${option.designator_code} |  ${option.designator_desc}`, matches);

                                return (
                                    <li {...props}>
                                        <div className="border-bottom">
                                            {parts.map((part, index) => (
                                                <span
                                                    key={index}
                                                    style={{
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        fontWeight: part.highlight ? 700 : 400
                                                    }}
                                                >
                                                    {part.text}
                                                </span>
                                            ))}
                                        </div>
                                    </li>
                                );
                            }}
                        />
                        {desi && (
                            <Card>
                                <CardContent>
                                    <TableContainer component={Paper}>
                                        <Table size="small" aria-label="a dense table">
                                            {[
                                                'designator_code',
                                                'designator_desc',
                                                'designator_id',
                                                'product_id',
                                                'product_name',
                                                'product_portion'
                                            ].map((atr) => (
                                                <TableRow>
                                                    <TableCell>{atr.replace('_', ' ')}</TableCell>
                                                    <TableCell align="right">{desi[atr]}</TableCell>
                                                </TableRow>
                                            ))}
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="feeder_odc"
                                id="feeder_odc"
                                label="Kuantitas"
                                autoComplete="off"
                                type="number"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                fullWidth
                                variant="standard"
                                placeholder="Masukkan Angka"
                            />
                        </Grid>

                        <Button
                            fullWidth
                            onClick={handleSubmit}
                            type="submit"
                            disabled={desi === null || qty === null}
                            variant="contained"
                            color="success"
                        >
                            {editMode ? 'Edit' : 'Tambah'}
                        </Button>
                    </Grid>
                </Grid>
            </BottomSheet>
        </div>
    );
}
