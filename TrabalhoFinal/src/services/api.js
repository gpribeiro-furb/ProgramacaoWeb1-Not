import axios from "axios";

const api = axios.create({
  baseURL: "http://rest-api-employees.jmborges.site/api/v1/",
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;