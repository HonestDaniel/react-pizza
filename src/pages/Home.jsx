import React from "react";
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Pizza from '../components/Pizza-block/index'
import PizzaSkeleton from '../components/Pizza-block/Pizza-skeleton';
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setPageCount, selectFilter } from "../redux/slices/filterSlice";
import { fetchPizza, selectPizzaData } from "../redux/slices/pizzaSlice";

export default function Home() {

    const navigate = useNavigate()
    const dispatch =  useDispatch()

    const onClickCategory = (id) => {
      dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
      dispatch(setPageCount(number))
    }

    const { categoryId, sortType, pageCount } = useSelector(selectFilter)
    const searchValue = useSelector((state) => state.search.searchValue)
    const { items, status } = useSelector(selectPizzaData)

    const getPizza = async () => {

      const search = searchValue ? `&search=${searchValue}` : ''; 
      const category = categoryId > 0 ? `category=${categoryId}` : '';

      dispatch(fetchPizza(
          {
            search,
            category,
            pageCount,
            sortType
          }))
      window.scrollTo(0, 0)
  }

    React.useEffect(() => {
      getPizza();
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
                {status === 'loading' ? [...new Array(6)].map((_, index) => (<PizzaSkeleton key={index}/>)) 
                : pizzas
                }
            </div>
            <Pagination onChangePage={number => onChangePage(number)}/>
      </div>
    )
}
