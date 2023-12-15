import React from 'react'

const ItemCard = ({item}) => {
    console.log('card', item)
  return (
    <div>{item.name}</div>
  )
}

export default ItemCard