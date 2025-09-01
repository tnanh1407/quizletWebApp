import { Link, Outlet } from "react-router-dom";

export default function Demo({isPadded}){
    return (
        <div className="main flex" style={{ paddingLeft: isPadded ? "200px" : "20px" }}>
            <div className="maincontent">
                <div className="main-content">
                    <div className="main-content-library">
                        <h1>Demo</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}