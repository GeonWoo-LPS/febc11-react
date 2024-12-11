import useAxiosInstance from '@hooks/useAxiosInstance';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import PropTypes from 'prop-types';
import {Link, useParams} from 'react-router-dom';

CommentListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }).isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CommentListItem({item}) {
  const axios = useAxiosInstance();
  const {_id} = useParams();

  const queryClient = useQueryClient();
  const removeItem = useMutation({
    mutationFn: (reply_id) => axios.delete(`/posts/${_id}/replies/${reply_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts', _id]});
    },
  });

  return (
    <div className='shadow-md rounded-lg p-4 mb-4'>
      <div className='flex justify-between items-center mb-2'>
        {item.user.image && (
          <img
            className='w-8 mr-2 rounded-full'
            src={`https://11.fesp.shop${item.user.image.path}`}
            alt={`${item.user.name} 프로필 이미지`}
          />
        )}

        <Link to='' className='text-orange-400'>
          {item.user.name || '익명'}
        </Link>
        <time className='ml-auto text-gray-500' dateTime={item.createdAt}>
          {item.createdAt}
        </time>
      </div>
      <div className='flex justify-between items-center mb-2'>
        <pre className='whitespace-pre-wrap text-sm'>{item.content}</pre>
        <button
          type='button'
          onClick={() => removeItem.mutate(item._id)}
          className='bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded'
        >
          삭제
        </button>
      </div>
    </div>
  );
}