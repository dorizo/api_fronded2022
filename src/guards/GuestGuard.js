import LoadingPage from 'components/Loading';
import { useMee } from 'contexts/MeContext';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';

export default function GuestGuard({ children }) {
    const { me, role } = useMee();
    const user = me;
    const listRole = role && role.split(',');
    const ad = listRole && listRole.includes('Project Manager');
    if (user && (ad === undefined || ad === null)) {
        return <LoadingPage />;
    }
    if (user && ad) {
        return <Navigate to="/mobile/project" />;
    }
    if (user && !ad) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
}
GuestGuard.propTypes = {
    children: PropTypes.node
};
