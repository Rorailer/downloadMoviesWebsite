import '../css/popup.css';
import { useState, useEffect, useRef } from 'react'
import { sendToN8nWebhook } from '../scripts/torrentApi'
import { animate, cubicBezier, irregular } from 'animejs'







export function Popup({ movieInfo, setIsPopupVisible }) {

    const [magnet, setMagnet] = useState([])
    const popupRef = useRef(null)
    const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false)
    const [imgSrc, setImgSrc] = useState(movieInfo.background_image)




    function handleDownload(quality) {
        const torrent = movieInfo.torrents.find(torrent => torrent.quality === quality)
        if (torrent) {
            setMagnet([torrent.url, movieInfo.title_long])
        } else {
            console.warn(`${quality} torrent not found for ${movieInfo.title_english}`);
        }
    }

    useEffect(() => {
        requestAnimationFrame(() => {

            animate(popupRef.current, {
                scale: [0.1, 1],
                duration: 100,
                ease: cubicBezier(0.5, 0, 0.9, 0.3)
            })
            animate('#Loading_icon', {
                rotate: 360,
                duration: 1000,
                ease: irregular(10, 0.5)
            });

        })

    }, [])


    useEffect(()=>{
        function handleResize(){
            const newSrc = window.innerWidth>800 ? (movieInfo.background_image):(movieInfo.large_cover_image);
            
            if(newSrc !== imgSrc){
                setImgSrc(newSrc)
            }
        };

        handleResize();

        window.addEventListener('resize',handleResize);

        return() => {
            window.removeEventListener('resize', handleResize)
        }
    }, [movieInfo.background_image, movieInfo.large_cover_image, imgSrc])




    useEffect(()=>{
        if(!imgSrc){
            setIsBackgroundLoaded(false);
            return;
        }

        setIsBackgroundLoaded(false)
        const img = new Image()
        img.src = imgSrc;
        img.onload = () => {
            setIsBackgroundLoaded(true)}
    },[imgSrc])


    useEffect(()=>{
        function handleKeyDown(e){
            if(e.key === 'Escape'){
                closePopup();
            }
            
        };

        document.addEventListener('keydown', handleKeyDown);

        return()=>{
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [])






    useEffect(() => {
        if (magnet.length > 0) {
            sendToN8nWebhook(magnet);
            setMagnet([])
        }
    }, [magnet])


    function closePopup(){
        // console.log('closed')
        requestAnimationFrame(()=>{
            animate(popupRef.current,{
                scale:[1,0.3],
                duration:100,
                ease: cubicBezier(0.5, 0, 0.9, 0.3),
                onComplete: ()=> setIsPopupVisible(null)

            })

        })
        
    }


    return (
        <div
            ref={popupRef}
            className="popup"
            style={{
                '--bg-image': isBackgroundLoaded ? `url(${imgSrc})` : 'url(/imag_placeholder.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: "90% 90%"
            }}
            
            >

            {!movieInfo.title_english && (

                <div className="Loading_text">
                    <img src="loading_icon.svg" alt="img" id='Loading_icon' />
                    <p>Loading</p>
                </div>

            )}
            {movieInfo.title_english && (<div className="movieInfo_text">
                <h2 className="title">{movieInfo.title_english}</h2>
                <h2 className="year">{movieInfo.year}</h2>
                <h2 className="genres">{movieInfo.genres.join('/')}</h2>
                <p>{!movieInfo.description_intro ? ("No Summary") : movieInfo.description_intro}</p>


                <div className="video-container">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${movieInfo.yt_trailer_code}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow=""
                        allowFullScreen
                    ></iframe>
                </div>

            </div>)}
            <div id='download'>

                <button className='1080p' onClick={(e) => { e.stopPropagation(); handleDownload('1080p'); closePopup() }}>1080p</button>
                <button className='720p' onClick={(e) => { e.stopPropagation(); handleDownload('720p'); closePopup()}}>720p</button>
            </div>


            <button className='Close' onClick={() => closePopup()} >close</button>
        </div>
    )
}


export default Popup