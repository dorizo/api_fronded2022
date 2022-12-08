import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Menu, MenuItem } from '@mui/material';
import { useMee } from 'contexts/MeContext';
import { useState } from 'react';
import LogoWhite from 'ui-component/LogoWhite';

export default function Navbar() {
    const { logout, me } = useMee();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark mb-2"
            style={{ backgroundColor: '#DB1F1F', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        >
            <div className="container">
                <Button
                    className="navbar-brand"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <AccountCircleIcon style={{ marginRight: 5 }} fontSize="large" />
                    Hai, {me.name}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button'
                    }}
                >
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
                <div id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <LogoWhite />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
