import { useContext } from 'react';
import { Navigate, useOutlet } from 'react-router-dom';

import { AuthContext } from '@/provider/AuthProvider';
import PublicContainer from '@/components/sharedComponents/Containers/PublicContainer';

const PublicLayout: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const outlet = useOutlet();

    if (isAuthenticated) {
        return <Navigate to='/app/profile' replace />;
    }

    return <PublicContainer>{outlet}</PublicContainer>;
};

export default PublicLayout;
