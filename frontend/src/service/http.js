import { ValidateError } from '@/service/AxiosInterceptor';
import axios from 'axios';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import { useRouter } from 'vue-router';
import { ValidateSuccess } from './AxiosInterceptor';

const app = createApp({});
app.use(ToastService);
const toast = app.config.globalProperties.$toast;
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiClient = axios.create({
    baseURL: `${baseUrl}`
    // headers: {
    //     'Content-type': 'application/json'
    // }
});

apiClient.interceptors.request.use((config) => {
    let token = JSON.parse(sessionStorage.getItem('auth'))?.token;
    let newConfig = { ...config };
    if (token !== config.headers.Authorization) newConfig.headers.Authorization = token;
    return newConfig;
});

apiClient.interceptors.response.use(
    (response) => {
        // console.log(response.data.message);
        if (response.data.message) toast.add({ severity: 'success', summary: 'SUCCESS', detail: ValidateSuccess(response), life: 3000 });
        return response;
    },
    (error) => {
        const router = useRouter();
        if (error.response) {
            console.log(router);
            console.log(error.response.status === 401 && error.config.url !== 'auth/login', 'ERROR MSG');
            toast.add({ severity: 'error', summary: 'ERROR', detail: ValidateError(error), life: 3000 });
            if (error.response.status === 401 && error.config.url !== 'auth/login') {
                sessionStorage.clear();
                window.location.replace('/auth/login');
            }
            // else console.log('An error occurred. Please try again later.', ValidateError(error));
        }
        return Promise.reject(error);
    }
);

export default apiClient;
