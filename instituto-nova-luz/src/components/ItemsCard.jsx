import React from 'react'
import styles from './ItemsCard.module.css'
export default function ItemsCard({icon, item}) {
  return (
    <div className={styles.card}>
        <span>{icon}</span>
        <p>{item}</p>
    </div>
  )
}
