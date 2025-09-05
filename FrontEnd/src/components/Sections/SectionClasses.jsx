import { Link } from "react-router-dom";

export default function SectionClasses(){
    return (
        <>
            <section className="sectionclasses">
                <Link>
                    <div className="main-flashcard">
                        <div className="flashcard-creator flex classes">
                            <p>0 sets</p>
                            <span className="span"></span>
                            <p>1 member</p>
                            <span className="span"></span>
                            <p>Mỏ địa chất - Hà Nội, Việt Nam</p>
                        </div>
                        <div className="nameflashcard flex">
                            <i class="fa-solid fa-people-group"></i>
                            <h1>Demo</h1>
                        </div>
                    </div>      
                </Link>
            </section>
        </>
    )
}