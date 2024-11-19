import PropTypes from 'prop-types';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

function Todo(props) {
  return (
    <div id='main'>
      <div id='container'>
        <ul>
          <li>
            <h2>쇼핑 목록</h2>
            <TodoInput addItem={props.addItem} />
            <TodoList
              itemList={props.itemList}
              toggleDone={props.toggleDone}
              deleteItem={props.deleteItem}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

Todo.propTypes = {
  addItem: PropTypes.func.isRequired,
  itemList: PropTypes.object.isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default Todo;
