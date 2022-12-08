import { useQuery } from 'react-query';
import { ME_PERMISION } from 'services/auth';

const useMePermision = () => {
    const { data, isLoading } = useQuery('ME_PERMISION', ME_PERMISION);
    const permision = data && data.data;
    return { permision, loading: isLoading };
};

export default useMePermision;
