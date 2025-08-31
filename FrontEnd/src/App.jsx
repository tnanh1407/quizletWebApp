import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import './components/Header/CssHeader.css'
import Header from './components/Header/Header.jsx'
import './components/MainContent/CssMainContent.css'
import MainContent from './components/MainContent/MainContent.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

function App() {
    const [isPadded, setIsPadded] = useState(true);  // state quản lý padding

    return (
        <>
            <Router>
                <Header/>
                {/* Truyền togglePadding xuống Navbar */}
                <Navbar togglePadding={() => setIsPadded(!isPadded)} />
                <Routes>
                    {/* Truyền state xuống MainContent */}
                    <Route path="/" element={<MainContent isPadded={isPadded} />} />
                    <Route path="/library" element={<h1>Library</h1>} />
                    <Route path="/demo" element={<h1>Demo</h1>} />
                    <Route path="/newfolder" element={<h1>New Folder</h1>} />
                    <Route path="/flashcards" element={<h1>Flashcards</h1>} />
                    <Route path="/expertsolutions" element={<h1>Expert Solutions</h1>} />
                </Routes>
            </Router>
        </>
    )
}

export default App
