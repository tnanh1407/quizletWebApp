import sach from "../../../../../../assets/img/imgSach.jpg"
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ExpertSolutions (){
    const [isFilterExpertSolutions, setIsFilterExpertSolutions] = useState(false);
    
    const toggleFilterExpertSolutions = () => {
        setIsFilterExpertSolutions(!isFilterExpertSolutions);
    };    
    return(
        <div className="flashcard-set">
            <div className="flashcardsearch">
                <div className="flashcard-option">
                    <button className="flex" onClick={toggleFilterExpertSolutions}>
                        <p>All</p>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <div className={`expertsolution ${isFilterExpertSolutions ? "block" : "hidden"}`}>
                                <div className="folder-option">
                                    <Link href="">
                                        <div className="setting-item flex">
                                            <p>All</p>
                                        </div>
                                    </Link>
                                    <Link href="">
                                        <div className="setting-item flex">
                                            <p>Textbooks</p>
                                        </div>
                                    </Link>
                                    <Link href="">
                                        <div className="setting-item flex">
                                            <p>Expert solutions</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                    </button>
                </div>
                <div className="flashcard-search flex">
                    <input type="text" placeholder="Filter" className="input-research input-research-flashcard"/>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <div className="expert-solutions">
                                        <a href="">
                                            <div className="popular-session flex all-section">
                                                <img src={sach} alt=""/>
                                                <div className="popular-session-content">
                                                    <h1>English Grammar in Use</h1>
                                                    <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                                    <div className="popular-session-solution flex">
                                                        <i className="fa-solid fa-thumbs-up"></i>
                                                        <p>999 solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="">
                                            <div className="popular-session flex all-section">
                                                <img src={sach} alt=""/>
                                                <div className="popular-session-content">
                                                    <h1>English Grammar in Use</h1>
                                                    <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                                    <div className="popular-session-solution flex">
                                                        <i className="fa-solid fa-thumbs-up"></i>
                                                        <p>999 solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="">
                                            <div className="popular-session flex all-section">
                                                <img src={sach} alt=""/>
                                                <div className="popular-session-content">
                                                    <h1>English Grammar in Use</h1>
                                                    <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                                    <div className="popular-session-solution flex">
                                                        <i className="fa-solid fa-thumbs-up"></i>
                                                        <p>999 solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="">
                                            <div className="popular-session flex all-section">
                                                <img src={sach} alt=""/>
                                                <div className="popular-session-content">
                                                    <h1>English Grammar in Use</h1>
                                                    <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                                    <div className="popular-session-solution flex">
                                                        <i className="fa-solid fa-thumbs-up"></i>
                                                        <p>999 solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="">
                                            <div className="popular-session flex all-section">
                                                <img src={sach} alt=""/>
                                                <div className="popular-session-content">
                                                    <h1>English Grammar in Use</h1>
                                                    <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                                    <div className="popular-session-solution flex">
                                                        <i className="fa-solid fa-thumbs-up"></i>
                                                        <p>999 solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="">
                                            <div className="popular-session flex all-section">
                                                <img src={sach} alt=""/>
                                                <div className="popular-session-content">
                                                    <h1>English Grammar in Use</h1>
                                                    <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                                    <div className="popular-session-solution flex">
                                                        <i className="fa-solid fa-thumbs-up"></i>
                                                        <p>999 solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
        </div>
    )
}