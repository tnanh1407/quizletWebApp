import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import './components/Header/CssHeader.css'
import Header from './components/Header/Header.jsx'
import './components/MainContent/CssMainContent.css'
import MainContent from './components/MainContent/MainContent.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

function App() {
    return (
        <>
        {/* <Router> */}
            <Header/>
            <Navbar/>
            <MainContent/>
            {/* <Routes>
                <Route path="/" element={<MainContent/>}/> */}
                {/* <Route path="/phimle" element={<PhimLe />} />
                <Route path="/phimbo" element={<PhimBo/>}/> */}
                {/* <Route path="/theloai" element={<MainContentPhim />} />
                <Route path="/quocgia" element={<MainContentPhim/>}/>
                <Route path="/namphathanh" element={<MainContentPhim />} /> */}
                {/* <Route path="/phimchieurap" element={<PhimChieuRap />} />
                <Route path="/trailer" element={<MainContentPhim />} />
                <Route path="/topphim" element={<TopPhim />} />
                <Route path="/phim/:idphim" element={<MovieDetail />} /> */}
            {/* </Routes> */}
            {/* <Footer/> */}
        {/* </Router> */}
        </>
    )
}

export default App
