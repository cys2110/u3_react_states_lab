import { Link } from "react-router-dom";

export default function Header (props) {
    return (
        <div className="header">
            
            <div className="dropdown">
                <Link to="/">List of States</Link>
                <div className="dropdown-content">
                    {
                        props.states.map((state) => (
                            <Link key={state.abbreviation} className="states-links" to={`/${state.name}`}>{state.name}</Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}