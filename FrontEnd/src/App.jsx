import { useState } from 'react'
import './App.css'
import './components/Header/CssHeader.css'
import Header from './components/Header/Header.jsx'
import './components/MainContent/CssMainContent.css'
import MainContent from './components/MainContent/MainContent.jsx'

function App() {
    return (
        <>
            <Header/>
            <MainContent/>
        </>
    )
}

export default App
