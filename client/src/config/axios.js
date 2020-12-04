import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://sprout-ramzy.herokuapp.com',
})

export default instance
