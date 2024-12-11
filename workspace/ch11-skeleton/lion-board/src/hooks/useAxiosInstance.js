import useUserStore from '@zustand/userStore';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';

// access token 재발급 URL
const REFRESH_URL = '/auth/refresh';

function useAxiosInstance() {
  const {user, setUser} = useUserStore();

  const navigate = useNavigate();
  const location = useLocation();

  const instance = axios.create({
    baseURL: 'https://11.fesp.shop',
    timeout: 1000 * 15,
    headers: {
      'Content-Type': 'application/json', // request의 데이터 타입
      accept: 'application/json', // response의 데이터 타입
      'client-id': '00-board',
    },
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    if (user) {
      let token = user.accessToken;
      if (config.url === REFRESH_URL) {
        token = user.refreshToken;
      }
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // config.headers['Authorization'] =
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEwOSwidHlwZSI6InVzZXIiLCJuYW1lIjoi64OJ7Zi57ZWc6rOE7IKw7J2Y7ZqM6rOEIiwiZW1haWwiOiJrYW5wZWtpaUBtaWxsZW5uaXVtLmNvbSIsImltYWdlIjp7Im9yaWdpbmFsbmFtZSI6IsOqwrPChMOswoLCsMOqwrjCsC53ZWJwIiwibmFtZSI6ImNLVzF3azVkWi53ZWJwIiwicGF0aCI6Ii9maWxlcy8wMC1icnVuY2gvY0tXMXdrNWRaLndlYnAifSwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3MzM4MDc5NTksImV4cCI6MTczMzg5NDM1OSwiaXNzIjoiRkVTUCJ9.BLa6iz-WFaMSItJG2paKjUYv37WZNC-Dx9gdzoNBjrA';

    // 요청이 전달되기 전에 필요한 공통 작업 수행
    config.params = {
      delay: 500,
      ...config.params, // 기본 쿼리스트링 복사
    };

    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행
      return response;
    },
    async (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error('인터셉터', error);

      const {config, response} = error;

      if (response?.status === 401) {
        //인증 실패
        if (config.url === REFRESH_URL) {
          // refresh token 만료
          const gotoLogin = confirm(
            '로그인 후에 이용 가능합니다. \n 로그인 페이지로 이동하시겠습니까?'
          );
          gotoLogin &&
            navigate('/users/login', {state: {from: location.pathname}});
        } else {
          // 로그인하지 않았거나 access token이 만료된 경우
          // refresh token으로 재발급 요청
          const accessToken = await getAccessToken(instance);
          if (accessToken) {
            // 갱신된 accessToken으로 요청을 다시 보냄
            config.headers.Authorization = `Bearer ${accessToken}`;
            return axios(config);
          }
        }
      } else {
        return Promise.reject(error);
      }
    }
  );

  // access token 재발급
  async function getAccessToken(instance) {
    try {
      const {
        data: {accessToken},
      } = await instance.get(REFRESH_URL);
      setUser({...user, accessToken});
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }

  return instance;
}

export default useAxiosInstance;
