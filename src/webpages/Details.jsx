import '../css/Details.css'
import { detailsPage } from '../scripts/ytsApi'
import {useState,useEffect} from 'react'


function Details({ movieID }) {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if (movieID) {
            detailsPage(movieID).then((data) => setDetails(data));
        }
    }, [movieID]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="main">
                <div className="details_image">
                    <img src={details.large_cover_image} alt="img" />
                </div>
                <div className="details_text">
                    <h2 className="title">{details.title_english}</h2>
                    <h2 className='year'>{details.year}</h2>
                    {details.genres && <h2 className="genres">{details.genres.join('/')}</h2>}
                    <h3>IMDB Rating: </h3><h3>{details.rating}</h3>
                </div>
            </div>
        </>
    );
}
export default Details