import React, { useState } from 'react';
import CredentialsForm from '@/components/sharedComponents/CredentialsForm';
import LayoutContainer from '@/components/sharedComponents/Containers/PublicContainer';
import Button from '@/components/sharedComponents/Buttons/Button';
import { Title } from '@/pages/Credentials/components/Title';

import { AuthContext } from '@/provider/AuthProvider';
import Input from '@/components/sharedComponents/Inputs/Input';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const { signUp } = React.useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };

    const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const onSignUpClick = async () => {
        await signUp(email, password);
    };

    return (
        <LayoutContainer>
            <CredentialsForm>
                <Title>ANOTHER TRACKER</Title>

                <Input
                    value={email}
                    onChange={onChangeEmail}
                    placeholder={'Email'}
                    type='text'
                />

                <Input
                    value={password}
                    onChange={onChangePassword}
                    placeholder={'Password'}
                    type='password'
                />

                <ButtonsContainer>
                    <Button onClick={onSignUpClick}>{'Sign Up'}</Button>
                    <Button onClick={() => navigate('/')} color='secondary'>
                        {'Back'}
                    </Button>
                </ButtonsContainer>
            </CredentialsForm>
        </LayoutContainer>
    );
};

const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
`;

export default SignUp;
