/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Row, Col, Input, Form } from 'antd';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { KanvanBoardWrap, BackShadow } from './style';
import UpdateTask from './overview/UpdateTask';
import KanbanColumn from './overview/KanbanColumn';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

import kanbanData from '../../demoData/kanbanBoard';

const BoardTitleUpdate = ({ boardTitle, boardId, onBlur }) => {
  const [value, setValue] = useState(boardTitle);

  const onChangeHandler = e => {
    setValue(e.target.value);
  };

  return (
    <Input
      name={`titile-edit${boardId}`}
      className="title-edit"
      placeholder="Enter Title"
      onChange={onChangeHandler}
      onBlur={() => onBlur(boardId)}
      onPressEnter={() => onBlur(boardId)}
      value={value}
    />
  );
};

BoardTitleUpdate.propTypes = {
  boardTitle: propTypes.string,
  boardId: propTypes.string,
  onBlur: propTypes.func,
};

/* 
  @Todo Remove unnecessary Code and variable
*/

const Kanban = () => {
  const [boards, setBoards] = useState(kanbanData);
  const [addColumn, setAddColumn] = useState(false);
  const [columnName, setColumnName] = useState({ column: '' });

  const [state, setState] = useState({
    boardId: '',
    checklistData: {
      id: 1,
      boardId: 1,
      checklist: [],
    },
    modalVisible: false,
    backShadow: false,
    editableTaskId: '',
    checkListPopup: '',
    editable: false,
  });

  const activeAddOption = e => {
    e.preventDefault();
    setAddColumn(true);
  };
  const diActiveAddOption = e => {
    e.preventDefault();
    setAddColumn(false);
  };

  const onDragEnd = results => {
    const { destination, source, draggableId, type } = results;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const newBoardOrder = Array.from(boards.boardOrder);
      newBoardOrder.splice(source.index, 1);
      newBoardOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...boards,
        boardOrder: newBoardOrder,
      };
      setBoards(newState);
      return;
    }

    const start = boards.boardData[source.droppableId];
    const finish = boards.boardData[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newBoard = {
        ...start,
        taskIds: newTaskIds,
      };
      const newData = {
        ...boards,

        boardData: {
          ...boards.boardData,
          [newBoard.id]: newBoard,
        },
      };
      setBoards(newData);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...boards,
      boardData: {
        ...boards.boardData,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setBoards(newState);
  };

  const createBoard = (name, card, id) => {
    const newBoards = boards;

    newBoards.tasks[name] = card;
    newBoards.boardData[id].taskIds.push(name);
    setBoards({ ...newBoards });
  };

  const removeBoard = (card, columnId) => {
    const { id } = card;
    const data = boards;
    data.columnsData[columnId].taskIds = data.columnsData[columnId].taskIds.filter(cardId => id !== cardId);
    setBoards({ ...data });
  };

  const addColumnName = event => {
    setColumnName({ ...columnName, column: event.target.value });
  };

  const deleteBoard = boardid => {
    const newBoards = boards.boardOrder.filter(boardId => boardid !== boardId);

    const newData = {
      ...boards,
      boardOrder: [...newBoards],
    };

    setBoards(newData);
  };

  const editColumnTitle = column => {
    const newData = {
      ...boards,
      boardData: {
        ...boards.boardData,
        [column.id]: column,
      },
    };
    setBoards(newData);
  };

  const [form] = Form.useForm();

  const addColumnDetails = () => {
    const boardid = uuidv4();
    const board = {
      id: `board${boardid}`,
      title: columnName.column,
      taskIds: [],
    };
    setColumnName({ column: '' });

    const boardList = boards.boardOrder;

    const newData = {
      ...boards,
      boardData: {
        ...boards.boardData,
        [board.id]: board,
      },
      boardOrder: [...boardList, board.id],
    };
    setAddColumn(!addColumn);

    setBoards(newData);
  };

  const addChecklist = taskId => {
    const checkListId = uuidv4();
    const checklistTitle = document.querySelector(`input[name="checkListInputValue"]`).value;

    const checkList = {
      id: `cl-${checkListId}`,
      label: checklistTitle,
      checkListTask: [],
    };

    const newData = {
      ...boards,
      tasks: {
        ...boards.tasks,
        [taskId]: {
          ...boards.tasks[taskId],
          checklist: [...boards.tasks[taskId].checklist, checkList],
        },
      },
    };

    setBoards(newData);
    setState({
      ...state,
      editable: false,
      checklistData: {
        checklist: [...boards.tasks[taskId].checklist, checkList],
      },
    });
  };

  const addChecklistTask = (taskId, selectedCheckList) => {
    const checkListTaskId = uuidv4();

    const checkListTaskTitle = document.querySelector(`input[name="checkListAddInputValue"]`).value;

    const checkListTask = {
      id: `${checkListTaskId}`,
      label: checkListTaskTitle,
      checked: false,
    };

    selectedCheckList.checkListTask.push(checkListTask);

    setState({
      ...state,
      checkListPopup: '',
      checklistData: {
        ...state.checklistData,
        checklist: [...state.checklistData.checklist],
      },
    });
  };

  const handleTaskTitleUpdate = (value, id) => {
    const newData = {
      ...boards,
      tasks: {
        ...boards.tasks,
        [id]: {
          ...boards.tasks[id],
          title: value,
        },
      },
    };

    setBoards(newData);
    setState({
      ...state,
      backShadow: false,
      editableTaskId: '',
      taskId: '',
    });
  };

  const handleTaskDelete = (boardId, id) => {
    const data = boards;
    data.boardData[boardId].taskIds = boards.boardData[boardId].taskIds.filter(taskId => id !== taskId);
    setBoards(data);
    setState({
      ...state,
      backShadow: false,
      taskId: '',
    });
  };

  const showModal = data => {
    setState({
      ...state,
      boardId: '',
      modalVisible: !state.modalVisible,
      checklistData: data,
    });
  };

  const handleCancel = () => {
    setState({
      ...state,
      modalVisible: false,
    });
  };

  const onBackShadow = id => {
    setState({
      ...state,
      backShadow: true,
      taskId: id,
    });
  };

  const onBackShadowHide = () => {
    setState({
      ...state,
      backShadow: false,
      editableTaskId: '',
      taskId: '',
    });
  };

  const onShowChecklistAddPopup = id => {
    setState({
      ...state,
      checkListPopup: id,
    });
  };

  const onHideChecklistAddPopup = () => {
    setState({
      ...state,
      checkListPopup: '',
    });
  };

  const handleTaskEditable = id => {
    setState({
      ...state,
      editableTaskId: id,
      backShadow: true,
    });
  };

  const handleChecklistTaskCheckbox = (value, taskId, checkListId, checkListTaskId) => {
    const newData = boards;
    newData.tasks[taskId].checklist.map(checklistSingle => {
      if (checklistSingle.id === checkListId) {
        checklistSingle.checkListTask.map(checklistTask => {
          if (checklistTask.id === checkListTaskId) {
            checklistTask.checked = value;
          }
          return checklistTask;
        });
      }
      return checklistSingle;
    });
    setState({
      ...state,
      checkListPopup: '',
      checklistData: {
        ...state.checklistData,
        checklist: newData.tasks[taskId].checklist,
      },
    });
    setBoards(newData);
  };

  const handleTaskEdit = () => {
    setState({
      ...state,
      editable: !state.editable,
    });
  };

  const onCancelTaskEdit = e => {
    e.preventDefault();
    setState({
      ...state,
      editable: false,
    });
  };

  return (
    <>
      <PageHeader
        title="Kanban"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader />
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <KanvanBoardWrap>
              <Cards headless title="Product Design">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {provided => (
                      <div className="sDash_kanban-board-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {boards.boardOrder.map((boardItem, index) => {
                          const board = boards.boardData[boardItem];
                          const tasks = board.taskIds.map(taskId => boards.tasks[taskId]);
                          return (
                            <KanbanColumn
                              board={board}
                              key={board.id}
                              tasks={tasks}
                              index={index}
                              createBoard={createBoard}
                              removeBoard={removeBoard}
                              showModal={showModal}
                              onBackShadow={onBackShadow}
                              data={boards}
                              deleteBoard={deleteBoard}
                              editColumnTitle={editColumnTitle}
                              editableTaskId={state.editableTaskId}
                              handleTaskEditable={handleTaskEditable}
                              handleTaskTitleUpdate={handleTaskTitleUpdate}
                              handleTaskDelete={handleTaskDelete}
                            />
                          );
                        })}
                        <div className={addColumn ? 'btn-addColumn add-column-on' : 'btn-addColumn'}>
                          <div className="btn-addColumn-inner">
                            <Link to="#" className="btn-add" onClick={activeAddOption}>
                              <FeatherIcon icon="plus" size={12} />
                              <span>Create Board</span>
                            </Link>
                            <Form className="addColumn-form" name="columnAdd" form={form} onFinish={addColumnDetails}>
                              <div className="btn-addColumn-form">
                                <Input
                                  value={columnName.column}
                                  className="sDash-add-column-input"
                                  onChange={event => addColumnName(event)}
                                  placeholder="Enter Column Title"
                                />
                                <div className="sDash_add-column-action">
                                  <Button className="add-column" htmlType="submit" size="small" type="primary">
                                    Add
                                  </Button>
                                  <Link to="#" onClick={diActiveAddOption}>
                                    <FeatherIcon icon="x" size={18} />
                                  </Link>
                                </div>
                              </div>
                            </Form>
                          </div>
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Cards>
            </KanvanBoardWrap>
          </Col>
        </Row>
      </Main>
      <UpdateTask
        handleCancel={handleCancel}
        modalVisible={state.modalVisible}
        data={state.checklistData}
        checkListPopup={state.checkListPopup}
        addChecklist={addChecklist}
        addChecklistTask={addChecklistTask}
        onShowChecklistAddPopup={onShowChecklistAddPopup}
        onHideChecklistAddPopup={onHideChecklistAddPopup}
        handleChecklistTaskCheckbox={handleChecklistTaskCheckbox}
        editable={state.editable}
        handleTaskEdit={handleTaskEdit}
        onCancelTaskEdit={onCancelTaskEdit}
      />
      {state.backShadow ? <BackShadow onClick={onBackShadowHide} /> : null}
    </>
  );
};

export default Kanban;