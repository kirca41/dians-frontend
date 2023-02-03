import React from 'react';
import AccommodationCard from "./AccommodationCard";


const AccommodationList = ({ accommodations, setSelected, containerClass, errorMessage, children }) => {

    const renderAccommodations = accommodations.map((acc) => {
        return (
            <AccommodationCard
                key={acc.id}
                accommodation={acc}
                setSelected={setSelected}
            />
        );
    });
    
    return (
        <div className={`ui cards ${containerClass}`}>
            {children}
            {accommodations.length > 0 ? renderAccommodations : 
            <h3>{errorMessage}</h3>}
        </div>
    );
}

export default AccommodationList;