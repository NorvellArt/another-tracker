import React, { useState } from "react";
import CredentialsForm from "@/components/sharedComponents/CredentialsForm";
import LayoutContainer from "@/components/LayoutContainer";
import Button from "@/components/sharedComponents/Buttons/Button";
import { Title } from "@/pages/Credentials/components/Title";

import { AuthContext } from "@/provider/AuthProvider";

const Login: React.FC = () => {
    const { login } = React.useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };

    const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const onLoginClick = async () => {
        await login(email, password);
    };

    return (
        <LayoutContainer>
            <CredentialsForm>
                <Title>ANOTHER TRACKER</Title>
                <div className="email">
                    <span>Email </span>
                    <input value={email} onChange={onChangeEmail} />
                </div>

                <div className="password">
                    <span>Password </span>
                    <input value={password} onChange={onChangePassword} />
                </div>

                <Button onClick={onLoginClick}>Login</Button>
            </CredentialsForm>
        </LayoutContainer>
    );
};

export default Login;
