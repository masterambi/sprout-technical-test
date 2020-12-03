import React from 'react'
import trash from '../svg/trash.svg'

const TableRow = ({ user, deleteHandler }) => {
  const convertName = (name) => {
    const nameArr = name.split(' ')
    if (nameArr[1]) {
      return `${nameArr[0][0].toUpperCase()}${nameArr[1][0].toUpperCase()}`
    }
    return nameArr[0][0].toUpperCase()
  }
  return (
    <tr>
      <td className='table-data'>
        <span className='bg-orange p-2 rounded-circle'>
          {convertName(user.name)}
        </span>
      </td>
      <td className='table-data'>{user.name}</td>
      <td className='table-data'>{user.phone}</td>
      <td className='table-data'>{user.email}</td>
      <td>
        <img
          src={trash}
          role='button'
          alt='trash'
          onClick={() => {
            deleteHandler(user._id)
          }}
        />
      </td>
    </tr>
  )
}

export default TableRow
