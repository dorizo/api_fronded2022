import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';

export default function Action(props) {
    const { actionOpen, actionClose, anchorEl, handelDelete, handleEdit, handleDetail, handelStok } = props;
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={actionOpen}
            onClose={actionClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            MenuListProps={{
                'aria-labelledby': 'basic-button'
            }}
        >
            <MenuItem onClick={handelStok}>
                <ListItemIcon>
                    <InfoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Lihat Stok</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDetail}>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Lihat User</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handelDelete}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        </Menu>
    );
}

Action.propTypes = {
    actionOpen: PropTypes.any,
    actionClose: PropTypes.any,
    handelDelete: PropTypes.any,
    handleEdit: PropTypes.any,
    handleDetail: PropTypes.any,
    handelStok: PropTypes.any,
    anchorEl: PropTypes.any
};
