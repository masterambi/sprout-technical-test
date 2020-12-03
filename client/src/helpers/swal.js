import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const displayToastError = (error) => {
  const MySwal = withReactContent(Swal)

  const message = error.join('\n')
  MySwal.fire({
    position: 'top',
    icon: 'error',
    toast: true,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      container: 'my-swal',
    },
  })
}
