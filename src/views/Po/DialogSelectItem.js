import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { usePO } from 'hooks/usePo';
import * as React from 'react';
import { useQueries, useQuery } from 'react-query';
import { GET_PRODUCTS } from 'services/product';

const emails = [
    'username@gmail.com',
    'usera02@gmail.com',
    'user0x2@gmail.com',
    'user02c@gmail.com',
    'user02@vgmail.com',
    'user02@gbmail.com',
    'user02@gmvail.com',
    'user02@gmaxil.com'
];

export default function DialogSelectItem() {
    const { setOpenItem, openItem, handleAddItem } = usePO();
    const [value, setValue] = React.useState('');
    const { data, isLoading } = useQuery('GET_PRODUCTS', GET_PRODUCTS);
    if (isLoading) {
        return <p>.....</p>;
    }
    const item = data && data.data;
    const i = item && item.data.filter((a) => a.product_name.toLowerCase().includes(value));
    const handleSearch = emails.filter((a) => a.toLowerCase().includes(value));
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
