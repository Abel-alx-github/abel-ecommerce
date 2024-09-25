import styles from "./SearchBar.module.scss"
import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchBar = ({value, onChange} ) => {
    return (

    <div className={styles.search}>
        <BiSearch className={styles.icon} size='20'/>
        <input type="text" value={value} onChange={onChange}  placeholder='Search by name...'/>
    </div>
)

}



export default SearchBar
