import { InputAdornment, OutlinedInput, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { width: '100%' },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`
    }
}));

export default function TableToolbar(props) {
    const { value, onSearch } = props;
    return (
        <Toolbar
            sx={{
                pl: { sm: 0 },
                pr: { xs: 0, sm: 0 }
            }}
        >
            <SearchStyle
                value={value}
                onChange={onSearch}
                placeholder="Cari ..."
                startAdornment={
                    <InputAdornment position="start">
                        <Box sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                }
            />
        </Toolbar>
    );
}

TableToolbar.propTypes = {
    onSearch: PropTypes.func,
    value: PropTypes.any
};
