import InputError from '@components/InputError';
import useAxiosInstance from '@hooks/useAxiosInstance';
import {useMutation} from '@tanstack/react-query';
import {Helmet} from 'react-helmet-async';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm();

  const axios = useAxiosInstance();

  const addUser = useMutation({
    mutationFn: async (userInfo) => {
      // 이미지 먼저 업로드
      if (userInfo.attach.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append('attach', userInfo.attach[0]);

        const fileRes = await axios(`/files`, {
          method: 'post',
          headers: {
            // 파일 업로드 시 필요한 설정
            'content-Type': 'multipart/form-data',
          },
          data: imageFormData,
        });

        userInfo.image = fileRes.data.item[0];
        delete userInfo.attach;
      }

      userInfo.type = 'user';

      console.log(userInfo);

      return axios.post(`/users`, userInfo);
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      navigate(`/`);
    },
    onError: (err) => {
      console.error(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) =>
          setError(error.path, {message: error.msg})
        );
      } else {
        alert(err.response?.data.message || '잠시 후 다시 요청하세요');
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>회원가입 - 멋사컴</title>
        <meta property='og:title' content='회원 가입' />
        <meta
          property='og:description'
          content='무료 회원 가입후 멋사컴의 모든 서비스를 이용하세요.'
        />
      </Helmet>

      <main className='min-w-80 flex-grow flex items-center justify-center'>
        <div className='p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0'>
          <div className='text-center py-4'>
            <h2 className='text-2xl font-bold text-gray-700 dark:text-gray-200'>
              회원 가입
            </h2>
          </div>

          <form onSubmit={handleSubmit(addUser.mutate)}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 dark:text-gray-200 mb-2'
                htmlFor='name'
              >
                이름
              </label>
              <input
                type='text'
                id='name'
                placeholder='이름을 입력하세요'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700'
                {...register('name', {required: '이름은 필수입니다.'})}
              />
              <InputError target={errors.name} />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 dark:text-gray-200 mb-2'
                htmlFor='email'
              >
                이메일
              </label>
              <input
                type='email'
                id='email'
                placeholder='이메일을 입력하세요'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700'
                {...register('email', {required: '이메일은 필수입니다.'})}
              />
              <InputError target={errors.email} />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 dark:text-gray-200 mb-2'
                htmlFor='password'
              >
                비밀번호
              </label>
              <input
                type='password'
                id='password'
                placeholder='비밀번호를 입력하세요'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700'
                {...register('password', {required: '패스워드는 필수입니다.'})}
              />
              <InputError target={errors.password} />
            </div>

            <div className='mb-4'>
              <label
                className='block text-gray-700 dark:text-gray-200 mb-2'
                htmlFor='attach'
              >
                프로필 이미지
              </label>
              <input
                type='file'
                id='attach'
                accept='image/*'
                placeholder='이미지를 선택하세요'
                className='w-full px-3 py-2 border rounded-lg dark:bg-gray-700'
                {...register('attach')}
              />
            </div>

            <div className='mt-10 flex justify-center items-center'>
              <button
                type='submit'
                className='bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
              >
                회원가입
              </button>
              <Link
                to='/'
                className='bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
