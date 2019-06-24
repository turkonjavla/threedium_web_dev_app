import React, { Fragment } from 'react'
import { Button } from '@material-ui/core';

const Pagination = ({ articlesPerPage, totalArticles, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
      <Fragment>
        {
          pageNumbers.map(number =>
            (
              <div key={number} style={{ dispaly: 'flex' }}>
                <Button size="small" color={currentPage === number ? 'secondary' : 'primary'} onClick={paginate(number)}>{number}</Button>
              </div>
            )
          )
        }
      </Fragment>
  )
}

export default Pagination
