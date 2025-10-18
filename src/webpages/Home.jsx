import { Card } from '../components/card.jsx'
import NavBar from '../components/navbar.jsx'
import Popup from '../components/popup.jsx'
import { animate, stagger, spring } from 'animejs'
import { useState, useEffect } from 'react'
import { featurePage, searchMovies } from '../scripts/ytsApi.jsx'
import Pagination from '../components/pagination.jsx'
import '../css/home.css'

function Home() {
    // States for managing movies, Pagination, popup visibility, and loading status
    const [movies, setMovies] = useState([])
    const [nPages, setNPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [isPopupVisible, setIsPopupVisible] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSearchResult, setIsSearchResult] = useState("")


    // This useEffect fetches the featured movies when the component mounts
    useEffect(() => {
        featurePage().then(data => {
            setMovies(data.movies)
            setNPages(Math.ceil(data.movie_count / 50))
            setCurrentPage(1)
            setIsSearchResult("")
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [movies]);


    // This function handles movie searches
    function handleSearch(query) {
        setIsLoading(true)
        const searchPromise = query ? searchMovies(query) : featurePage();
        
        
        if(!!query){
            setIsSearchResult(query);
            console.log(`Inside HandleSearch() setting isSearchResutl to the query term: ${query}`)
        }


        searchPromise.then((data) => {
            setNPages(Math.ceil(data.movie_count/50))
            setCurrentPage(1)
            console.log(`inside searchPromise.then of handleSearch the nPages are set to ${nPages}`)
            setMovies(data.movies);
            setIsLoading(false);
        })
    }


    // This function handles changing pages
    function changePage(page) {
        setCurrentPage(page)
        setIsLoading(true)
        let searchPromise;
        if(!isSearchResult){
            searchPromise = featurePage(page)
        }else{
            searchPromise = searchMovies(isSearchResult , page)
            console.log(`isSearchResult was just set to ${isSearchResult} (Read this inside changePage) and the page number is ${page}`)
        }

        searchPromise.then((data) => {
            setMovies(data.movies);
            setIsLoading(false);
        })

    }





    // This useEffect handles the loading animation for cards    
    useEffect(() => {
        if (isLoading) {
            requestAnimationFrame(() => {

                animate('.tempCard', {
                    scale: [0.6, 0.95],
                    delay: stagger(80),
                    ease: spring({
                        bounce: 0.49,
                        duration: 70
                    }),

                    loop: true,
                    loopDelay: 100
                })
            })


        }
    }, [isLoading])


    // This is the main render method for the Home component
    return (
        <>
            {/* Navigation bar with search functionality */}
            <NavBar onSearch={handleSearch} ></NavBar>
            <div className="spacer"></div>
            {/* Pagination controls */}
            <Pagination nPages={nPages} currentPage={currentPage} changePage={changePage}></Pagination>

            {/* Grid to display movie cards */}
            <ul className="grid">
                {
                    // Display loading cards while fetching data
                    isLoading ?
                        (
                            Array.from({ length: 20 }).map((_, index) => (
                                <Card classname='tempCard' key={index} details={{}} />
                            ))
                        ) : (
                            // Display movie cards when data is loaded
                            movies.map((movie) => (
                                <Card key={movie.id} setIsPopupVisible={setIsPopupVisible} details={movie} />
                            ))
                        )
                }
            </ul>

            {/* Popup for displaying movie details */}
            {isPopupVisible && (
                <Popup
                    setIsPopupVisible={setIsPopupVisible}
                    movieInfo={isPopupVisible}
                    closePopup={() => setIsPopupVisible(null)}
                />
            )}

            {/* Pagination controls */}
            <Pagination nPages={nPages} currentPage={currentPage} changePage={changePage}></Pagination>



        </>
    )
} export default Home