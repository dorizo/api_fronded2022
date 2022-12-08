// material-ui
import { Typography } from '@mui/material';
import { useMee } from 'contexts/MeContext';
import menuItem from 'menu-items';
// project imports
import NavGroup from './NavGroup';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const { checkPermision } = useMee();
    const navItems = menuItem.items.map((item) => {
        if (item.type === 'group') {
            const ada = item.children.some((c) => checkPermision(c.access));
            if (ada) {
                return <NavGroup key={item.id} item={item} />;
            }
            return null;
        }
        return (
            <Typography key={item.id} variant="h6" color="error" align="center">
                Menu Items Error
            </Typography>
        );
    });

    return <>{navItems}</>;
};

export default MenuList;
