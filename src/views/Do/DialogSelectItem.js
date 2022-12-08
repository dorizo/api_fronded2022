import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDO } from 'hooks/useDo';
import * as React from 'react';
import { useQuery } from 'react-query';
import { STOCK_ALL_HO } from 'services/stock';

export default function DialogSelectItem() {
    const { setOpenItem, openItem, handleAddItem } = useDO();
    const [value, setValue] = React.useState('');
    const { data, isLoading } = useQuery('STOCK_ALL_HO', STOCK_ALL_HO);
    if (isLoading) {
        return <p>.....</p>;
    }
    const item = data && data.data;
    const i = item && item.data.filter((a) => a.product_name.toLowerCase().includes(value));
    return (
        <Dialog fullWidth maxWidth="xs" onClose={() => setOpenItem(false)} open={openItem}>
            <DialogTitle>Tambah Item</DialogTitle>
            <TextField
                onChange={(e) => setValue(e.target.value)}
                value={value}
                size="small"
                sx={{ margin: 2 }}
                id="f-po"
                label="Cari"
                type="text"
            />
            <List
                sx={{
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 }
                }}
            >
                {i.map((item) => (
                    <ListItem button key={item}>
                        <ListItemText
                            onClick={() => handleAddItem(item)}
                            secondary={item.product_portion}
                            primary={`${item.product_name} | ${item.brand_name}`}
                        />
                    </ListItem>
                ))}
                {i.length === 0 && (
                    <ListItem>
                        <ListItemText primary="Kosong ..." />
                    </ListItem>
                )}
            </List>
        </Dialog>
    );
}
