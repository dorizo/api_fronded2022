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
import { usePO } from 'hooks/usePo';
import MainCard from 'ui-component/cards/MainCard';

export default function FormStep() {
    const {
        openFS,
        supplier,
        handleNext,
        errorForm,
        po,
        product,
        handleChangeCharge,
        handleChangeDate,
        handleChangeNoPo,
        handleChangeSupplier,
        handleChangeHarga,
        handleChangeQty,
        handleRemoveItem,
        loading,
        handleChangeItem,
        handleAddItem,
        handleBatal,
        isDetail,
        handleChangeStatus
    } = usePO();

    return (
        <Dialog fullWidth maxWidth="lg" open={openFS}>
            <DialogTitle>{po.id ? 'Edit' : 'Buat'} PO</DialogTitle>
            <DialogContent>
                <MainCard>
                    <div style={{ display: 'flex', marginBottom: 30 }}>
                        <TextField
                            onChange={(e) => handleChangeNoPo(e.target.value)}
                            sx={{ marginRight: 5 }}
                            value={po.noPo}
                            id="f-po"
                            label="No PO"
                            disabled={isDetail}
                            error={errorForm?.noPo && Boolean(errorForm.noPo)}
                            helperText={errorForm?.noPo && errorForm.noPo}
                            placeholder="PO 000"
                            type="text"
                        />
                        <DatePicker
                            label="Tanggal"
                            value={po.date}
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
                            error={errorForm?.supplier && Boolean(errorForm.supplier)}
                            fullWidth
                            sx={{ marginLeft: 5 }}
                            disabled={loading || isDetail}
                        >
                            <InputLabel id="demo-simple-select-label">Supplier</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={po.supplierId}
                                label="type"
                                name="type"
                                onChange={(e) => handleChangeSupplier(e.target.value)}
                            >
                                {supplier && supplier.map((a) => <MenuItem value={a.id}>{a.label}</MenuItem>)}
                            </Select>
                            <FormHelperText>{errorForm?.supplier && errorForm.supplier}</FormHelperText>
                        </FormControl>
                        {/* <Autocomplete
                            disablePortal
                            id=""
                            sx={{ marginLeft: 5 }}
                            value={po.supplierName}
                            onChange={(e, newValue) => handleChangeSupplier(newValue)}
                            options={supplier}
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    size="small"
                                    error={errorForm?.supplier && Boolean(errorForm.supplier)}
                                    helperText={errorForm?.supplier && errorForm.supplier}
                                    {...params}
                                    label="Supplier"
                                />
                            )}
                        /> */}
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
                                            <Button disabled={loading} onClick={() => handleAddItem()} size="small">
                                                <AddIcon />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {po.items &&
                                    po.items.map((item, index) => {
                                        const { id, productName, productId, qty, harga, total } = item;
                                        return (
                                            <TableRow key="adhag" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row">
                                                    <FormControl fullWidth disabled={loading}>
                                                        <InputLabel id={`intput-label-product-${index}`}>Product</InputLabel>
                                                        <Select
                                                            disabled={isDetail}
                                                            labelId={`label-product-${index}`}
                                                            id={`product-${index}`}
                                                            value={productId}
                                                            label="type"
                                                            onChange={(e) => handleChangeItem(e.target.value, index)}
                                                            name="type"
                                                            size="small"
                                                        >
                                                            {product && product.map((a) => <MenuItem value={a.id}>{a.label}</MenuItem>)}
                                                        </Select>
                                                        <FormHelperText>{errorForm?.supplier && errorForm.supplier}</FormHelperText>
                                                    </FormControl>
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
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        id="f-harga"
                                                        onChange={(e) => handleChangeHarga(e.target.value.replace(/[^0-9]/g, ''), index)}
                                                        size="small"
                                                        value={harga}
                                                        placeholder=""
                                                        disabled={isDetail}
                                                        type="text"
                                                    />
                                                </TableCell>
                                                <TableCell>{total}</TableCell>
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
                                {po.items.length === 0 && (
                                    <TableRow>
                                        <TableCell align="center" colSpan={5}>
                                            -- No Item --
                                        </TableCell>
                                    </TableRow>
                                )}
                                <TableRow>
                                    <TableCell rowSpan={3} colSpan={2} />
                                    <TableCell>Sub Total</TableCell>
                                    <TableCell>{po.subTotal}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Charge</TableCell>
                                    <TableCell>
                                        <TextField
                                            onChange={(e) => handleChangeCharge(e.target.value.replace(/[^0-9]/g, ''))}
                                            fullWidth
                                            value={po.charge}
                                            id="f-charge"
                                            size="small"
                                            disabled={isDetail}
                                            placeholder=""
                                            type="text"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    <TableCell>{po.total}</TableCell>
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
                    {isDetail === true && po.status === 'issued' && (
                        <Button onClick={handleChangeStatus} disabled={loading}>
                            To Process
                        </Button>
                    )}
                    {isDetail === true && po.status === 'processed' && (
                        <Button onClick={handleChangeStatus} disabled={loading}>
                            To Done
                        </Button>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
