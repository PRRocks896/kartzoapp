import Swal from 'sweetalert2';

const sweetAlert = {
    showSuccess :(msg:string) => {
        Swal.fire({
            text: msg,
            icon: 'success'
        });
    },
    showError:(msg:string) => {
        Swal.fire({
            title: 'Cancelled',
            text: msg,
            icon: 'error'
        });
    }
}

export default sweetAlert;