import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };

    const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const onLoginClick = async () => {
        const response = await fetch("http://45.140.169.11:80/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        const token = await response.json();
        console.log(token);

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
