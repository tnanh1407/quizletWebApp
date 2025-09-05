import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "./components/Header/CssHeader.css";
import "./components/Navbar/CssNavbar.css";
import "./components/MainContent/CssMainContent.css";
import "./components/Footer/CssFooter.css";
import "./components/Navbar/Page/Demo/NewDemo/CssNewDemo.css";
import "./components/Navbar/Page/Demo/SeeDemo/CssSeeDemo.css";
import "./components/Navbar/Page/Demo/SeeDemo/Items/CssItemsSeeDemo.css";
import "./components/Navbar/Page/YourLibrary/CssYourLibrary.css";
import "./components/Navbar/Page/FlashCards/CssFlashCards.css";
import "./components/FlashCardItems/CssFlashCard.css";
import "./components/SettingAccount/CssSettingAccount.css";
import "./components/Navbar/Page/YourLibrary/LibraryChildren/Classes/CssClasses.css";
import "./components/Navbar/Page/YourLibrary/LibraryChildren/ExpertSolution/CssExpertSolution.css";
import "./components/Navbar/Page/YourLibrary/LibraryChildren/FlashCard/CssFlashCard.css";
import "./components/Navbar/Page/YourLibrary/LibraryChildren/Folders/CssFolders.css";
import "./components/Navbar/Page/YourLibrary/LibraryChildren/PracticeTests/CssPracticeTests.css";
import Header from "./components/Header/Header.jsx";
import MainContent from "./components/MainContent/MainContent.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import YourLibrary from "./components/Navbar/Page/YourLibrary/YourLibrary.jsx";
import FlashCardSet from "./components/Navbar/Page/YourLibrary/LibraryChildren/FlashCard/FlashCard.jsx";
import PractiveTests from "./components/Navbar/Page/YourLibrary/LibraryChildren/PracticeTests/PracticeTests.jsx";
import ExpertSolution from "./components/Navbar/Page/YourLibrary/LibraryChildren/ExpertSolution/ExpertSolution.jsx";
import Folders from "./components/Navbar/Page/YourLibrary/LibraryChildren/Folders/Folders.jsx";
import Classes from "./components/Navbar/Page/YourLibrary/LibraryChildren/Classes/Classes.jsx";
import NewDemo from "./components/Navbar/Page/Demo/NewDemo/NewDemo.jsx";
import SeeDemo from "./components/Navbar/Page/Demo/SeeDemo/SeeDemo.jsx";
import FlashCards from "./components/Navbar/Page/FlashCards/FlashCards.jsx";
import ExpertSolutions from "./components/Navbar/Page/ExpertSolution/ExpertSolutions.jsx";
import FlashCard from "./components/FlashCardItems/FlashCard.jsx";
import SettingAccount from "./components/SettingAccount/SettingAccount.jsx";

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
            <Route path="/library" element={<FlashCardSet />} />
            <Route path="practive-tests" element={<PractiveTests />} />
            <Route path="expert-solution" element={<ExpertSolution />} />
            <Route path="folders" element={<Folders />} />
            <Route path="classes" element={<Classes />} />
          </Route>
          <Route path="/demo" element={<SeeDemo isPadded={isPadded} />} />
          <Route
            path="/flashcards"
            element={<FlashCards isPadded={isPadded} />}
          />
          <Route
            path="/expert-solutions"
            element={<ExpertSolutions isPadded={isPadded} />}
          />
          <Route
            path="/itemflashcard"
            element={<FlashCard isPadded={isPadded} />}
          />
          <Route
            path="/settingaccount"
            element={<SettingAccount isPadded={isPadded} />}
          />
          {/* <Route
            path="/flashcard/:idflashcard"
            element={<FlashCard isPadded={isPadded} />}
          /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
