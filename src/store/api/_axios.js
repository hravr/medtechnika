import axios from "axios";

const _axios = axios.create({
  baseURL: "https://medtechnika.te.ua/api/v1",
});

_axios.interceptors.response.use(undefined, (e) => e.response);

export default _axios;
