import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccommodationInfo = () => {

    const [accommodation, setAccommodation] = useState(null);
    const navigate = useNavigate();
    let { id } = useParams();
    let imgId = Math.floor(Math.random() * 5) + 1; 
    const image = require(`../pictures/pic${imgId}.svg`);
    id = parseInt(id);

    useEffect(() => {
        const fetchAccommodation = async () => {
            const { data } = await axios.get(`https://accommodations-mk.azurewebsites.net/accommodation/${id}`);
            
            setAccommodation(data);
        }

        fetchAccommodation();
    }, [id]);

    const info = accommodation ? (
        <div className="ui items accommodation-info">
            <div className="item">
                <div className="content">
                    <a className="header">{accommodation.name}</a>
                    <div className="meta">
                        <span className="cinema">{accommodation.property_type}</span>
                    </div>
                    <div className="description">
                        {accommodation.website ? <p>Вебсајт: <a href={accommodation.website}>{accommodation.website}</a></p> : null}
                        {accommodation.stars ? <p>Рејтинг: {accommodation.stars} <i aria-hidden="true" className="yellow star icon"></i></p> : null}
                        {accommodation.email ? <p>Е-пошта: {accommodation.email}</p> : null}
                        {accommodation.phone ? <p>Телефон: {accommodation.phone}</p> : null}
                        {accommodation.city ? <p>Град: {accommodation.city}</p> : null}
                        {accommodation.postcode ? <p>Поштенски код: {Math.round(accommodation.postcode)}</p> : null}
                        {accommodation.street ? <p>Улица: {accommodation.street}</p> : null}
                        {accommodation.house_number ? <p>Број: {accommodation.house_number}</p> : null}
                        {accommodation.rooms ? <p>Број на соби: {accommodation.rooms}</p> : null}
                        {accommodation.internet_access_fee ? <p>Цена на интернет пристап: {accommodation.internet_access_fee ? "Се плаќа" : "Бесплатно"}</p> : null}
                    </div>
                    <div className="extra">
                        {accommodation.smoking ? <div className="ui label">Дозволено пушење</div> : null}
                        {accommodation.smoking ? <div className="ui label"><i aria-hidden="true" className="wifi icon"></i>Интернет пристап</div>: null}                        
                    </div>
                </div>
            </div> 
            <div className="item">
                <img className="ui massive image" src={image} />
            </div>           
        </div>             
    ) : null;

    const loading = !accommodation ? (
        <div className="ui segment">
            <div className="ui active transition visible inverted dimmer">
                <div className="content">
                    <div className="ui inverted text loader">Се вчитува...</div>
                </div>
            </div>
            <img src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" className="ui image" />
        </div>
    ) : null;

    return (
        <div className="ui text container">
            {info}
            {loading}
            <button 
                className="ui button"
                onClick={() => navigate(-1)}
            >
                <i aria-hidden="true" className="angle left icon"></i>
                Назад
            </button>
        </div>
    );
};

export default AccommodationInfo;