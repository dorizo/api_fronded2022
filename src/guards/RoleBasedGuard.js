import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import ME_QUERY from 'src/graphql/queries/ME_QUERY';
import LoadingScreen from 'src/components/LoadingScreen';
import isEmpty from 'src/utils/isEmpty';
import { Navigate } from 'react-router';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
    children: PropTypes.node
};

export default function RoleBasedGuard({ children }) {
    const { data, loading } = useQuery(ME_QUERY, { fetchPolicy: 'cache-first' });

    if (loading) {
        return <LoadingScreen />;
    }
    const user = data && data.me;

    if (!user) {
        return <Navigate to={'/'} />;
    }

    if (isEmpty(user.role)) {
        return (
            <Container>
                <Alert severity="error">
                    <AlertTitle>Permission Denied</AlertTitle>
                    You do not have permission to access this page
                </Alert>
            </Container>
        );
    }

    return <>{children}</>;
}
