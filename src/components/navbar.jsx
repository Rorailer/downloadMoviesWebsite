import { useState } from 'react'
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

            <div className="logo" style={{cursor:'pointer'}}>

                <img src="myLogo.svg" alt="logo" id='LOGO' onClick={() => window.location.reload()} />

            </div>

            <div className="links">
                <Link className='text-in-links' to='/'>Home</Link>
                <Link className='text-in-links' to='/details'>Details</Link>

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