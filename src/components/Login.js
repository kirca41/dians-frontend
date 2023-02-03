import React, { useState, useContext, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Context } from '../contexts/Context';
import axios from 'axios';

const initialErrors = {
    emptyError: "",
    doesntExistError: "",
    tokenExpiredError: ""
}

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(initialErrors);
    const { setUserAccommodations, setUser, setToken } = useContext(Context);
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setErrors({ ...errors, tokenExpiredError: searchParams.get("error") });
    }, []);

    const saveTokenAndUserInLocalStorage = (user, token) => {
        localStorage.setItem("jwt", token);
        localStorage.setItem("user", user);
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            setErrors({ ...errors, emptyError: "Ве молиме пополнете ги сите полиња!"});
        }
        else {
            const params = new URLSearchParams({ username, password });
            let { data } = await axios.post('https://accommodations-mk.azurewebsites.net/authenticate', params, { headers: {'content-type': 'application/x-www-form-urlencoded'}});
            setUser(username);
            setToken(data.jwt);

            saveTokenAndUserInLocalStorage(username, data.jwt);

            const headersConfig = {
                headers: {
                   Authorization: "Bearer " + data.jwt
                }
            };

            ({ data } = await axios.get('https://accommodations-mk.azurewebsites.net/favorites/show', headersConfig));

            setUserAccommodations(data.accommodations);

            navigate('/');
        }
        
    }

    return (
        <div className="login-register-container">
            <form className="ui form login-register-form">
                <div className="field">
                    <label>Корисничко име</label>
                    <input 
                        placeholder="Корисничко име"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <div className="field">
                    <label>Лозинка</label>
                    <input 
                        placeholder="Лозинка"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {errors.emptyError && <div className="ui red basic label">{errors.emptyError}</div>}
                    {errors.doesntExistError && <div className="ui red basic label">{errors.doesntExistError}</div>}
                    {errors.tokenExpiredError && <div className="ui red basic label">{errors.tokenExpiredError}</div>}
                </div>
                <div className="buttons">
                    <button className="ui primary button" type="submit" onClick={(e) => handleSubmit(e)} >Најава</button>
                    <Link to="/register" className="ui button">Регистрирај се</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;