import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../contexts/Context';
import axios from 'axios';

const AccommodationCard = ({ accommodation, setSelected }) => {

    const { userAccommodations, setUserAccommodations, user, token } = useContext(Context);

    const addToFavourites = () => {
        const params = new URLSearchParams({ accommodationId: accommodation.id });
        const headersConfig = {
            headers: {
               Authorization: "Bearer " + token,
               'Content-type': 'application/x-www-form-urlencoded'
            }
        };
        axios.post('http://accommodations-mk.azurewebsites.net/favorites/add', params, headersConfig)
        .then((response) => {
            let newUserAccommodations;
            if (userAccommodations.find(e => e.id == accommodation.id)) {
                newUserAccommodations = userAccommodations.filter(e => e.id != accommodation.id);
            } else {
                newUserAccommodations = [ ...userAccommodations, accommodation]
            }
            setUserAccommodations(newUserAccommodations);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="ui card">
            <div className="content">
                <a href={accommodation.website}>
                    <div className="header"><b>{accommodation.name}</b></div>
                </a>
                <div className="description">
                    {accommodation.stars} <i aria-hidden="true" className="yellow star icon"></i>
                </div>
                {setSelected !== null &&
                <div className="description show-on-map"
                    onClick={() => setSelected({ id: accommodation.id, center: [accommodation.latitude, accommodation.longitude]})}
                >
                    Прикажи на мапа <i aria-hidden="true" className="blue map marker alternate icon"></i>
                </div>}
                <div className="meta">
                    <Link to={`/accommodation/${accommodation.id}`}>
                        Види повеќе...
                    </Link>
                </div>
                {user && 
                <a className="heart-link" onClick={() => addToFavourites()}>
                    <i aria-hidden="true" className={`big heart ${userAccommodations.find(e => e.id == accommodation.id) ? 'red' : 'outline'} icon`}></i>
                </a>}                
            </div>
        </div>
    );
}

export default AccommodationCard;