/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Input } from 'antd';
import { Button } from '../../../components/buttons/buttons';

const KanbanBoardItem = ({
  task,
  index,
  showModal,
  boardId,
  handleTaskTitleUpdate,
  handleTaskEditable,
  handleTaskDelete,
  editableTaskId,
}) => {
  const [value, setValue] = useState(task.title);
  const onTaskTitleChange = e => {
    setValue(e.target.value);
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <div
          className="sDash_kanvan-task__single"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={task.id === editableTaskId ? 'sDash_kanvan-task__editable' : ''}>
            <h4 className="sDash_kanvan-task__title">
              <Link to="#" onClick={() => showModal(task)}>
                {task.title}
              </Link>
              <Link to="#" className="btn-edit" onClick={() => handleTaskEditable(task.id)}>
                <FeatherIcon icon="edit-2" size={12} />
              </Link>
            </h4>
            <div className="sDash_kanvan-task__edit" draggable="false">
              <div className="sDash_kanvan-task__edit--left">
                <Input
                  onPressEnter={() => handleTaskTitleUpdate(value, task.id)}
                  onChange={onTaskTitleChange}
                  value={value}
                />
                <Button
                  onClick={() => handleTaskTitleUpdate(value, task.id)}
                  className="edit-kanban-task"
                  htmlType="submit"
                  size="small"
                  type="primary"
                >
                  Save
                </Button>
              </div>
              <div className="sDash_kanvan-task__edit--right">
                <Link to="#" className="btn-delete" onClick={() => handleTaskDelete(boardId, task.id)}>
                  <FeatherIcon icon="trash-2" size={12} />
                  <span>Delete Task</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

KanbanBoardItem.propTypes = {
  task: propTypes.object,
  index: propTypes.number,
  boardId: propTypes.string,
  showModal: propTypes.func,
  handleTaskEditable: propTypes.func,
  taskId: propTypes.string,
  onTaskTitleUpdate: propTypes.func,
  handleTaskTitleUpdate: propTypes.func,
  handleTaskDelete: propTypes.func,
  onTaskTitleDelete: propTypes.func,
  editableTaskId: propTypes.string,
};

export default KanbanBoardItem;
