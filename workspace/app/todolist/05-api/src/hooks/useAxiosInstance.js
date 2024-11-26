import axios from 'axios';

function useAxiosInstance() {
  const istance = axios.create({
    baseURL: 'https://todo-api.fesp.shop/api',
    timeout: 1500,
    headers: {
      'Content-Type': 'application/json', // request의 데이터 타입
      accept: 'application/json', // response의 데이터 타입
    },
  });

  return istance;
}

export default useAxiosInstance;
