import { useContext } from 'react';
import { Navigate, useOutlet } from 'react-router-dom';

import { AuthContext } from '@/provider/AuthProvider';

const PublicLayout: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const outlet = useOutlet();

    if (isAuthenticated) {
        return <Navigate to='/dashboard/profile' replace />;
    }

    return <>{outlet}</>;
};

export default PublicLayout;
