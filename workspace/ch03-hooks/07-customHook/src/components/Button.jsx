import PropTypes from 'prop-types';
import './Button.css';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.elementType,
};

export default function Button({children, type = 'button', onClick, color}) {
  return (
    <button
      className='rounded-button'
      style={{backgroundColor: color}}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
