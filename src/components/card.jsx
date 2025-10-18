import '../css/card.css'
import { useEffect, useState, useRef } from 'react'
import { animate, cubicBezier } from 'animejs'

export function Card({ details , setIsPopupVisible , classname = '' }) {
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    
    

    const cardBoxRef = useRef(null);

    


    async function handleClick() {

        setIsPopupVisible(details)

    }


    


    let isNameLong = false;
    let title = ""
    if (details.title_english && details.title_english.length > 20) {
        isNameLong = true;
        title = details.title_english.slice(0, 20) + "..."
    }


    useEffect(() => {


        
        const img = new Image()
        img.src = details.medium_cover_image;
        img.onload = () => {
            setIsImageLoaded(true)
        }
    }, [details.medium_cover_image])



    useEffect(() => {
        if (isImageLoaded && cardBoxRef.current) {
            animate(cardBoxRef.current, {
                scale: [0.8, 1],
                duration: 100,
                ease: cubicBezier(0.5, 0, 0.9, 0.3)
            })
        }
    }, [isImageLoaded]);
   




    if (!isImageLoaded) {
        return (
            <><div className={classname}>

                <div className="Box">
                    <div className="image">
                        <img src='loading_image.svg' alt="image" className='placeholder-image' />

                    </div>
                    <div className="title">
                        <h3 className="name"> </h3>
                        <h5 className="year"> </h5>
                        <h5 className=' '> </h5>
                    </div>

                </div>

            </div>
            </>)
    } else {
        return (
            <>

                <div className="Box" ref={cardBoxRef} onClick={handleClick}>
                    <div className="image">
                        <img src={details.medium_cover_image} alt="image" />
                        <div className="overlay">
                            <h3 className="rating">{details.rating}/10</h3>
                            {details.genres.map((genre, index) => (
                                <h3 key={index} className="genres">{genre}</h3>
                            ))}
                        </div>


                    </div>
                    <div className="title">
                        <h3 className="name">{isNameLong ? title : details.title_english}</h3>
                        <h5 className="year">{details.year}</h5>
                        <h5 className='lang'>{details.language}</h5>
                    </div>

                </div>


                
            </>
        )
    }
}