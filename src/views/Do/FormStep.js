import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DatePicker } from '@mui/lab';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDO } from 'hooks/useDo';
import MainCard from 'ui-component/cards/MainCard';
import convertToRupiah from 'utils/curency';

/* eslint-disable react/prop-types */

export default function FormStep({ title = 'DO' }) {
    const {
        openFS,
        witel,
        handleNext,
        errorForm,
        doo,
        handleChangeCharge,
        handleChangeDate,
        handleChangeNoDo,
        handleChangeWitel,
        handleChangeQty,
        handleRemoveItem,
        loading,
        handleBatal,
        isDetail,
        setOpenItem,
        handleChangeStatus
    } = useDO();
    /* eslint-disable no-nested-ternary */

    return (
        <Dialog fullWidth maxWidth="lg" open={openFS}>
            <DialogTitle>
                {isDetail ? 'Detail' : doo.id ? 'Edit' : 'Buat'} {title}
            </DialogTitle>
            <DialogContent>
                <MainCard>
                    <div style={{ display: 'flex', marginBottom: 30 }}>
                        <TextField
                            onChange={(e) => handleChangeNoDo(e.target.value)}
                            sx={{ marginRight: 5 }}
                            value={doo.doCode}
                            id="f-doo"
                            label="No Do"
                            disabled={isDetail}
                            error={errorForm?.doCode && Boolean(errorForm.doCode)}
                            helperText={errorForm?.doCode && errorForm.doCode}
                            placeholder="Do 000"
                            type="text"
                        />
                        <DatePicker
                            label="Tanggal"
                            value={doo.date}
                            disabled={isDetail}
                            onChange={(newValue) => {
                                handleChangeDate(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    error={errorForm?.date && Boolean(errorForm.date)}
                                    helperText={errorForm?.date && errorForm.date}
                                    {...params}
                                />
                            )}
                        />
                        <FormControl
                            error={errorForm?.witel && Boolean(errorForm.witel)}
                            fullWidth
                            sx={{ marginLeft: 5 }}
                            disabled={loading || isDetail}
                        >
                            <InputLabel id="demo-simple-select-label">Witel</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={doo.witelId}
                                label="type"
                                name="type"
                                onChange={(e) => handleChangeWitel(e.target.value)}
                            >
                                {witel && witel.map((a) => <MenuItem value={a.id}>{a.label}</MenuItem>)}
                            </Select>
                            <FormHelperText>{errorForm?.witel && errorForm.witel}</FormHelperText>
                        </FormControl>
                    </div>
                    <Typography>Items</Typography>
                    <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#EAF1F7' }}>
                                <TableRow>
                                    <TableCell>Nama Produk</TableCell>
                                    <TableCell width="100">Qty</TableCell>
                                    <TableCell width="200">Harga</TableCell>
                                    <TableCell width="250">Total</TableCell>
                                    {isDetail === false && (
                                        <TableCell width="10">
                                            <Button disabled={loading} onClick={() => setOpenItem(true)} size="small">
                                                <AddIcon />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {doo.items &&
                                    doo.items.map((item, index) => {
                                        const { productName, brandName, qty, harga, total } = item;
                                        return (
                                            <TableRow key="adhag" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row">
                                                    {productName} | {brandName}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        disabled={isDetail}
                                                        id="f-qyt"
                                                        size="small"
                                                        value={qty}
                                                        onChange={(e) => handleChangeQty(e.target.value, index)}
                                                        type="number"
                                                    />
                                                </TableCell>
                                                <TableCell>{convertToRupiah(harga)}</TableCell>
                                                <TableCell>{convertToRupiah(total)}</TableCell>
                                                {isDetail === false && (
                                                    <TableCell>
                                                        <Button
                                                            disabled={loading}
                                                            onClick={() => handleRemoveItem(index)}
                                                            size="small"
                                                            color="error"
                                                        >
                                                            <RemoveIcon />
                                                        </Button>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        );
                                    })}
                                {doo.items.length === 0 && (
                                    <TableRow>
                                        <TableCell align="center" colSpan={5}>
                                            -- No Item --
                                        </TableCell>
                                    </TableRow>
                                )}
                                <TableRow>
                                    <TableCell rowSpan={3} colSpan={2} />
                                    <TableCell>Sub Total</TableCell>
                                    <TableCell>{convertToRupiah(doo.subTotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Charge</TableCell>
                                    <TableCell>
                                        <TextField
                                            onChange={(e) => handleChangeCharge(e.target.value.replace(/[^0-9]/g, ''))}
                                            fullWidth
                                            value={doo.charge}
                                            id="f-charge"
                                            size="small"
                                            disabled={isDetail}
                                            placeholder=""
                                            type="number"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    <TableCell>{convertToRupiah(doo.total)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainCard>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button disabled={loading} color="inherit" onClick={handleBatal} sx={{ mr: 1 }}>
                        batal
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isDetail === false && (
                        <Button onClick={handleNext} disabled={loading}>
                            simpan
                        </Button>
                    )}
                    {isDetail === true && doo.status === 'issued' && (
                        <Button onClick={handleChangeStatus} disabled={loading}>
                            To Process
                        </Button>
                    )}
                    {isDetail === true && doo.status === 'processed' && (
                        <Button onClick={handleChangeStatus} disabled={loading}>
                            To Done
                        </Button>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
