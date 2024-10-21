import { useContext } from 'react';
import { Navigate, useOutlet } from 'react-router-dom';

import { AuthContext } from '@/provider/AuthProvider';
import Menu from '@/components/Menu';
import { Container } from '@/components/sharedComponents/Containers/Container';

const ProtectedLayout: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const outlet = useOutlet();

    if (!isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    return (
        <Container>
            {outlet} <Menu />
        </Container>
    );
};

export default ProtectedLayout;
