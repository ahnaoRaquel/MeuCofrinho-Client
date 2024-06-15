import axios from "axios";
import * as SecureStore from 'expo-secure-store';

// Função assíncrona para obter o token e configurar o axios
const configureAxios = async () => {
    const token = await SecureStore.getItemAsync("token");

    const axiosWithToken = axios.create();

    axiosWithToken.interceptors.request.use(
        config => {
            if (token) {
                config.headers.Authorization = "Bearer " + token;
                config.headers['Cache-Control'] = 'no-cache';
            }
            return config;
        },
        error => Promise.reject(error)
    );

    // Interceptor de resposta (opcional)
    // axiosWithToken.interceptors.response.use(
    //     response => {
    //         return response;
    //     },
    //     error => {
    //         if (error.response)
    //             console.log("Erro em RequestInterceptor: " + error);
    //         else
    //             return Promise.reject(error);
    //     }
    // );

    return axiosWithToken;
};

// Exporta a configuração do axios como uma Promise
export default configureAxios;
