import { Card } from '../components/card.jsx'
import NavBar from '../components/navbar.jsx'
import Popup from '../components/popup.jsx'
import { animate, stagger, spring } from 'animejs'
import { useState, useEffect } from 'react'
import { featurePage, searchMovies } from '../scripts/ytsApi.jsx'
import '../css/home.css'

function Home() {
    const [movies, setMovies] = useState([])
    const [isPopupVisible, setIsPopupVisible] = useState(null)
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {

        featurePage().then(data => {
            setMovies(data)
            setIsLoading(false)
        })
    }, [])

    function handleSearch(query) {
        setIsLoading(true)
        const searchPromise = query ? searchMovies(query) : featurePage();

        searchPromise.then((data) => {
            setMovies(data);
            setIsLoading(false);
        })
    }
    useEffect(() => {
        if (isLoading) {
            requestAnimationFrame(() => {

                animate('.tempCard', {
                    scale: [0.6,0.95],
                    delay: stagger(80),
                    ease: spring({
                        bounce: 0.49,
                        duration: 70
                    }),
                    
                    loop:true,
                    loopDelay:100
                })
            })


        }
    }, [isLoading])



    return (
        <>
            <NavBar onSearch={handleSearch}></NavBar>

            <ul className="grid">
                {
                    isLoading ?
                        (
                            Array.from({ length: 20 }).map((_, index) => (
                                <Card classname='tempCard' key={index} details={{}} />
                            ))
                        ) : (
                            movies.map((movie) => (
                                <Card key={movie.id} setIsPopupVisible={setIsPopupVisible} details={movie} />
                            ))
                        )
                }

                {/* {movies.map((movie) => {
                    return (
                        <Card key={movie.imdb_id} setIsPopupVisible={setIsPopupVisible}  details={movie} onClick></Card>
                        
                    )
                })} */}
            </ul>

            {isPopupVisible && (
                <Popup
                    setIsPopupVisible={setIsPopupVisible}
                    movieInfo={isPopupVisible}
                    closePopup={() => setIsPopupVisible(null)}
                />
            )}
        </>
    )
}

export default Home