import useAxios from '@hooks/useAxios';
import useAxiosInstance from '@hooks/useAxiosInstance';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate, useParams} from 'react-router-dom';

// const dummyData = {
//   item: {
//     _id: 5,
//     title: 'Javascript 공부',
//     content: '열심히 하자',
//     done: false,
//     createdAt: '2024.11.21 16:49:00',
//     updatedAt: '2024.11.21 16:49:00',
//   },
// };

function TodoDetail() {
  // URL의 파라미터 추출
  // 라우터에 'list/:_id'로 등록된 컴포넌트가 호출되는 경우
  // URL이 list/3일 때 useParams()는 {_id: 3}을 반환
  const {_id} = useParams();

  const navigate = useNavigate();

  const axios = useAxiosInstance();

  const {data, isLoading} = useQuery({
    queryKey: ['todolist', _id],
    queryFn: () => axios.get(`/todolist/${_id}`),
    select: (res) => res.data,
    staleTime: 1000 * 60,
  });

  // const [data, setData] = useState();
  // // API 서버에서 상세정보를 조회
  // const fetchDetail = async () => {
  //   const res = await axios.get(`/todolist/${_id}`);
  //   setData(res.data);
  // };

  // useEffect(() => {
  //   fetchDetail();
  // }, []);

  return (
    <div id='main'>
      <h2>할일 상세 보기</h2>
      {isLoading && <p>로딩중...</p>}
      {data && (
        <>
          <div className='todo'>
            <div>제목 : {data.item.title}</div>
            <div>내용 : {data.item.content}</div>
            <div>상태 : {data.item.done ? '완료' : '미완료'}</div>
            <div>작성일 : {data.item.createdAt}</div>
            <div>수정일 : {data.item.updatedAt}</div>
            <Link to='./edit'>수정</Link>
            <button type='button' onClick={() => navigate(-1)}>
              목록
            </button>
          </div>
          <Outlet context={{item: data.item}} />
        </>
      )}
    </div>
  );
}

export default TodoDetail;
