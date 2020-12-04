import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import WhiteCard from '../components/WhiteCard'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../store/actions/userActions'
import { displayToastError } from '../helpers/swal'

const SignUpPage = ({ history }) => {
  const { register, handleSubmit, errors, watch } = useForm()

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error } = userRegister

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

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
    dispatch(signUp(data.name, data.phone, data.email, data.password))
  }

  return (
    <WhiteCard>
      <h2 className='pt-5 text-center'>Sign Up</h2>
      <small className='d-block text-center'>
        Welcome to Sprout Digital Labs
      </small>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto mt-5 form-container'
      >
        <Form.Group controlId='formBasicName'>
          <Form.Control
            type='text'
            placeholder='Name'
            name='name'
            isInvalid={errors.name}
            ref={register({ required: 'Name is required' })}
            required
          />
        </Form.Group>

        <Form.Group controlId='formBasicPhoneNumber'>
          <Form.Control
            type='number'
            placeholder='Phone Number'
            name='phone'
            isInvalid={errors.phone}
            ref={register({ required: 'Phone number is required' })}
            required
          />
        </Form.Group>

        <Form.Group controlId='formBasicEmail'>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            isInvalid={errors.email}
            ref={register({ required: 'Email is required' })}
            required
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            isInvalid={errors.password}
            ref={register({ required: 'Password is required' })}
            required
          />
        </Form.Group>

        <Form.Group controlId='formBasicPasswordConfirmation'>
          <Form.Control
            type='password'
            placeholder='Password Confirmation'
            name='confirmPassword'
            isInvalid={errors.confirmPassword}
            ref={register({
              validate: (value) =>
                value === watch('password') || "Passwords don't match.",
            })}
            required
          />
          {errors.confirmPassword && (
            <Form.Text className='text text-danger'>
              {errors.confirmPassword.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          className='w-100 mt-5 rounded-0 btn-orange border-0'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </Button>
        <small className='d-block text-center mt-3'>
          Already have an account?{' '}
          <Link to='/login'>
            <span className='text-orange font-weight-bold' role='button'>
              Log In
            </span>
          </Link>
        </small>
      </Form>
    </WhiteCard>
  )
}

export default SignUpPage
