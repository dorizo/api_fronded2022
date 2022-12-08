/* eslint-disable no-unused-vars */

import useSnackbar from 'components/SnackBar';
import { PropTypes } from 'prop-types';
import React, { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
    ADD_ITEM_DO,
    ADD_DO,
    CHARGE,
    DELETE_ITEM_DO,
    ISSUED_TO_PROCESSED,
    PROCESSED_TO_DONE,
    UPDATE_ITEM_DO,
    UPDATE_DO
} from 'services/do';
import { STOCK_ALL_HO } from 'services/stock';
import { GET_WITELS } from 'services/witel';

const DOContext = createContext();

const DOProvider = ({ children }) => {
    const [openFS, setOpenFS] = React.useState(false);
    const [isDetail, setIsDetail] = React.useState(false);
    const [openItem, setOpenItem] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errorForm, setErorForm] = React.useState({ doCode: null, date: null, witel: null });
    const { data } = useQuery('GET_WITELS', GET_WITELS);
    const { data: dataStock } = useQuery('STOCK_ALL_HO', STOCK_ALL_HO);
    const queryClient = useQueryClient();

    const { snackBarOpen, SnackBarComponent, snackBarClose } = useSnackbar();

    const dataStocks = dataStock && dataStock.data;

    const stock =
        dataStocks &&
        dataStocks.data.map((s) => {
            const d = { label: s.product_name, id: s.product_id };
            return d;
        });

    const dataWitel = data && data.data;
    const witel =
        dataWitel &&
        dataWitel.data.map((s) => {
            const d = { label: s.witel_name, id: s.witel_id };
            return d;
        });
    const [doo, setDo] = React.useState({
        id: null,
        doCode: '',
        date: null,
        witelId: '',
        witelName: '',
        charge: 0,
        status: null,
        subTotal: 0,
        total: 0,
        items: []
    });

    const handleChangeDate = (tgl) => {
        setDo({ ...doo, date: tgl.format('YYYY-MM-DD') });
    };
    const handleChangeNoDo = (no) => {
        setDo({ ...doo, doCode: no });
    };
    const handleChangeWitel = (witel) => {
        if (witel) {
            setDo({ ...doo, witelName: '', witelId: witel });
        } else {
            setDo({ ...doo, witelName: null, witelId: null });
        }
    };
    const handleChangeCharge = (c) => {
        const charge = Number.isNaN(parseFloat(c)) ? 0 : parseFloat(c);
        const total = charge + parseFloat(doo.subTotal);
        setDo({ ...doo, total, charge });
    };

    const handleRemoveItem = (index) => {
        doo.items.map(async (item, i) => {
            if (i === index) {
                if (item.id) {
                    const x = await DELETE_ITEM_DO(item.id);

                    // console.log(x, 'xxxx');
                }
            }
        });

        const items = doo.items.filter((item, i) => i !== index);

        const subTotal = parseFloat(items.map((i) => parseFloat(i.total)).reduce((a, b) => a + b, 0));
        const total = subTotal + parseFloat(doo.charge);
        setDo({ ...doo, subTotal, total, items });
    };

    const handleChangeQty = (qty, index) => {
        const items = doo.items.map((item, i) => {
            if (i === index) {
                const qtyMin = qty < 0 ? 0 : qty;
                const fixQty = qty >= parseFloat(item.maxQty) ? item.maxQty : qtyMin;
                if (qty >= parseFloat(item.maxQty)) {
                    snackBarOpen('max qty', 'error');
                } else {
                    snackBarClose();
                }
                const total = parseFloat(item.harga) * fixQty;
                return { ...item, total, qty: fixQty };
            }
            return item;
        });
        const subTotal = parseFloat(items.map((i) => parseFloat(i.total)).reduce((a, b) => a + b, 0));
        const total = subTotal + parseFloat(doo.charge);

        setDo({ ...doo, subTotal, total, items });
    };

    const handleAddItem = (item) => {
        /* eslint-disable camelcase */
        const { brand_name, product_id, product_name, product_portion, stock_id, stock_price, stock_qty } = item;

        const items = {
            id: null,
            productName: product_name,
            productId: product_id,
            brandName: brand_name,
            productPortion: product_portion,
            qty: 0,
            stockId: stock_id,
            maxQty: stock_qty,
            harga: stock_price,
            total: 0
        };
        setDo({ ...doo, items: [...doo.items, items] });
        setOpenItem(false);

        // console.log(item);
    };

    const handleChangeItem = (value, index) => {
        const items = doo.items.map((item, i) => {
            if (i === index) {
                return { ...item, productId: value };
            }
            return item;
        });
        setDo({ ...doo, items });
    };

    const handleNext = async () => {
        setLoading(true);
        setErorForm({ date: null, witel: null, doCode: null });
        if (doo.doCode === '') {
            // console.log(doo.doCode, 'kkkkkkkkkkkkk');
            setErorForm({ doCode: 'required' });
            setLoading(false);
            return;
        }

        if (doo.date === null) {
            setErorForm({ date: 'required' });
            setLoading(false);
            return;
        }
        if (doo.witelId === '') {
            setErorForm({ witel: 'required' });
            setLoading(false);
            return;
        }
        if (doo.id) {
            const response = await UPDATE_DO({ doCode: doo.doCode, doDate: doo.date, witelId: doo.witelId }, doo.id);
            if (response.status === 400) {
                snackBarOpen(response.data.error.message, 'error');

                // console.log(response.data.error.form);
            }
            if (response.status === 200) {
                const idDo = response.data.data.do_id;
                await CHARGE(doo.charge, idDo);
                doo.items.map(async (item, i) => {
                    if (item.id) {
                        const resUpdateItem = await UPDATE_ITEM_DO(item.stockId, item.qty, item.id);

                        // console.log('resUpdateItem', i, resUpdateItem.data);
                    } else {
                        const resAddItem = await ADD_ITEM_DO(item.stockId, item.qty, idDo);

                        // console.log('aditem', i, resAddItem.data);
                    }
                });
                setOpenFS(false);
                setIsDetail(false);
                snackBarOpen(response.data.success.message, 'success');
                setDo({
                    id: null,
                    doCode: '',
                    date: null,
                    witelId: '',
                    witelName: '',
                    charge: 0,
                    subTotal: 0,
                    total: 0,
                    items: []
                });
                queryClient.fetchQuery('GET_DOS');
            }
        } else {
            const response = await ADD_DO({ doCode: doo.doCode, doDate: doo.date, witelId: doo.witelId });
            if (response.status === 400) {
                // console.log(response.data.error.form);
                snackBarOpen(response.data.error.message, 'error');
            }
            if (response.status === 200) {
                const idDo = await response.data.data.do_id;

                // console.log('IDDOOOOOOOO', idDo);
                await CHARGE(doo.charge, idDo);
                await doo.items.map(async (item, i) => {
                    // console.log(idDo, 'ajshlfgsaglasgs');
                    const resAddItem = await ADD_ITEM_DO(item.stockId, item.qty, idDo);

                    // console.log('aditem', i, resAddItem.data);
                });
                setOpenFS(false);
                setIsDetail(false);
                snackBarOpen(response.data.success.message, 'success');
                setDo({
                    id: null,
                    doCode: '',
                    date: null,
                    witelId: '',
                    witelName: '',
                    charge: 0,
                    subTotal: 0,
                    total: 0,
                    items: []
                });
                queryClient.fetchQuery('GET_DOS');
            }
        }
        setLoading(false);

        // setErorForm({ ...errorForm, doCode: 'harus nomor' });
    };

    const handleChangeStatus = async () => {
        setLoading(true);
        if (doo.id) {
            if (doo.status === 'issued') {
                const response = await ISSUED_TO_PROCESSED(doo.id);
                if (response.status === 400) {
                    snackBarOpen(response.data.error.message, 'error');
                }
                if (response.status === 200) {
                    setOpenFS(false);
                    setIsDetail(false);
                    snackBarOpen(response.data.success.message, 'success');
                    setDo({
                        id: null,
                        doCode: '',
                        date: null,
                        witelId: '',
                        witelName: '',
                        charge: 0,
                        subTotal: 0,
                        total: 0,
                        items: []
                    });
                    queryClient.fetchQuery('GET_DOS');
                }
            }
            if (doo.status === 'processed') {
                const response = await PROCESSED_TO_DONE(doo.id);
                if (response.status === 400) {
                    snackBarOpen(response.data.error.message, 'error');
                }
                if (response.status === 200) {
                    setOpenFS(false);
                    setIsDetail(false);
                    snackBarOpen(response.data.success.message, 'success');
                    setDo({
                        id: null,
                        doCode: '',
                        date: null,
                        witelId: '',
                        witelName: '',
                        charge: 0,
                        subTotal: 0,
                        total: 0,
                        items: []
                    });
                    queryClient.fetchQuery('GET_DOS');
                    queryClient.fetchQuery('GET_ROS');
                    queryClient.fetchQuery('GET_RO_BY_WITEL');
                }
            }
        }
        setLoading(false);
    };

    const handleBatal = () => {
        setOpenFS(false);
        setIsDetail(false);

        setDo({
            id: null,
            doCode: '',
            date: null,
            witelId: '',
            witelName: '',
            charge: 0,
            subTotal: 0,
            total: 0,
            items: []
        });
    };

    return (
        <DOContext.Provider
            value={{
                openFS,
                setOpenFS,
                witel,
                setDo,
                errorForm,
                setErorForm,
                handleBatal,
                handleNext,
                setOpenItem,
                openItem,
                doo,
                handleChangeCharge,
                handleChangeDate,
                handleChangeNoDo,
                handleChangeWitel,
                handleChangeQty,
                handleRemoveItem,
                handleAddItem,
                loading,
                setLoading,
                snackBarOpen,
                SnackBarComponent,
                stock,
                handleChangeItem,
                setIsDetail,
                isDetail,
                handleChangeStatus
            }}
        >
            {children}
        </DOContext.Provider>
    );
};

export function useDO() {
    return useContext(DOContext);
}
export default DOProvider;

DOProvider.propTypes = { children: PropTypes.any };
