import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import MainLayout from "./components/Layout/MainLayout.jsx";
import FunctionLayout from "./components/Layout/FunctionLayout.jsx";
import MainContentLayout from "./components/Layout/MainContentLayOut.jsx";
import Home from "./components/Navbar/Page/Home/Home.jsx";
import FlashCards from "./components/Navbar/Page/NewFlashCards/FlashCards.jsx";

// import YourProfile from "./components/Navbar/Page/YourProfile/YourProfile.jsx";
import FlashCardItem from "./components/FlashCardItems/FlashCard.jsx";
import SettingAccount from "./components/SettingAccount/SettingAccount.jsx";
import Achievements from "./components/SettingAccount/Achievements/Achievements.jsx";
import SectionCreators from "./components/Sections/SectionCreators/SectionCreators.jsx";
// import Classroom from "./components/Navbar/Page/ClassRoom/SectionClass.jsx";
import CreateClass from "./components/Navbar/Page/NewClassRoom/CreateClass.jsx";
import EditFlashCard from "./components/FlashCardItems/EditFlashCards/EditFlashCard.jsx";
import NewFolder from "./components/Navbar/Page/NewFolder/NewFolder.jsx";
import FlashCard from "./components/Navbar/Page/FlashCard/FlashCard.jsx";
import Folder from "./components/Navbar/Page/Folder/Folder.jsx";
import FunctionFlashCard from "./components/FlashCardItems/FunctionFlashCard/FlashCard/FunctionFlashCard.jsx";
import FunctionLearn from "./components/FlashCardItems/FunctionFlashCard/Learn/FunctionLearn.jsx";
import FunctionTest from "./components/FlashCardItems/FunctionFlashCard/Test/FunctionTest.jsx";
import SignLayOut from "./SignUp-SignIn/Sign-Layout.jsx";
import SignIn from "./SignUp-SignIn/SignIn/SignIn.jsx";
import SignUp from "./SignUp-SignIn/SignUp/SignUp.jsx";
import Classes from "./components/Sections/SectionCreators/pageCreators/Classes.jsx";
import Folders from "./components/Sections/SectionCreators/pageCreators/Folder.jsx";
import Subjects from "./components/Sections/SectionCreators/pageCreators/Subjects.jsx";
import Tests from "./components/Sections/SectionCreators/pageCreators/Tests.jsx";
import YourLibrary from "./components/Navbar/Page/YourLibrary/YourLibrary.jsx";
import YourClasses from "./components/Navbar/Page/YourLibrary/LibraryChildren/Classes/Classes.jsx";
import YourFlashCard from "./components/Navbar/Page/YourLibrary/LibraryChildren/FlashCard/FlashCard.jsx";
import YourFolders from "./components/Navbar/Page/YourLibrary/LibraryChildren/Folders/Folders.jsx";
import YourPractiveTests from "./components/Navbar/Page/YourLibrary/LibraryChildren/PracticeTests/PracticeTests.jsx";
import PrivateRoute from "./logic/PrivateRoute.jsx";
import Search from "./components/Search/Search.jsx";
import AllResults from "./components/Search/AllResults/AllResults.jsx";
import SearchClasses from "./components/Search/SearchClasses/SearchClasses.jsx";
import SearchFlashcard from "./components/Search/SearchFlashcard/SearchFlashcard.jsx";
import SearchUsers from "./components/Search/SearchUsers/SearchUsers.jsx";
import SearchTextboxs from "./components/Search/SearchTextbox/SearchTextbox.jsx"
import SearchPracticeCards from "./components/Search/Practice Card/SearchPracticeCard.jsx";
import SearchQuestions from "./components/Search/SearchQuestion/Question.jsx";
import DashBoardLayOut from "./components/Layout/DashBoardLayOut.jsx";
import DashBoard from "./components/DashBoard/DashBoard.jsx";
// import ClassDetail from "./components/Layout/ClassDetail.jsx";
import Class from "./components/Navbar/Page/ClassRoom/ClassDetail.jsx";
import LearningMaterials from "./components/Navbar/Page/ClassRoom/ClassChildren/LearningMaterials/LearningMaterials.jsx";
import Members from "./components/Navbar/Page/ClassRoom/ClassChildren/Members/Members.jsx";

