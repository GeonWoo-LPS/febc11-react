import axios from 'axios';

function useAxiosInstance() {
  const instance = axios.create({
    baseURL: 'https://11.fesp.shop',
    timeout: 1000 * 15,
    headers: {
      'Content-Type': 'application/json', // request의 데이터 타입
      accept: 'application/json', // response의 데이터 타입
      'client-id': '00-brunch',
    },
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    config.headers['Authorization'] =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEwOSwidHlwZSI6InVzZXIiLCJuYW1lIjoi64OJ7Zi57ZWc6rOE7IKw7J2Y7ZqM6rOEIiwiZW1haWwiOiJrYW5wZWtpaUBtaWxsZW5uaXVtLmNvbSIsImltYWdlIjp7Im9yaWdpbmFsbmFtZSI6IsOqwrPChMOswoLCsMOqwrjCsC53ZWJwIiwibmFtZSI6ImNLVzF3azVkWi53ZWJwIiwicGF0aCI6Ii9maWxlcy8wMC1icnVuY2gvY0tXMXdrNWRaLndlYnAifSwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3MzM4MDc5NTksImV4cCI6MTczMzg5NDM1OSwiaXNzIjoiRkVTUCJ9.BLa6iz-WFaMSItJG2paKjUYv37WZNC-Dx9gdzoNBjrA';
    // config.headers['Authorization'] =
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEwMCwidHlwZSI6InVzZXIiLCJuYW1lIjoi6rmA6rG07JqwIiwiZW1haWwiOiIxMTFAZ2cuY29tIiwiaW1hZ2UiOnsib3JpZ2luYWxuYW1lIjoib2wzRzUzcEhSZy5wbmciLCJuYW1lIjoieUJ5RUNpRk1kLnBuZyIsInBhdGgiOiIvZmlsZXMvMDAtYnJ1bmNoL3lCeUVDaUZNZC5wbmcifSwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3MzM4MDY5NDUsImV4cCI6MTczMzg5MzM0NSwiaXNzIjoiRkVTUCJ9.r_6v2yNB4vusGJWxYCjcTaqFP3Nlu3Up6TRrDgdyLaU';
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
    (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error('인터셉터', error);
      return Promise.reject(error);
    }
  );

  return instance;
}

export default useAxiosInstance;
