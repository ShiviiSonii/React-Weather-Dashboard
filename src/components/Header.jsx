import React from 'react';
import styles from "../styles/Styles.module.css";

function Header() {
  // Format the date using UNIX timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options); // Formats the date without weekday
  };

  const currentDate = formatDate(Math.floor(Date.now() / 1000)); // Get current date

  return (
    <div className={styles.header_section}>
        <h1>Weather Dashboard</h1>
        <p>{currentDate}</p> 
    </div>
  );
}

export default Header;
