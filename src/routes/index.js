import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import MobileRoutes from './MobileRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, MobileRoutes, AuthenticationRoutes], config.basename);
}
