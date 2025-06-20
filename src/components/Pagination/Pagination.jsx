import styles from "./styles.module.css"

const Pagination = ({totalPages, handleNextPage, handlePreviousPage, handlePageClick, currentPage}) => {
  return (<div className={styles.pagination}>
    <button
      onClick={handleNextPage}
      type="button"
      className={styles.arrow}
      disabled={1 >= currentPage}
    >
      {'<'}
    </button>
    <div className={styles.list}>
      {[...Array(totalPages)].map((_, index) => {
        return <button
          onClick={() => handlePageClick(index + 1)}
          key={index}
          type="button"
          className={styles.pageNumber}
          disabled={index + 1 === currentPage}
        >
          {index + 1}
        </button>
      })}
    </div>
    <button
      onClick={() => handleNextPage(currentPage)}
      type="button"
      className={styles.arrow}
      disabled={totalPages <= currentPage}
    >
      {'>'}
    </button>
  </div>)
}

export default Pagination