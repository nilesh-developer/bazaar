import React from 'react'
import { useOutletContext } from 'react-router-dom'
import Home from '../pages/Home'
import LandingPage from '../pages/LandingPage'

function HomePageSelector() {
    const { store } = useOutletContext()

    return store?.template === "theme1" ?
    <Home />
    :
    <LandingPage />
}

export default HomePageSelector