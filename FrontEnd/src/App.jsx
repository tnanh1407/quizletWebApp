import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import './components/Header/CssHeader.css'
import './components/MainContent/CssMainContent.css'
import './components/Footer/CssFooter.css'
import './components/Navbar/CssNavbar.css'
import './components/Page/CssYourLibrary.css'
import './components/Page/LibraryChildren/Classes/CssClasses.css'
import './components/Page/LibraryChildren/ExpertSolutions/CssExpertSolutions.css'
import './components/Page/LibraryChildren/FlashCard/CssFlashCard.css'
import './components/Page/LibraryChildren/Folders/CssFolders.css'
import './components/Page/LibraryChildren/PracticeTests/CssPracticeTests.css'
import Header from './components/Header/Header.jsx'
import MainContent from './components/MainContent/MainContent.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import YourLibrary from './components/Page/YourLibrary.jsx';
import FlashCard from './components/Page/LibraryChildren/FlashCard/FlashCard.jsx';
import PractiveTests from './components/Page/LibraryChildren/PracticeTests/PracticeTests.jsx'
import ExpertSolutions from './components/Page/LibraryChildren/ExpertSolutions/ExpertSolutions.jsx';
import Folders from './components/Page/LibraryChildren/Folders/Folders.jsx';
import Classes from './components/Page/LibraryChildren/Classes/Classes.jsx';

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
                    <Route path="/library" element={<YourLibrary isPadded={isPadded} />}>
                        <Route path="flashcard" element={<FlashCard/>} />
                        <Route path="practive-tests" element={<PractiveTests/>} />
                        <Route path="expert-solutions" element={<ExpertSolutions/>} />
                        <Route path="folders" element={<Folders/>} />
                        <Route path="classes" element={<Classes/>} />
                    </Route>
                    <Route path="/demo" element={<h1>Demo</h1>} />
                    <Route path="/newfolder" element={<h1>New Folder</h1>} />
                    <Route path="/flashcards" element={<h1>Flashcards</h1>} />
                    <Route path="/expertsolutions" element={<h1>Expert Solutions</h1>} />   
                    {/* <Route path="/flashcards/flashcard" element={<FlashCards/>} /> */}
                </Routes>
            </Router>
        </>
    )
}

export default App
