import { defineStore } from 'pinia';
import { ref } from 'vue';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore(
    'auth',
    () => {
        const token = ref('');
        const userLogin = ref('');
        const setToken = (payload) => {
            token.value = payload && !payload.includes('Bearer') ? `Bearer ${payload}` : `${payload}`;
        };
        const getToken = () => token.value;
        const setUserLogin = async (payload) => {
            userLogin.value = payload;
        };
        const getUserLogin = () => userLogin.value;
        return { token, userLogin, setToken, getToken, setUserLogin, getUserLogin };
    },
    {
        persist: {
            storage: sessionStorage,
            paths: ['token', 'userLogin']
        }
    }
);
