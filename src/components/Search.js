import React, { useState } from 'react';
import axios from 'axios';

import '../styles/App.css';

const Search = ({ setAccommodations }) => {

    const [keyword, setKeyword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data } = await axios.get('https://accommodations-mk.azurewebsites.net/accommodation/search', {
            params: {
              keyword
            }
        });
        setAccommodations(data);
    }

    return (
        <form className="ui search" onSubmit={(e) => handleSubmit(e)}>
            <div className="ui icon input">
                <input 
                    type="text" 
                    autoComplete="off" 
                    value={keyword}
                    placeholder="Пребарувај..." 
                    className="prompt"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <i aria-hidden="true" className="search icon"></i>
            </div>
        </form>
    );
}

export default Search;