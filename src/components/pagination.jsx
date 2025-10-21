import '../css/pagination.css'
import { useState, useEffect } from 'react'

function Pagination({ nPages, currentPage, changePage }) {
    function getPageButtons() {
        let buttons = [];
        if (nPages <= 10) {
            for (let i = 1; i <= nPages; i++) {
                buttons.push(i);
            }
        } else {
            if (currentPage < 6) {
                for (let i = 1; i <= 9; i++) {
                    buttons.push(i);
                }
                buttons.push('...');
                buttons.push(nPages);
            } else if (currentPage > nPages - 5) {
                buttons.push(1);
                buttons.push('...');
                for (let i = nPages - 8; i <= nPages; i++) {
                    if (i > 1) buttons.push(i);
                }
            } else {
                buttons.push(1);
                buttons.push('...');
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    buttons.push(i);
                }
                buttons.push('...');
                buttons.push(nPages);
            }
        }
        return buttons;
    }


    return (
        <div className="pages">
            <ul style={{ listStyle: 'none' }}>
                {nPages > 1 && !(document.documentElement.clientWidth <= 1000) && (
                    getPageButtons().map((page, index) => {
                        if (page === '...') {
                            return <button key={index} className='pagesButton' disabled>...</button>;
                        }
                        if (page === currentPage) {
                            return <button key={index} className='pagesButton' id='CurrentPage'>{page}</button>;
                        }
                        return <button key={index} className='pagesButton' id={page} onClick={() => changePage(page)}>{page}</button>;
                    })
                )}

                {nPages > 1 && document.documentElement.clientWidth <= 1000 && (
                    <div className='mobileView'>
                        {currentPage > 1 && (<button className='back' onClick={() => changePage(currentPage - 1)}>back</button>)}
                        <button className='page_number'>Page {currentPage}</button>
                        {currentPage !== nPages && (<button onClick={() => changePage(currentPage + 1)}>Next</button>)}
                    </div>
                )}
            </ul>
        </div>
    );
}

    export default Pagination