import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import KanbanBoardItem from './KanbanBoardItem';
import { Button } from '../../../components/buttons/buttons';
import { Dropdown } from '../../../components/dropdown/dropdown';

const BoardTitleUpdate = ({ editTitle, setEditTitle, boardId, onBlur }) => {
  const onBoardTitleChange = event => {
    event.preventDefault();
    setEditTitle({
      ...editTitle,
      title: event.target.value,
    });
  };

  return (
    <Input
      name={`titile-edit${boardId}`}
      className="title-edit"
      placeholder="Enter Title"
      onChange={onBoardTitleChange}
      onBlur={() => onBlur()}
      onPressEnter={() => onBlur()}
      value={editTitle.title}
    />
  );
};

BoardTitleUpdate.propTypes = {
  editTitle: propTypes.object,
  setEditTitle: propTypes.func,
  boardId: propTypes.string,
  onBlur: propTypes.func,
};

const KanbanColumn = ({
  board,
  tasks,
  index,
  createBoard,
  onBackShadow,
  deleteBoard,
  showModal,
  editColumnTitle,
  handleTaskEditable,
  handleTaskTitleUpdate,
  handleTaskDelete,
  editableTaskId,
}) => {
  const [editTitle, setEditTitle] = useState({
    title: board.title,
    id: board.id,
    taskIds: board.taskIds,
  });

  const [boardEditable, setBoardEditable] = useState(false);
  const [addTaskActive, setAddTask] = useState(false);

  const onBoardEditable = e => {
    e.preventDefault();
    setBoardEditable(true);
  };

  const onBoardEditableHide = () => {
    editColumnTitle(editTitle);
    setBoardEditable(false);
  };

  const deleteBoardHandler = boardDelete => {
    const confirm = window.confirm('Are You sure to delete this?');
    if (confirm) {
      deleteBoard(boardDelete.id);
    }
    return false;
  };

  const handleActiveAddTask = () => {
    setAddTask(true);
  };

  const handleOffAddTask = e => {
    e.preventDefault();
    setAddTask(false);
  };

  const handleAddTask = id => {
    const taskId = uuidv4();
    const tasktitle = document.querySelector(`input[name="taskInput-${id}"]`).value;
    const card = {
      id: `task${taskId}`,
      title: tasktitle,
      checklist: [],
    };
    createBoard(`task${taskId}`, card, id);
    setAddTask(false);
  };

  const { rtl } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  const renderView = ({ style, ...props }) => {
    const customStyle = {
      marginRight: 'auto',
      [rtl ? 'marginLeft' : 'marginRight']: '-17px',
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  };

  renderView.propTypes = {
    style: propTypes.object,
  };

  return (
    <Draggable draggableId={board.id} index={index}>
      {provided => (
        <div
          className="sDash_kanban-board-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Scrollbars
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
            renderView={renderView}
            className="sDash_kanban-board-item-scrolable"
          >
            <div
              className={boardEditable ? 'sDash_kanban-board-item__header editable' : 'sDash_kanban-board-item__header'}
            >
              <h4 className="list-header-title">
                <span>{board.title}</span>
                <Dropdown
                  content={
                    <>
                      <Link to="#" onClick={onBoardEditable}>
                        <span>Edit Card Title</span>
                      </Link>
                      <Link onClick={() => deleteBoardHandler(board)} to="#">
                        <span>Delete Card</span>
                      </Link>
                    </>
                  }
                  action={['click']}
                  className="wide-dropdwon kanbanCard-more"
                >
                  <Link to="#" className="btn-more">
                    <FeatherIcon icon="more-horizontal" size={14} />
                  </Link>
                </Dropdown>
              </h4>
              <BoardTitleUpdate
                boardId={board.boardId}
                boardTitle={board.title}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                onBlur={onBoardEditableHide}
              />
            </div>

            <Droppable droppableId={board.id} type="task">
              {provided => (
                <>
                  <div className="sDash_kanvan-task" {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((taskItem, i) => (
                      <KanbanBoardItem
                        task={taskItem}
                        key={taskItem.id}
                        index={i}
                        boardId={board.id}
                        showModal={showModal}
                        onBackShadow={onBackShadow}
                        handleTaskEditable={handleTaskEditable}
                        handleTaskTitleUpdate={handleTaskTitleUpdate}
                        handleTaskDelete={handleTaskDelete}
                        editableTaskId={editableTaskId}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                  <div className={addTaskActive ? 'sDash_addTask-control add-task-on' : 'sDash_addTask-control'}>
                    <Link to="#" className="btn-addTask" onClick={e => handleActiveAddTask(e)}>
                      <FeatherIcon icon="plus" size={12} />
                      <span>Add Task</span>
                    </Link>

                    <div className="sDash_addTask-from">
                      <Input
                        name={`taskInput-${board.id}`}
                        className="sDash_addTask-input"
                        placeholder="Enter a Title"
                        onPressEnter={() => handleAddTask(board.id)}
                      />
                      <div className="sDash_addTask-action">
                        <Button
                          onClick={() => handleAddTask(board.id)}
                          className="add-column"
                          htmlType="submit"
                          size="small"
                          type="primary"
                        >
                          Add
                        </Button>
                        <Link to="#" onClick={e => handleOffAddTask(e)}>
                          <FeatherIcon icon="x" size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Droppable>
          </Scrollbars>
        </div>
      )}
    </Draggable>
  );
};

KanbanColumn.propTypes = {
  board: propTypes.object,
  tasks: propTypes.array,
  index: propTypes.number,
  editColumnTitle: propTypes.func,
  column: propTypes.object,
  createBoard: propTypes.func,
  removeBoard: propTypes.func,
  onBackShadow: propTypes.func,
  deleteBoard: propTypes.func,
  showModal: propTypes.func,
  handleTaskEditable: propTypes.func,
  handleTaskTitleUpdate: propTypes.func,
  handleTaskDelete: propTypes.func,
  editableTaskId: propTypes.string,
};

export default KanbanColumn;