import styles from './pagination.module.css';

interface PaginationProps {
  numberOfPosts: number;
  pageSize: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void; 
}

const Pagination = ({ numberOfPosts, pageSize, currentPage, handlePageChange }: PaginationProps) => {
  const pagesCount = Math.ceil(numberOfPosts / pageSize);
  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
 
   return (
    <div>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === currentPage ? styles.pageItemActive : styles.pageItem
            }
          >
            <a className={styles.pageLink} onClick={() => handlePageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
 };
 
 export default Pagination;