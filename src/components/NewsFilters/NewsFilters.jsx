import styles from "./styles.module.css"
import Categories from "../Categoties/Categories.jsx";
import Search from "../Search/Search.jsx";
import {useFetch} from "../../helpers/hooks/useFetch.js";
import {getCategories} from "../../api/apiNews.js";

const NewsFilters = ({filters, changeFilter}) => {
  const {data: dataCategories} = useFetch(getCategories)

  return <section className={styles.filters}>
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
  </section>
}

export default NewsFilters