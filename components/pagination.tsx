import React from "react";

const Pagination = ({postPerpage, totalPage, paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPage/postPerpage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <ul className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {pageNumbers.map((number) => {
                    return(
                        <li className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            <a onClick={() => paginate(number)}>{number}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Pagination;