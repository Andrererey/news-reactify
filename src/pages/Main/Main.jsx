import styles from "./styles.module.css"
import {getCategories, getNews} from "../../api/apiNews.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Categories from "../../components/Categoties/Categories.jsx";
import Search from "../../components/Search/Search.jsx";
import {useDebounce} from "../../helpers/hooks/useDebounce.js";
import {useFetch} from "../../helpers/hooks/useFetch.js";
import {PAGE_SIZE, TOTAL_PAGES} from "../../constants/constants.js";
import NewsBanner from "../../components/NewsBanner/NewsBanner.jsx";
import NewsList from "../../components/NewsList/NewsList.jsx";
import {useFilters} from "../../helpers/hooks/useFilters.js";


const Main = () => {
  const {filters, changeFilter} = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: '',
  })

  const debouncedKeywords = useDebounce(filters.keywords, 1500)

  const {data, error, isLoading} = useFetch(getNews, {
    ...filters,
    keywords: debouncedKeywords
  })

  const {data: dataCategories} = useFetch(getCategories)

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilter('page_number', filters.page_number + 1)
    }
  }

  const handlePreviousPage = () => {
    if (filters.page_number > 1) {
      changeFilter('page_number', filters.page_number - 1)
    }
  }

  const handlePageClick = (pageNumber) => {
    changeFilter('page_number', pageNumber)
  }

  return <main className={styles.main}>
    {dataCategories ? <Categories
      categories={dataCategories.categories}
      setSelectedCategory={(category) => changeFilter('category', category)}
      selectedCategory={filters.category}
    /> : null
    }


    <Search
      keywords={filters.keywords}
      setKeywords={(keyword) => changeFilter('keywords', keyword)}
    />

    <NewsBanner
      isLoading={isLoading}
      item={data && data.news && data.news[0]}
    />

    <Pagination
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      handlePageClick={handlePageClick}
      totalPages={TOTAL_PAGES}
      currentPage={filters.page_number}
    />

    <NewsList
      isLoading={isLoading}
      news={data?.news}
    />

    <Pagination
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      handlePageClick={handlePageClick}
      totalPages={TOTAL_PAGES}
      currentPage={filters.page_number}
    />

  </main>
}

export default Main