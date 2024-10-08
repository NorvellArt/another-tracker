import { useNavigate } from "react-router-dom";
import { useAuthApi } from "../../hooks/UseAuthApi";

const Home = () => {
    const { logout } = useAuthApi();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login')
    };

    return (
        <>
            <div>Yoyoyoyoyoyooyoyoy</div>
            <button onClick={onLogout}>Logout</button>
        </>
    );
};

export default Home;
