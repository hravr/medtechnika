import axios from "axios";

const _axios = axios.create({
  baseURL: "************************",
});

_axios.interceptors.response.use(undefined, (e) => e.response);

export default _axios;
