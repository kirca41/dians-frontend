import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapWithListAndForm from './MapWithListAndForm';
import Login from './Login';
import Register from './Register';
import AccommodationInfo from './AccommodationInfo';
import Header from './Header';
import Favourites from './Favourites';
import { ContextProvider } from '../contexts/Context';

const App = () => {

    return (
        <ContextProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" exact element={<MapWithListAndForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/accommodation/:id" element={<AccommodationInfo />} />
                    <Route path="/:username/favourites" element={<Favourites />} />
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    );

}

export default App;