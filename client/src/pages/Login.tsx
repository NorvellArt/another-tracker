import { useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = React.useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };

    const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const onLoginClick = async () => {
        const token = await login(email, password);

        console.log('token', token)
        if (token) {
            navigate('/home');

            setEmail("");
            setPassword("");
        }
    };

    return (
        <>
            <div className="email">
                <span>Email </span>
                <input value={email} onChange={onChangeEmail} />
            </div>

            <div className="password">
                <span>Password </span>
                <input value={password} onChange={onChangePassword} />
            </div>

            <button onClick={onLoginClick}>Login</button>
        </>
    );
};

export default Login;
