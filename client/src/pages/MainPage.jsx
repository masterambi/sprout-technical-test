import React, { useEffect } from 'react'
import WhiteCard from '../components/WhiteCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList, logout, deleteUser } from '../store/actions/userActions'
import { Button, Table } from 'react-bootstrap'
import { displayToastError } from '../helpers/swal'
import TableRow from '../components/TableRow'
import Swal from 'sweetalert2'

const MainPage = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { success: deleteSuccess } = userDelete

  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch, deleteSuccess])

  useEffect(() => {
    if (error && error.length) {
      displayToastError(error)
    }
  }, [error])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [userInfo, history])

  const deleteHandler = (id) => {
    Swal.fire({
      title: 'Delete User',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id))
      }
    })
  }

  return (
    <WhiteCard>
      <h2 className='pt-5 text-center'>
        Great, {userInfo && userInfo.name}! Here's your registered name
      </h2>
      <div className='d-flex justify-content-center mt-5 table-container'>
        <Table borderless className='w-75'>
          <thead className='table-header'>
            <tr>
              <th className='table-column-min'></th>
              <th className='table-heading'>Name</th>
              <th className='table-heading'>Phone Number</th>
              <th className='table-heading'>Email</th>
              <th className='table-column-min'></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <TableRow
                  key={user._id}
                  user={user}
                  deleteHandler={deleteHandler}
                />
              ))}
          </tbody>
        </Table>
      </div>
      <div className='mt-4 d-flex justify-content-center'>
        <Button
          variant='primary'
          type='submit'
          className='rounded-0 btn-orange border-0 form-container'
          disabled={loading}
          onClick={() => {
            dispatch(logout())
          }}
        >
          {loading ? 'Loading...' : 'Sign Out'}
        </Button>
      </div>
    </WhiteCard>
  )
}

export default MainPage
