import React from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import { Title } from '@/pages/Credentials/components/Title';
import Button from '@/components/sharedComponents/Buttons/Button';

const Profile: React.FC = () => {
    const { currentUser, logout } = React.useContext(AuthContext);

    return (
        <>
            <Title>Profile Page</Title>
            <div>{currentUser.email}</div>
            <Button color='primary' onClick={logout}>
                {'Logout'}
            </Button>
        </>
    );
};

export default Profile;
