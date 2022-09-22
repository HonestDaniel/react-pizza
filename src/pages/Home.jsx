import React from "react";
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Pizza from '../components/Pizza-block/index'
import PizzaSkeleton from '../components/Pizza-block/Pizza-skeleton';
import Pagination from "../components/Pagination";
// import { AppContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

export default function Home() {
    //const {searchValue} = React.useContext(AppContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)

    const dispatch =  useDispatch()

    const onClickCategory = (id) => {
      dispatch(setCategoryId(id))
    }
   // const sortType = useSelector((state) => state.filter.sortType)
    const { categoryId, sortType } = useSelector((state) => state.filter)
    const searchValue = useSelector((state) => state.search.searchValue)

    React.useEffect(() => {
      setIsLoading(true)

      const search = searchValue ? `&search=${searchValue}` : '';

      fetch(`https://63077e9b3a2114bac7640254.mockapi.io/items?page=${currentPage}&limit=5${categoryId > 0 ? 
      `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=desc${search}`)
      .then((res) => res.json())
        .then((json) => {
          setItems(json)
          setIsLoading(false)
        })
      // window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    // .filter(obj => (obj.title.toLowerCase()
    // .includes(searchValue.toLowerCase())))

    const pizzas = items.map(obj => (
      <Pizza key = {obj.id} {...obj}/>
      ))

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId = {categoryId} onClickCategory = {onClickCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                {isLoading ? [...new Array(6)].map((_, index) => (<PizzaSkeleton key={index}/>)) 
                : pizzas
                }
            </div>
            <Pagination onChangePage={number => setCurrentPage(number)}/>
      </div>
    )
}
