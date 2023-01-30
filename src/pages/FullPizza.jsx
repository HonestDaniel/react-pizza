import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState({});
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza () {
        try {
            const { data } = await axios.get(`https://63077e9b3a2114bac7640254.mockapi.io/items/${id}`); 
            setPizza(data);  
        } catch (error) {
            alert('Error');
        }
    }

    fetchPizza();
  }, []) 

  if (!pizza) {
    return "Загрузка...";
  } 

  return (
    <div className="container">
        <img src={pizza.imageUrl}/>
        <h2>{pizza.title}</h2>
        <h4>{pizza.price}</h4>
    </div>
  )
};

export default FullPizza;