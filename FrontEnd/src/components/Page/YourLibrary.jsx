import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from '../Footer/Footer.jsx'

export default function YourLibrary({isPadded}){
    const [activeContentItem, setActiveContentItem] = useState("flashcard");
            // const location = useLocation(); 
    const handleActiveContent = (item) => {
        setActiveContentItem(item);
    };
    return (
        <div className="main flex" style={{ paddingLeft: isPadded ? "200px" : "20px" }}>
            <div className="maincontent">
                <div className="main-content">
                    <div className="main-content-library">
                        <h1>Your library</h1>
                        <menu className="main-content-items flex">
                            <Link to="/library" onClick={()=> handleActiveContent("flashcard")}>
                                <div className={`items ${activeContentItem === "flashcard" ? "active-items" : ""}`}>
                                    <p>Flashcard set</p>
                                </div>
                            </Link>
                            <Link to="practive-tests" onClick={()=> handleActiveContent("practive-tests")}>
                                <div className={`items ${activeContentItem === "practive-tests" ? "active-items" : ""}`}>
                                    <p>Practice Tests</p>
                                </div>
                            </Link>
                            <Link to="expert-solutions" onClick={()=> handleActiveContent("expert-solutions")}>
                                <div className={`items ${activeContentItem === "expert-solutions" ? "active-items" : ""}`}>
                                    <p>Expert solutions</p>
                                </div>
                            </Link>
                            <Link to="folders" onClick={()=> handleActiveContent("folders")}>
                                <div className={`items ${activeContentItem === "folders" ? "active-items" : ""}`}>
                                    <p>Folders</p>
                                </div>
                            </Link>
                            <Link to="classes" onClick={()=> handleActiveContent("classes")}>
                                <div className={`items ${activeContentItem === "classes" ? "active-items" : ""}`}>
                                    <p>Classes</p>
                                </div>
                            </Link>
                        </menu>
                    </div>
                    <div className="out-let">
                        <Outlet /> 
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}