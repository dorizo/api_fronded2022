import useSnackbar from 'components/SnackBar';
import { PropTypes } from 'prop-types';
import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import {
    ADD_ITEM_PO,
    ADD_PO,
    CHARGE,
    DELETE_ITEM_PO,
    ISSUED_TO_PROCESSED,
    PROCESSED_TO_DONE,
    UPDATE_ITEM_PO,
    UPDATE_PO
} from 'services/po';
import { GET_PRODUCTS } from 'services/product';
import { GET_SUPPLIERS } from 'services/supplier';

const POContext = createContext();

const POProvider = ({ children }) => {
    const [openFS, setOpenFS] = React.useState(false);
    const [isDetail, setIsDetail] = React.useState(false);
    const [openItem, setOpenItem] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errorForm, setErorForm] = React.useState({ noPo: null, date: null, supplier: null });
    const { data, isLoading } = useQuery('GET_SUPPLIERS', GET_SUPPLIERS);
    const { data: dataProduct } = useQuery('GET_PRODUCTS', GET_PRODUCTS);

    const { snackBarOpen, SnackBarComponent } = useSnackbar();

    const dataProducts = dataProduct && dataProduct.data;

    const product =
        dataProducts &&
        dataProducts.data.map((s) => {
            const d = { label: s.product_name, id: s.product_id };
            return d;
        });

    const dataSupplier = data && data.data;
    const supplier =
        dataSupplier &&
        dataSupplier.data.map((s) => {
            const d = { label: s.supplier_name, id: s.supplier_id };
            return d;
        });
    const [po, setPo] = React.useState({
        id: null,
        noPo: '',
        date: null,
        supplierId: '',
        supplierName: '',
        charge: 0,
        status: null,
        subTotal: 0,
        total: 0,
        items: []
    });

    const handleChangeDate = (tgl) => {
        setPo({ ...po, date: tgl.format('YYYY-MM-DD') });
    };
    const handleChangeNoPo = (no) => {
        setPo({ ...po, noPo: no });
    };
    const handleChangeSupplier = (supplier) => {
        if (supplier) {
            // const { id, label } = supplier;
            // setPo({ ...po, supplierName: label, supplierId: id });
            setPo({ ...po, supplierName: '', supplierId: supplier });
        } else {
            setPo({ ...po, supplierName: null, supplierId: null });
        }
    };
    const handleChangeCharge = (c) => {
        const charge = Number.isNaN(parseFloat(c)) ? 0 : parseFloat(c);
        const total = charge + parseFloat(po.subTotal);
        setPo({ ...po, total, charge });
    };

    const handleRemoveItem = (index) => {
        const itemss = po.items.map(async (item, i) => {
            if (i === index) {
                if (item.id) {
                    const x = await DELETE_ITEM_PO(item.id);
                    // console.log(x, 'xxxx');
                }
            }
        });

        const items = po.items.filter((item, i) => i !== index);

        const subTotal = parseFloat(items.map((i) => parseFloat(i.total)).reduce((a, b) => a + b, 0));
        const total = subTotal + parseFloat(po.charge);
        setPo({ ...po, subTotal, total, items });
    };

    const handleChangeQty = (qty, index) => {
        const items = po.items.map((item, i) => {
            if (i === index) {
                const qtyMin = qty < 0 ? 0 : qty;
                const total = parseFloat(item.harga) * qtyMin;
                return { ...item, total, qty: qtyMin };
            }
            return item;
        });
        const subTotal = parseFloat(items.map((i) => parseFloat(i.total)).reduce((a, b) => a + b, 0));
        const total = subTotal + parseFloat(po.charge);

        setPo({ ...po, subTotal, total, items });
    };
    const handleChangeHarga = (hrg, index) => {
        const items = po.items.map((item, i) => {
            if (i === index) {
                const harga = Number.isNaN(parseFloat(hrg)) ? 0 : parseFloat(hrg);
                const total = item.qty * parseFloat(harga);
                return { ...item, total, harga };
            }
            return item;
        });

        const subTotal = parseFloat(items.map((i) => parseFloat(i.total)).reduce((a, b) => a + b, 0));
        const total = subTotal + parseFloat(po.charge);

        setPo({ ...po, subTotal, total, items });
    };

    const handleAddItem = () => {
        const product = {
            id: null,
            productName: '-',
            productId: 0,
            qty: 0,
            harga: 0,
            total: 0
        };
        setPo({ ...po, items: [...po.items, product] });
        setOpenItem(false);
    };

    const handleChangeItem = (value, index) => {
        const items = po.items.map((item, i) => {
            if (i === index) {
                return { ...item, productId: value };
            }
            return item;
        });
        setPo({ ...po, items });
    };

    const handleNext = async () => {
        setLoading(true);
        setErorForm({ date: null, supplier: null, noPo: null });
        if (po.noPo === '') {
            // console.log(po.noPo, 'kkkkkkkkkkkkk');
            setErorForm({ noPo: 'required' });
            setLoading(false);
            return;
        }

        if (po.date === null) {
            setErorForm({ date: 'required' });
            setLoading(false);
            return;
        }
        if (po.supplierId === '') {
            setErorForm({ supplier: 'required' });
            setLoading(false);
            return;
        }
        if (po.id) {
            const response = await UPDATE_PO({ poCode: po.noPo, poDate: po.date, supplierId: po.supplierId }, po.id);
            if (response.status === 400) {
                snackBarOpen(response.data.error.message, 'error');
                // console.log(response.data.error.form);
            }
            if (response.status === 200) {
                const idPo = response.data.data.po_id;
                const resCharge = await CHARGE(po.charge, idPo);
                po.items.map(async (item, i) => {
                    if (item.id) {
                        const resUpdateItem = await UPDATE_ITEM_PO(item.productId, item.harga, item.qty, idPo, item.id);
                        // console.log('resUpdateItem', i, resUpdateItem.data);
                    } else {
                        const resAddItem = await ADD_ITEM_PO(item.productId, item.harga, item.qty, idPo);
                        // console.log('aditem', i, resAddItem.data);
                    }
                });
                setOpenFS(false);
                setIsDetail(false);
                snackBarOpen(response.data.success.message, 'success');
                setPo({
                    id: null,
                    noPo: '',
                    date: null,
                    supplierId: '',
                    supplierName: '',
                    charge: 0,
                    subTotal: 0,
                    total: 0,
                    items: []
                });
            }
        } else {
            const response = await ADD_PO({ poCode: po.noPo, poDate: po.date, supplierId: po.supplierId });
            if (response.status === 400) {
                // console.log(response.data.error.form);
                snackBarOpen(response.data.error.message, 'error');
            }
            if (response.status === 200) {
                const idPo = response.data.data.po_id;
                const resCharge = await CHARGE(po.charge, idPo);
                po.items.map(async (item, i) => {
                    const resAddItem = await ADD_ITEM_PO(item.productId, item.harga, item.qty, idPo);
                    // console.log('aditem', i, resAddItem.data);
                });
                setOpenFS(false);
                setIsDetail(false);
                snackBarOpen(response.data.success.message, 'success');
                setPo({
                    id: null,
                    noPo: '',
                    date: null,
                    supplierId: '',
                    supplierName: '',
                    charge: 0,
                    subTotal: 0,
                    total: 0,
                    items: []
                });
            }
        }
        setLoading(false);

        // setErorForm({ ...errorForm, noPo: 'harus nomor' });
    };

    const handleChangeStatus = async () => {
        setLoading(true);
        if (po.id) {
            if (po.status === 'issued') {
                const response = await ISSUED_TO_PROCESSED(po.id);
                if (response.status === 400) {
                    snackBarOpen(response.data.error.message, 'error');
                }
                if (response.status === 200) {
                    setOpenFS(false);
                    setIsDetail(false);
                    snackBarOpen(response.data.success.message, 'success');
                    setPo({
                        id: null,
                        noPo: '',
                        date: null,
                        supplierId: '',
                        supplierName: '',
                        charge: 0,
                        subTotal: 0,
                        total: 0,
                        items: []
                    });
                }
            }
            if (po.status === 'processed') {
                const response = await PROCESSED_TO_DONE(po.id);
                if (response.status === 400) {
                    snackBarOpen(response.data.error.message, 'error');
                }
                if (response.status === 200) {
                    setOpenFS(false);
                    setIsDetail(false);
                    snackBarOpen(response.data.success.message, 'success');
                    setPo({
                        id: null,
                        noPo: '',
                        date: null,
                        supplierId: '',
                        supplierName: '',
                        charge: 0,
                        subTotal: 0,
                        total: 0,
                        items: []
                    });
                }
            }
        }
        setLoading(false);

        // setErorForm({ ...errorForm, noPo: 'harus nomor' });
    };

    const handleBatal = () => {
        setOpenFS(false);
        setIsDetail(false);

        setPo({
            id: null,
            noPo: '',
            date: null,
            supplierId: '',
            supplierName: '',
            charge: 0,
            subTotal: 0,
            total: 0,
            items: []
        });
    };

    return (
        <POContext.Provider
            value={{
                openFS,
                setOpenFS,
                supplier,
                setPo,
                errorForm,
                setErorForm,
                handleBatal,
                handleNext,
                setOpenItem,
                openItem,
                po,
                handleChangeCharge,
                handleChangeDate,
                handleChangeNoPo,
                handleChangeSupplier,
                handleChangeHarga,
                handleChangeQty,
                handleRemoveItem,
                handleAddItem,
                loading,
                setLoading,
                snackBarOpen,
                SnackBarComponent,
                product,
                handleChangeItem,
                setIsDetail,
                isDetail,
                handleChangeStatus
            }}
        >
            {children}
        </POContext.Provider>
    );
};

export function usePO() {
    return useContext(POContext);
}
export default POProvider;

POProvider.propTypes = { children: PropTypes.any };
