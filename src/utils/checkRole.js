import { useQuery } from 'react-query';
import { ME_PERMISION } from 'services/auth';

const CheckRole = (roleName) => {
    const { data, isLoading } = useQuery('ME_PERMISION', ME_PERMISION);
    if (isLoading) {
        return null;
    }
    const permision = data && data.data;
    const cr = permision.data.some((o) => o.role === roleName);
    return cr;
};
export default CheckRole;
