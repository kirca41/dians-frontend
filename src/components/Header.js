import React, { useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { Context } from '../contexts/Context';

const Header = () => {

    const { setUserAccommodations, user, setUser, setToken } = useContext(Context);
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();

        setToken(null);
        setUser(null);
        setUserAccommodations([]);

        localStorage.removeItem("jwt");
        localStorage.removeItem("user");

        navigate("/");
    }

    return (
        <div className="ui menu">
            <Link className="item" to="/"><i aria-hidden="true" className="blue home icon"></i></Link>
            {user ? (
                <>
                    <div className="item">{user}</div>
                    <Link className="item" to={`/${user}/favourites`}>Омилени</Link>
                    <a className="item" href="#" onClick={(e) => handleClick(e)}>Одјави се</a>
                </>
                ) : (
                <>
                    <Link className="item" to="/login">Најави се</Link>
                    <Link className="item" to="/register">Регистрирај се</Link>
                </>
            )}            
        </div>
    );
};

export default Header;