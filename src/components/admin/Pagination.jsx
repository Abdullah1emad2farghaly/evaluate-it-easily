import React from 'react'

const getPages = (current, total) => {
    const pages = [];
    if (total <= 5) {
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
    } else {
        if (current <= 3) {
            pages.push(1, 2, 3, '...', total);
        } else if (current >= total - 2) {
            pages.push(1, '...', total - 2, total - 1, total)
        } else {
            pages.push(1, '...', current - 1, current, current + 1, '...', total)
        }
    }
    return pages;
}
const Pagination = ({ page, pageHandler, dynamicPage }) => {

    return (
        <div className='flex justify-center' >
            <div className='mt-10 flex items-center gap-3'>
                <button
                    disabled={page === 1}
                    onClick={() => {
                        pageHandler(page - 1)
                        window.scrollTo(0, 0)
                    }}
                    className={
                        `${page === 1 ? "bg-green-400 cursor-not-allowed" : "bg-green-500 cursor-pointer"} 
                    text-white px-3 py-1 rounded-md`
                    }
                >Prev</button>
                <div>
                    {
                    getPages(page, dynamicPage).map((item, index) => {
                        return (
                            <span
                                key={index}
                                onClick={() => typeof item === 'number' && pageHandler(item)}
                                className={`cursor-pointer mx-1 p-0 ${item === page ? 'font-bold text-green-600' : ""} `}
                            >
                                {item}
                            </span>
                        )
                    })
                }
                </div>

                <button
                    disabled={page === dynamicPage}
                    className={`
                    ${page === dynamicPage ? "bg-green-400 cursor-not-allowed" : "bg-green-500 cursor-pointer"} 
                    text-white px-3 py-1 rounded-md`
                    }
                    onClick={() => {
                        pageHandler(page + 1)
                        window.scrollTo(0, 0)
                    }}
                >Next</button>
            </div>
        </div>
    )
}

export default React.memo(Pagination)