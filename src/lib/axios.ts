import axios, {AxiosError} from "axios";

type OriginalRequest =
    | (AxiosError["config"] & {
          _retry?: boolean;
      })
    | undefined;

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error: AxiosError) {
        const originalRequest: OriginalRequest = error.config;
        if (error && !originalRequest._retry) {
            originalRequest._retry = true;
            const newRes = await axios.request(error.config);
            return newRes;
        } else {
            throw error;
        }
    },
);
