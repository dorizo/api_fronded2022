import LoadingPage from 'components/Loading';
import { PropTypes } from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { ME, ME_PERMISION } from 'services/auth';

const MeContext = createContext();

const MeProvider = ({ children }) => {
    const [me, setMe] = useState(null);
    const [roles, setRoles] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
    const { data: p, isLoading: pl, refetch: rP } = useQuery('ME_PERMISION', ME_PERMISION);
    const { data, isLoading, refetch: rM } = useQuery('ME', ME);

    const qc = useQueryClient();
    React.useEffect(() => {
        async function checkAT() {
            if (accessToken) {
                await localStorage.setItem('token', accessToken);
                setAccessToken(accessToken);
            } else {
                await localStorage.removeItem('token');
            }
        }
        checkAT();
    }, [accessToken]);
    React.useEffect(() => {
        async function check() {
            if (me === undefined && accessToken !== null) {
                rM();
            }
            if (roles === undefined && accessToken !== null) {
                rP();
            }
            if (data && data.status === 200) {
                const mee = data && data.data?.data;
                const pp = p && p.data?.data;
                await setMe(mee);
                await setRoles(pp);
            }
            if (data && data.status === 400) {
                await setMe(null);
                await setRoles(null);
            }
        }
        check();
    });
    const logout = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('refreshToken');
        await localStorage.clear();
        await caches.delete('token');
        await setAccessToken(null);
        await sessionStorage.clear();
        qc.clear();
        setMe(null);
        setRoles(null);
        return window.location.reload();
    };
    const checkRole = (roleName) => roles && roles.some((o) => o.role === roleName);

    const checkRoles = (roleName) =>
        roles &&
        roles
            .map((r) => {
                if (r.module) {
                    return r.module.some((m) => m.module === roleName || roleName === 'dashboard');
                }
                if (roleName === 'dashboard') {
                    return true;
                }
                return false;
            })
            .some((o) => o);

    const checkPermision = (permissionName) => {
        /* eslint-disable prefer-const */
        let pe = [];
        /* eslint-disable no-unused-expressions */
        roles &&
            roles.map((r) => {
                if (r.module) {
                    r.module.map((m) => m.permission.map(async (i) => pe.push(i.permission)));
                }
                if (r.spesialPermission) {
                    r.spesialPermission.map(async (i) => pe.push(i.permission));
                }
                return false;
            });
        return pe.some((i) => i === permissionName || permissionName === '*');
    };

    const role = roles && roles.map((a) => a.role).join(',');
    if (isLoading || pl) {
        return <LoadingPage />;
    }
    return (
        <MeContext.Provider
            value={{
                me,
                role,
                checkRole,
                checkRoles,
                accessToken,
                setAccessToken,
                logout,
                checkPermision
            }}
        >
            {children}
        </MeContext.Provider>
    );
};
export function useMee() {
    return useContext(MeContext);
}

export default MeProvider;

MeProvider.propTypes = { children: PropTypes.any };
