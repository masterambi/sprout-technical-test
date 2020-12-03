import './App.css'
import SignUpPage from './pages/SignUpPage'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import Logo from './components/Logo'
import { Container } from 'react-bootstrap'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'

function App() {
  return (
    <Router>
      <Logo />
      <Container>
        <Route exact path='/'>
          <Redirect to='/signup' />
        </Route>
        <Route path='/signup' component={SignUpPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/users' component={MainPage} />
      </Container>
    </Router>
  )
}

export default App
