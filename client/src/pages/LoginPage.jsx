import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import WhiteCard from '../components/WhiteCard'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/actions/userActions'
import { displayToastError } from '../helpers/swal'

const LoginPage = ({ history }) => {
  const { register, handleSubmit, errors } = useForm()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/users')
    }
  }, [history, userInfo])

  useEffect(() => {
    if (error && error.length) {
      displayToastError(error)
    }
  }, [error])

  const onSubmit = (data) => {
    console.log(data)
    dispatch(login(data.email, data.password))
  }

  return (
    <WhiteCard>
      <h2 className='pt-5 text-center'>Sign In</h2>
      <small className='d-block text-center pb-5'>
        Welcome Back to Sprout Digital Labs
      </small>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto mt-5 form-container'
      >
        <Form.Group controlId='formBasicEmail'>
          <Form.Control
            type='email'
            placeholder='Email or username'
            name='email'
            isInvalid={errors.email}
            ref={register({ required: 'Email is required' })}
            required
          />
        </Form.Group>

        <Form.Group className='mb-0' controlId='formBasicPassword'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            isInvalid={errors.password}
            ref={register({ required: 'Password is required' })}
            required
          />
        </Form.Group>
        <small className='d-block text-orange text-right mt-2'>
          <span role='button'>Forgot password?</span>
        </small>

        <Button
          variant='primary'
          type='submit'
          className='w-100 mt-5 rounded-0 btn-orange border-0'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </Button>
        <div className='pt-5'></div>
        <small className='d-block text-center pt-5 mt-5'>
          New to Sprout?{' '}
          <Link to='/signup'>
            <span className='text-orange font-weight-bold' role='button'>
              Create account
            </span>
          </Link>
        </small>
      </Form>
    </WhiteCard>
  )
}

export default LoginPage
