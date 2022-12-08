import { useQuery } from 'react-query';
import { ME } from 'services/auth';

const useMe = () => {
    const { data, isLoading } = useQuery('ME', ME);
    const user = data && data.data;
    return { user, loading: isLoading };
};

export default useMe;
