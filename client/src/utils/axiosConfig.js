const BASE_URL = import.meta.env.VITE_BASE_URL;
const gettokenFromLocalStorage = localStorage.getItem("token") ? localStorage.getItem("token") : null;
// console.log(gettokenFromLocalStorage);
export const config = {
    headers : {
        'Content-Type': 'application/json',
        'authToken' : gettokenFromLocalStorage !== null ? gettokenFromLocalStorage : "",
        Accept : "application/json",
    },
}