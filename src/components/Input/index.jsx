import React from "react";
import { useDispatch } from "react-redux"
import { setSearchValue } from "../../redux/slices/searchSlice"
import debounce from "lodash.debounce";
//import { AppContext } from "../../App";

import styles from './Input.module.scss'


export default function Input() {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState('')

    const inputRef = React.useRef()

    const onChangeValue = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }
// eslint-disable-next-line 
    const updateSearchValue = React.useCallback(
        debounce((str) => {dispatch(setSearchValue(str))
        }, 250),
        [],
    )
    
    const onClickCancel = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current.focus();
    }

    return (
        <div className={styles.root}>
            {value && 
                <svg onClick={() => onClickCancel('')} className={styles.cancel}enableBackground="new 0 0 256 256" height="256px" id="Layer_1" version="1.1" viewBox="0 0 256 256" width="256px" xmlns="http://www.w3.org/2000/svg"><path d="M137.051,128l75.475-75.475c2.5-2.5,2.5-6.551,0-9.051s-6.551-2.5-9.051,0L128,118.949L52.525,43.475  c-2.5-2.5-6.551-2.5-9.051,0s-2.5,6.551,0,9.051L118.949,128l-75.475,75.475c-2.5,2.5-2.5,6.551,0,9.051  c1.25,1.25,2.888,1.875,4.525,1.875s3.275-0.625,4.525-1.875L128,137.051l75.475,75.475c1.25,1.25,2.888,1.875,4.525,1.875  s3.275-0.625,4.525-1.875c2.5-2.5,2.5-6.551,0-9.051L137.051,128z"/></svg>
            }
            <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z"/></g></svg>
            <input ref={inputRef} value={value} onChange={(event) => onChangeValue(event)}className={styles.input} placeholder="Найти пиццу"/>
        </div>
    ) 
}