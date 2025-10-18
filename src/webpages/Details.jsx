import '../css/Details.css'
import NavBar from '../components/navbar';



function Details() {
   

    function handleSearch(query) {
        // You can implement search logic here if needed
        console.log("Search query:", query);
    }

    return (
        <>
            <NavBar onSearch={handleSearch}></NavBar>
            
        </>
    );
}
export default Details