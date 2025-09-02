import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "./components/Header/CssHeader.css";
import "./components/Navbar/CssNavbar.css";
import "./components/MainContent/CssMainContent.css";
import "./components/Footer/CssFooter.css";
import "./components/Navbar/Page/Demo/NewDemo/CssNewDemo.css";
import "./components//Navbar/Page/YourLibrary/CssYourLibrary.css";
import "./components/Navbar/Page/YourLibrary/LibraryChildren/Classes/CssClasses.css";
import "./components/Navbar/Page/YourLibrary/LibraryChildren/ExpertSolutions/CssExpertSolutions.css";
import "./components/Navbar/Page/YourLibrary/LibraryChildren/FlashCard/CssFlashCard.css";
import "./components/Navbar/Page/YourLibrary/LibraryChildren/Folders/CssFolders.css";
import "./components/Navbar/Page/YourLibrary/LibraryChildren/PracticeTests/CssPracticeTests.css";
import Header from "./components/Header/Header.jsx";
import MainContent from "./components/MainContent/MainContent.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import YourLibrary from "./components/Navbar/Page/YourLibrary/YourLibrary.jsx";
import FlashCard from "./components/Navbar/Page/YourLibrary/LibraryChildren/FlashCard/FlashCard.jsx";
import PractiveTests from "./components/Navbar/Page/YourLibrary/LibraryChildren/PracticeTests/PracticeTests.jsx";
import ExpertSolutions from "./components/Navbar/Page/YourLibrary/LibraryChildren/ExpertSolutions/ExpertSolutions.jsx";
import Folders from "./components/Navbar/Page/YourLibrary/LibraryChildren/Folders/Folders.jsx";
import Classes from "./components/Navbar/Page/YourLibrary/LibraryChildren/Classes/Classes.jsx";
import NewDemo from "./components/Navbar/Page/Demo/NewDemo/NewDemo.jsx";
import SeeDemo from "./components/Navbar/Page/Demo/SeeDemo/SeeDemo.jsx";

function App() {
  const [isPadded, setIsPadded] = useState(true);

  return (
    <>
      <Router>
        <Header />
        <Navbar togglePadding={() => setIsPadded(!isPadded)} />
        <Routes>
          <Route path="/" element={<MainContent isPadded={isPadded} />} />
          <Route path="/library" element={<YourLibrary isPadded={isPadded} />}>
            <Route path="/library" element={<FlashCard />} />
            <Route path="practive-tests" element={<PractiveTests />} />
            <Route path="expert-solutions" element={<ExpertSolutions />} />
            <Route path="folders" element={<Folders />} />
            <Route path="classes" element={<Classes />} />
          </Route>
          <Route path="/demo" element={<SeeDemo isPadded={isPadded} />} />
          {/* <Route path="/newfolder" element={<h1>New Folder</h1>isPadded={isPadded} } />
                    <Route path="/flashcards" element={<h1>Flashcards</h1>isPadded={isPadded} } />
                    <Route path="/expertsolutions" element={<h1>Expert Solutions</h1>isPadded={isPadded} } />    */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
