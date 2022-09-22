import React from "react";
import styles from './NotFoundBlock.module.scss'

export default function NotFoundBlock() {
    return (
        <div className={styles.root}>
            <h1>
            <span>😕</span>
            <br/>
            Страница не найдена 
            </h1>
            <p>Такой страницы на нашем сайте нет</p>
        </div>
    )
}

        // <div className={styles.root}>
        //     <h1>
        //     Корзина пустая <span>😕</span>
        //     <br/>
        //     </h1>
        //     <p>Вероятней всего, вы не заказывали ещё пиццу.
        //     Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
        // </div>