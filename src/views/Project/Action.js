import InfoIcon from '@mui/icons-material/Info';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import { useMee } from 'contexts/MeContext';

export default function Action(props) {
    // const { checkPermision } = useMee();
    const { actionOpen, actionClose, anchorEl, handleDetail } = props;
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
            <MenuItem onClick={handleDetail}>
                <ListItemIcon>
                    <InfoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Detail</ListItemText>
            </MenuItem>
            {/* {checkPermision('RJOB') && (
                <MenuItem onClick={handleJob}>
                    <ListItemIcon>
                        <AssignmentIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Job Estimate</ListItemText>
                </MenuItem>
            )} */}
        </Menu>
    );
}

Action.propTypes = {
    actionOpen: PropTypes.any,
    actionClose: PropTypes.any,
    // handelDelete: PropTypes.any,
    // handleEdit: PropTypes.any,
    handleDetail: PropTypes.any,
    // handleJob: PropTypes.any,
    anchorEl: PropTypes.any
};
