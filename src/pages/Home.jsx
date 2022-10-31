import React from "react";
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Pizza from '../components/Pizza-block/index'
import PizzaSkeleton from '../components/Pizza-block/Pizza-skeleton';
import Pagination from "../components/Pagination";
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setPageCount, setFilters } from "../redux/slices/filterSlice";

export default function Home() {
    //const {searchValue} = React.useContext(AppContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const navigate = useNavigate()
    const dispatch =  useDispatch()

    const onClickCategory = (id) => {
      dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
      dispatch(setPageCount(number))
    }
   // const sortType = useSelector((state) => state.filter.sortType)
    const { categoryId, sortType, pageCount } = useSelector((state) => state.filter)
    const searchValue = useSelector((state) => state.search.searchValue)

    React.useEffect(() => {
      setIsLoading(true)

      const search = searchValue ? `&search=${searchValue}` : ''; 
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      // fetch(`https://63077e9b3a2114bac7640254.mockapi.io/items?page=${currentPage}&limit=5${categoryId > 0 ? 
      // `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=desc${search}`)
      // .then((res) => res.json())
      //   .then((json) => {
      //     setItems(json)
      //     setIsLoading(false)
      //   })
      axios.get(`https://63077e9b3a2114bac7640254.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=desc${search}`
      )
      .then(response => {
        setItems(response.data)
        setIsLoading(false)
      })
      window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, pageCount])

    React.useEffect(() => {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        pageCount
      })
     navigate(`?${queryString}`)
    }, [categoryId, sortType, searchValue, pageCount])

    React.useEffect(() => {
      if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1))

      //  const sort = menu.find(obj => obj.sortProperty === params.sortProperty)

        // dispatch(
        //   setFilters({
        //     ...params,
        //   })
        // )
      }
    }, [])
    // .filter(obj => (obj.title.toLowerCase()
    // .includes(searchValue.toLowerCase())))

    const pizzas = items.map(obj => (
      <Pizza key = {obj.id} {...obj}/>
      ))

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId = {categoryId} onChangeCategory = {onClickCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                {isLoading ? [...new Array(6)].map((_, index) => (<PizzaSkeleton key={index}/>)) 
                : pizzas
                }
            </div>
            <Pagination onChangePage={number => onChangePage(number)}/>
      </div>
    )
}
