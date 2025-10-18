import {useState} from 'react'
import '../css/navbar.css'
import { Link } from 'react-router-dom';




function NavBar({ onSearch }) {

    const [query, setQuery] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        onSearch(query);
    }
    return (
        <div className="navbar">

            <div className="logo">
                <Link to='/'>
                    <img src="myLogo.svg" alt="logo" id='LOGO' />
                </Link>
            </div>

            <div className="links">
                <Link to='/'>Home</Link>
                <Link to='/details'>Details</Link>

            </div>



            <div className="search">
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} />
                </form>
            </div>
        </div>


    )
}
export default NavBar