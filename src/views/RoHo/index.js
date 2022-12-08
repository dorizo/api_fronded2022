import { Chip, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import DialogConfirm from 'components/DialogConfirm';
import DOProvider, { useDO } from 'hooks/useDo';
import POProvider, { usePO } from 'hooks/usePo';
import { PropTypes } from 'prop-types';
import * as React from 'react';
import { useQuery } from 'react-query';
import { GET_ALL_ITEM } from 'services/do';
import { GET_ALL_ITEM as GET_ALL_ITEM_PO } from 'services/po';
import { GET_ROS } from 'services/ro';
import MainCard from 'ui-component/cards/MainCard';
import statusColor from 'utils/statusColor';
import useTable from '../../hooks/useTable/index';
import FormStepDo from '../Do/FormStep';
import FormStepPo from '../Po/FormStep';
import Action from './Action';

const headCells = [
    {
        id: 'pocode',
        numeric: false,
        disablePadding: true,
        label: 'Code'
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: true,
        label: 'Tanggal'
    },
    // {
    //     id: 'supplier',
    //     numeric: false,
    //     disablePadding: true,
    //     label: 'Supplier'
    // },
    {
        id: 'stsatus',
        numeric: false,
        disablePadding: true,
        label: 'Status'
    }
];

function Content() {
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [ro, setRo] = React.useState('PO');
    const [loading, setLoading] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [itemSelected, setItemSelected] = React.useState(null);

    const { data, isLoading } = useQuery('GET_ROS', GET_ROS);

    const { setIsDetail: setIsDetailPo, setOpenFS: setOpenFSPo, SnackBarComponent: SnackBarComponentPo, po, setPo } = usePO();
    const { setIsDetail, setOpenFS, SnackBarComponent, doo, setDo } = useDO();

    const rows = data && data.data.data;
    const DO = rows?.do;
    const PO = rows?.po;

    // HANDLE ACTION
    const handleActionOpen = (event, item, type) => {
        setRo(type);
        setItemSelected(item);
        setAnchorEl(event.currentTarget);
    };
    const handleActionClose = () => {
        setItemSelected(null);
        setAnchorEl(null);
    };
    // HANDLE MODAL
    const handleEdit = async () => {};
    // HANDLE ALERT
    const handleAlertOpen = (text) => {
        setAlertText(text);
        setAlertOpen(true);
    };
    const handleDetailPo = async () => {
        setLoading(true);
        const item = await GET_ALL_ITEM_PO(itemSelected.po_id);
        const items =
            item &&
            item.data.data.map((i) => {
                const it = { productId: i.product_id, id: i.item_id, qty: i.item_qty, total: i.item_total, harga: i.item_price };
                return it;
            });
        setPo({
            ...po,
            id: itemSelected.po_id,
            date: itemSelected.po_date,
            noPo: itemSelected.po_code,
            status: itemSelected.po_status,
            subTotal: parseFloat(itemSelected.po_subtotal),
            total: parseFloat(itemSelected.po_grandtotal),
            charge: parseFloat(itemSelected.po_charge),
            supplierId: itemSelected.supplier_id,
            items
        });
        setLoading(false);

        setOpenFSPo(true);
        setIsDetailPo(true);
    };
    const handleDetailDo = async () => {
        setLoading(true);

        const item = await GET_ALL_ITEM(itemSelected.do_id);
        const items =
            item &&
            item.data.data.map((i) => {
                const it = {
                    id: i.item_id,
                    productName: i.product.product_name,
                    productId: i.product.product_id,
                    brandName: i.product.brand_name,
                    productPortion: i.product.product_portion,
                    qty: i.item_qty,
                    stockId: i.product.stock_id,
                    maxQty: i.product.stock_qty,
                    harga: i.product.stock_price,
                    total: i.item_total
                };
                return it;
            });
        setDo({
            ...doo,
            id: itemSelected.do_id,
            date: itemSelected.do_date,
            doCode: itemSelected.do_code,
            status: itemSelected.do_status,
            subTotal: parseFloat(itemSelected.do_subtotal),
            total: parseFloat(itemSelected.do_grandtotal),
            charge: parseFloat(itemSelected.do_charge),
            witelId: itemSelected.witel_id,
            items
        });
        setLoading(false);
        setOpenFS(true);
        setIsDetail(true);
    };
    const handleDetail = () => {
        if (ro === 'PO') {
            handleDetailPo();
        } else {
            handleDetailDo();
        }
    };
    const handleAlertClose = () => {
        setAlertText('');
        setAlertOpen(false);
    };

    const onDelete = async () => {};
    const handleConfirm = async () => {
        handleActionClose();
        await onDelete();
    };

    const actionOpen = Boolean(anchorEl);
    const processing = loading || isLoading;
    return (
        <MainCard>
            <Typography style={{ marginBottom: 10 }} variant="h4">
                Receive Order
            </Typography>
            <RoPo rows={PO} isLoading={isLoading} handleActionOpen={handleActionOpen} />
            <RoDo rows={DO} isLoading={isLoading} handleActionOpen={handleActionOpen} />
            {actionOpen && (
                <Action
                    itemSelected={itemSelected}
                    handleDetail={handleDetail}
                    actionOpen={actionOpen}
                    handleEdit={handleEdit}
                    handelDelete={() => handleAlertOpen('Apakah yakin mau delete')}
                    anchorEl={anchorEl}
                    actionClose={handleActionClose}
                />
            )}
            {alertOpen && (
                <DialogConfirm
                    processing={processing}
                    alertClose={handleAlertClose}
                    alertOpen={alertOpen}
                    handleConfirm={handleConfirm}
                    text={alertText}
                />
            )}
            <SnackBarComponentPo />
            <SnackBarComponent />
            <FormStepPo title="RO PO" />
            <FormStepDo title="RO DO" />
        </MainCard>
    );
}

const RoPo = ({ rows, handleActionOpen, isLoading }) => {
    const { TableComponent, list } = useTable({
        header: headCells,
        rows,
        loading: isLoading
    });
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">Receive order PO</Typography>
            </div>
            {list &&
                TableComponent(
                    list.map((row, index) => (
                        <TableRow onClick={(event) => handleActionOpen(event, row, 'PO')} hover tabIndex={-1} key={index}>
                            <TableCell padding="checkbox">{index + 1}</TableCell>
                            <TableCell>{row.po_code}</TableCell>
                            <TableCell>{row.po_date}</TableCell>
                            <TableCell>
                                <Chip label={row.po_status} style={{ color: '#fff' }} color={statusColor(row.po_status)} size="small" />
                            </TableCell>
                        </TableRow>
                    ))
                )}
        </>
    );
};
const RoDo = ({ rows, handleActionOpen, isLoading }) => {
    const { TableComponent, list } = useTable({
        header: headCells,
        rows,
        loading: isLoading
    });
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">Receive Order DO</Typography>
            </div>
            {list &&
                TableComponent(
                    list.map((row, index) => (
                        <TableRow onClick={(event) => handleActionOpen(event, row, 'DO')} hover tabIndex={-1} key={index}>
                            <TableCell padding="checkbox">{index + 1}</TableCell>
                            <TableCell>{row.do_code}</TableCell>
                            <TableCell>{row.do_date}</TableCell>
                            <TableCell>
                                <Chip style={{ color: '#fff' }} label={row.do_status} color={statusColor(row.do_status)} size="small" />
                            </TableCell>
                        </TableRow>
                    ))
                )}
        </>
    );
};
RoDo.propTypes = {
    handleActionOpen: PropTypes.any,
    isLoading: PropTypes.any,
    rows: PropTypes.any
};
RoPo.propTypes = {
    handleActionOpen: PropTypes.any,
    isLoading: PropTypes.any,
    rows: PropTypes.any
};
export default function Index() {
    return (
        <POProvider>
            <DOProvider>
                <Content />
            </DOProvider>
        </POProvider>
    );
}
