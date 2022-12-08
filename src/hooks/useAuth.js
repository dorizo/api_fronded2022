import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';

const useAuth = () => {
    const navigate = useNavigate();
    const qc = useQueryClient();
    const logout = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('refreshToken');
        qc.removeQueries();
        return navigate('/login');
    };
    return {
        logout
    };
};

export default useAuth;
