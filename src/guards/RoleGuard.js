import { useMee } from 'contexts/MeContext';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';

export default function UserBasedGuard({ children }) {
    const { me } = useMee();
    // const uO = useOutlet();
    // console.log(uO);
    const user = me;

    if (!user) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
}
UserBasedGuard.propTypes = {
    children: PropTypes.node
};
