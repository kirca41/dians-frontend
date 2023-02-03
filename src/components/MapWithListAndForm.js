import React, { useState, useContext } from 'react';
import Map from './Map';
import AccommodationList from "./AccommodationList";
import FiltersForm from './FiltersForm';
import Search from './Search';
import { Context } from '../contexts/Context';

import 'leaflet/dist/leaflet.css';
import '../styles/App.css';

const MapWithListAndForm = () => {

    const [selected, setSelected] = useState(null);
    const { accommodations, setAccommodations } = useContext(Context);

    return (
        <div className="map-list-container">
            <FiltersForm />
            <AccommodationList 
                accommodations={accommodations} 
                setSelected={setSelected} 
                containerClass='overflow'
                errorMessage='Не се пронајдени сместувачки капацитети. Обидете се повторно!'
            >
                <Search setAccommodations={setAccommodations} />
            </AccommodationList>
            <Map selectedProp={selected} />
        </div>
    );
};

export default MapWithListAndForm;