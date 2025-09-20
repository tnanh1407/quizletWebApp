import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import MainLayout from "./components/Layout/MainLayout.jsx";
import FunctionLayout from "./components/Layout/FunctionLayout.jsx";
import MainContent from "./components/MainContent/MainContent.jsx";
import FlashCards from "./components/Navbar/Page/NewFlashCards/FlashCards.jsx";
import YourProfile from "./components/Navbar/Page/YourProfile/YourProfile.jsx";
import FlashCardItem from "./components/FlashCardItems/FlashCard.jsx";
import SettingAccount from "./components/SettingAccount/SettingAccount.jsx";
import Achievements from "./components/SettingAccount/Achievements/Achievements.jsx";
import SectionCreators from "./components/Sections/SectionCreators/SectionCreators.jsx";
import Classroom from "./components/Navbar/Page/ClassRoom/SectionClass.jsx";
import CreateClass from "./components/Navbar/Page/NewClassRoom/CreateClass.jsx";
import EditFlashCard from "./components/FlashCardItems/EditFlashCards/EditFlashCard.jsx";
import NewFolder from "./components/Navbar/Page/NewFolder/NewFolder.jsx";
import FlashCard from "./components/Navbar/Page/FlashCard/FlashCard.jsx";
import Folder from "./components/Navbar/Page/Folder/Folder.jsx";
import FunctionFlashCard from "./components/FlashCardItems/FunctionFlashCard/FlashCard/FunctionFlashCard.jsx";
import FunctionLearn from "./components/FlashCardItems/FunctionFlashCard/Learn/FunctionLearn.jsx";
import FunctionTest from "./components/FlashCardItems/FunctionFlashCard/Test/FunctionTest.jsx";

function App() {
  const [isPadded, setIsPadded] = useState(true);
  return (
    <>
      <Router>
        <Routes>
          <Route
            element={
              <MainLayout togglePadding={() => setIsPadded(!isPadded)} />
            }
          >
            <Route path="/" element={<MainContent isPadded={isPadded} />} />
            <Route
              path="/your-profile"
              element={<YourProfile isPadded={isPadded} />}
            />

            {/* Route Setting */}

            <Route
              path="/settingaccount"
              element={<SettingAccount isPadded={isPadded} />}
            />
            <Route
              path="/achievements"
              element={<Achievements isPadded={isPadded} />}
            />

            {/* Route Your library  */}

            <Route
              path="/your-flashcard"
              element={<FlashCard isPadded={isPadded} />}
            />
            <Route
              path="/your-folder"
              element={<Folder isPadded={isPadded} />}
            />
            <Route
              path="/your-classroom"
              element={<Classroom isPadded={isPadded} />}
            />

            {/* Route Create New */}

            <Route
              path="/create/new-flashcard"
              element={<FlashCards isPadded={isPadded} />}
            />
            <Route
              path="/create/new-folder"
              element={<NewFolder isPadded={isPadded} />}
            />
            <Route
              path="/create/new-classroom"
              element={<CreateClass isPadded={isPadded} />}
            />

            {/* <Route path="/demo" element={<SeeDemo isPadded={isPadded} />} /> */}

            <Route
              path="/itemflashcard/:id"
              element={<FlashCardItem isPadded={isPadded} />}
            />
            <Route
              path="/class-item/:id"
              element={<Achievements isPadded={isPadded} />}
            />
            <Route
              path="/creators"
              element={<SectionCreators isPadded={isPadded} />}
            />
            <Route
              path="/edit-flashcard/:id"
              element={<EditFlashCard isPadded={isPadded} />}
            />
          </Route>

          {/* Function Flash Card - Learn - Test */}
          <Route element={<FunctionLayout />}>
            <Route path="/:id/flashcards" element={<FunctionFlashCard />} />
            <Route path="/:id/learn" element={<FunctionLearn />} />
            <Route path="/:id/test" element={<FunctionTest />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