function App() {
  const [isPadded, setIsPadded] = useState(true);
  const [isAddFlashCard, setIsAddFlashCard] = useState(true);

  return (
    <>
      <Router>
        <Routes>
          <Route
            element={
              <MainLayout
                togglePadding={() => setIsPadded(!isPadded)}
                toggleAddFlashCard={() => setIsAddFlashCard(!isAddFlashCard)}
              />
            }
          >
            <Route element={<MainContentLayout isPadded={isPadded} />}>
              <Route path="/" element={<Home />} />
              <Route element={<YourLibrary />}>
                <Route
                  path="/your-library/flashcards"
                  element={<YourFlashCard />}
                />
                <Route path="/your-library/folders" element={<YourFolders />} />
                <Route path="/your-library/classes" element={<YourClasses />} />
                <Route
                  path="/your-library/test"
                  element={<YourPractiveTests />}
                />
              </Route>

              {/* Creator */}

              <Route element={<YourLibrary />}>
                <Route
                  path="/creator/:id/flashcards"
                  element={<YourFlashCard />}
                />
                <Route path="/creator/:id/folders" element={<YourFolders />} />
                <Route path="/creator/:id/classes" element={<YourClasses />} />
                <Route
                  path="/creator/:id/test"
                  element={<YourPractiveTests />}
                />
              </Route>

              {/* Route Setting */}

              <Route path="/settingaccount" element={<SettingAccount />} />
              <Route path="/achievements" element={<Achievements />} />

              {/*  */}
              {/* <Route path="/class-detail" element={<ClassDetail />}></Route */}

              <Route element={<Class />}>
                <Route
                  path="/class/:id/material"
                  element={<LearningMaterials />}
                />
                <Route path="/class/:id/member" element={<Members />} />
              </Route>
              {/* Route Your library  */}

              {/* <Route path="/your-flashcard" element={<FlashCard />} />
              <Route path="/your-folder" element={<Folder />} />
              <Route path="/your-classroom" element={<Classroom />} /> */}

              {/* Route Create New */}

              <Route path="/create/new-flashcard" element={<FlashCards />} />
              <Route path="/folder/:id" element={<NewFolder />} />
              <Route path="/create/new-classroom" element={<CreateClass />} />

              <Route path="/itemflashcard/:id" element={<FlashCardItem />} />
              <Route path="/class-item/:id" element={<Achievements />} />
              <Route element={<SectionCreators />}>
                <Route path="/creator/tests" element={<Tests />} />
                <Route path="/creator/subjects" element={<Subjects />} />
                <Route path="/creator/folders" element={<Folders />} />
                <Route path="/creator/classes" element={<Classes />} />
              </Route>
              <Route element={<Search />}>
                <Route path="/search/allresults" element={<AllResults />} />
                <Route path="/search/classes" element={<SearchClasses />} />
                <Route path="/search/flashcard" element={<SearchFlashcard />} />
                <Route path="/search/user" element={<SearchUsers />} />
                <Route path="/search/Textbox" element={<SearchTextboxs />} />
                <Route path="/search/PracticeCard" element={<SearchPracticeCards />} />
                <Route path="/search/Question" element={<SearchQuestions />} />
              </Route>

              <Route path="/edit-flashcard/:id" element={<EditFlashCard />} />
            </Route>
          </Route>

          <Route element={<DashBoardLayOut />}>
            {/* <Route path="/dashboard/flashcard" element={<DashBoardFlash />} /> */}
            <Route path="/dashboard/comingsoon" element={<NewFolder />} />
            <Route path="/dashboard" element={<CreateClass />} />
          </Route>

          {/* Function Flash Card - Learn - Test */}
          <Route element={<FunctionLayout />}>
            <Route path="/:id/flashcards" element={<FunctionFlashCard />} />
            <Route path="/:id/learn" element={<FunctionLearn />} />
            <Route path="/:id/test" element={<FunctionTest />} />
          </Route>
          <Route element={<SignLayOut />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
