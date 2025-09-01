import SectionFolder from "../../../Sections/SectionFolder.jsx"

export default function Folders (){
    return(
        <>
        <div className="flashcardsearch">
            <div className="flashcard-option">
                <button className="flex">
                    <p>Created</p>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </div>
        <SectionFolder/>
        <SectionFolder/>
        <SectionFolder/>
        </>
    )
}