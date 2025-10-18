import '../css/pagination.css'

function Pagination({ nPages, currentPage, changePage }) {
    return (<>
        {nPages > 1 && (
            <div className="pages">
                <ul style={{ listStyle: 'none' }}>

                    {Array.from({ length: nPages > 10 ? (10) : (nPages) }).map((_, index) => {
                        if (nPages > 10 && index === 9) {
                            return <button key={index} className='pagesButton' id={index + 1}>...</button>
                        } else {
                            if (currentPage === index + 1) {
                                return <button key={index} className='pagesButton' id='CurrentPage' >{index + 1}</button>

                            } else {
                                return <button key={index} className='pagesButton' id={index + 1} onClick={() => changePage(index + 1)}>{index + 1}</button>
                            }
                        }
                    })

                    }

                </ul>
            </div>
        )}
    </>)
}

export default Pagination