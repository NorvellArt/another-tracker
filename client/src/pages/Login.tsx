import { useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import React from "react";

const Login = () => {
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
        await login(email, password)

        setEmail('');
        setPassword('');
    };

    return (
        <>
            <div className="email">
                <span>Email </span>
                <input onChange={onChangeEmail} />
            </div>

            <div className="password">
                <span>Password </span>
                <input onChange={onChangePassword} />
            </div>

            <button onClick={onLoginClick}>Login</button>
        </>
    );
};

export default Login;
