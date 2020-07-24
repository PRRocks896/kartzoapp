import Swal from 'sweetalert2';

const utils = {
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
    },
    getAppName:() => {
        return ' | Kartzoo App'
    },
    getHeaderDetail:() => {
        return {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': true
        }
    }
}

export default utils;