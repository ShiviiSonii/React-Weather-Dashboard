import React from 'react'
import styles from "../styles/Styles.module.css"

function Header() {
  return (
    <div className={styles.header_section}>
        <h1>Weather Dashboard</h1>
        <p>Date</p>
    </div>
  )
}

export default Header