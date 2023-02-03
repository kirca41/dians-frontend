import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialErrors = {
    emptyError: "",
    passwordsDontMatchError: "",
    doesntExistError: "",
}

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!username || !password || !repeatedPassword || !name || !surname) {
            setErrors({ ...errors, emptyError: "Ве молиме пополнете ги сите полиња!"});
        }
        else if(password !== repeatedPassword) {
            setErrors({...errors, emptyError: "", passwordsDontMatchError: "Внесените лозинки не се совпаѓаат!"})
        }
        else {
            const params = new URLSearchParams({ username, password, repeatedPassword, name, surname });
            axios.post('http://accommodations-mk.azurewebsites.net/register', params, { headers: {'content-type': 'application/x-www-form-urlencoded'}})
                .then((response) => {
                    console.log(response);
                    navigate('/login');
                })
                .catch((error) => {
                    setErrors({ errors, doesntExistError: "Внесените информации не се валидни. Обидете се повторно!"});
                });
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
                </div>
                <div className="field">
                    <label>Потврди лозинка</label>
                    <input 
                        placeholder="Потврди лозинка"
                        type="password"
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                        value={repeatedPassword}
                    />
                </div>
                <div className="field">
                    <label>Име</label>
                    <input 
                        placeholder="Име"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="field">
                    <label>Презиме</label>
                    <input 
                        placeholder="Презиме"
                        onChange={(e) => setSurname(e.target.value)}
                        value={surname}
                    />
                    {errors.emptyError && <div className="ui red basic label">{errors.emptyError}</div>}
                    {errors.passwordsDontMatchError && <div className="ui red basic label">{errors.passwordsDontMatchError}</div>}
                    {errors.doesntExistError && <div className="ui red basic label">{errors.doesntExistError}</div>}
                </div>    
                <div>           
                    <button className="ui primary button" type="submit" onClick={(e) => handleSubmit(e)} >Регистрација</button>
                    <Link to="/login" className="ui button">Најави се</Link>
                </div> 
            </form>
        </div>
    );
};

export default Register;