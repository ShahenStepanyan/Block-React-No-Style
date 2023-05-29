import React from 'react';

const Pagination = ({postPerPage, totalPost, paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i < Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div>
            <ul style={{display: 'inline'}}>
                {
                    pageNumbers.map(number => (
                        <li  style={{display: 'inline', marginRight: '20px'} } key={number}>
                            <a  onClick={() => paginate(number)}>
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;