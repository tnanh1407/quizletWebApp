import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import MainLayout from "./components/Layout/MainLayout.jsx";
import FunctionLayout from "./components/Layout/FunctionLayout.jsx";
import MainContentLayout from "./components/Layout/MainContentLayout.jsx";
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
import DashBoardLayOut from "./components/Layout/DashBoardLayOut.jsx";
// import DashBoard from "./components/DashBoard/Flashcard.jsx";
// import ClassDetail from "./components/Layout/ClassDetail.jsx";
import UpgradeLayout from "./components/Layout/UpgradeLayOut.jsx";
import Annually from "./components/Header/Upgrade/ChildrenUpgrand/Annually.jsx";
import Monthly from "./components/Header/Upgrade/ChildrenUpgrand/Monthly.jsx";
import CheckOut from "./components/Header/Upgrade/ChildrenUpgrand/CheckOut/CheckOut.jsx";

import DashBoardFlashCard from "./components/DashBoard/Flashcard.jsx";
import DashBoardUsers from "./components/DashBoard/Users.jsx";
import DashBoardOverview from "./components/DashBoard/Overview.jsx";
import DashBoardComingSoon from "./components/DashBoard/ComingSoon.jsx";

import Class from "./components/Navbar/Page/ClassRoom/ClassDetail.jsx";
import LearningMaterials from "./components/Navbar/Page/ClassRoom/ClassChildren/LearningMaterials/LearningMaterials.jsx";
import Members from "./components/Navbar/Page/ClassRoom/ClassChildren/Members/Members.jsx";
import Pending from "./components/Navbar/Page/ClassRoom/ClassChildren/PendingUser/PendingUser.jsx";
import Progress from "./components/Navbar/Page/ClassRoom/ClassChildren/Progress/ProcessClass.jsx";

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
                <Route path="/class/:id/pending" element={<Pending />} />
                <Route path="/class/:id/progress" element={<Progress />} />
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
              </Route>

              <Route path="/edit-flashcard/:id" element={<EditFlashCard />} />
            </Route>
          </Route>

          <Route element={<DashBoardLayOut />}>
            <Route path="/dashboard/overview" element={<DashBoardOverview />} />
            <Route path="/dashboard/user" element={<DashBoardUsers />} />
            <Route
              path="/dashboard/comingsoon"
              element={<DashBoardComingSoon />}
            />
            <Route
              path="/dashboard/dashboardflashcard"
              element={<DashBoardFlashCard />}
            />
          </Route>

          {/* Function Flash Card - Learn - Test */}
          <Route element={<FunctionLayout />}>
            <Route path="/:id/flashcards" element={<FunctionFlashCard />} />
            <Route path="/:id/learn" element={<FunctionLearn />} />
            <Route path="/:id/test" element={<FunctionTest />} />
          </Route>
          <Route element={<UpgradeLayout />}>
            <Route path="/annually" element={<Annually />} />
            <Route path="/monthly" element={<Monthly />} />
          </Route>
          <Route path="/checkout" element={<CheckOut />} />
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
