/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import { Input, Modal, Progress } from 'antd';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { ChecklistWrap } from '../style';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { Checkbox } from '../../../components/checkbox/checkbox';
import { Button } from '../../../components/buttons/buttons';

const UpdateTask = ({
  data,
  modalVisible,
  editable,
  handleCancel,
  addChecklist,
  addChecklistTask,
  checkListPopup,
  onShowChecklistAddPopup,
  onHideChecklistAddPopup,
  handleChecklistTaskCheckbox,
  handleTaskEdit,
  onCancelTaskEdit,
}) => {
  const { id, checklist } = data;

  return (
    <Modal
      title={
        <>
          <h4>{data.title}</h4> <span className="sub-text">in list Active Project</span>
        </>
      }
      wrapClassName="sDash_task-details"
      visible={modalVisible}
      footer={null}
      onCancel={handleCancel}
    >
      <div className="sDash_task-details-modal">
        <div className="sDash_task-details-modal__description">
          <span className="sDash_task-details__label">Description</span>
          <textarea name="task-details-label" placeholder="Add a more detailed description…" />
        </div>
      </div>

      <ChecklistWrap>
        <div className="sDash_checklist-block">
          <div className="addChecklist-wrap">
            <Button onClick={handleTaskEdit} className="btn-checklist" type="primary">
              <FeatherIcon icon="check-square" size={14} />
              Add Checklist
            </Button>
            {!editable ? null : (
              <div className="addChecklist-form">
                <Input
                  name="checkListInputValue"
                  className="add-checklist"
                  placeholder="Checklist Title"
                  onPressEnter={() => addChecklist(id)}
                />
                <div className="addChecklist-form-action">
                  <Button onClick={() => addChecklist(id)} className="btn-add" size="small" type="primary">
                    Add
                  </Button>
                  <Link onClick={onCancelTaskEdit} to="#">
                    <FeatherIcon icon="x" size={18} />
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="sDash_checklist-row">
            {checklist.map((item, i) => {
              const checkedLength = item.checkListTask.filter(checked => checked.checked === true);
              return (
                <div className="sDash_checklist-item" key={i}>
                  <div className="sDash_checklist-item__top">
                    <h4 className="sDash_checklist-item__title">{item.label} </h4>
                    <Button className="btn-delete" type="light">
                      Delete
                    </Button>
                  </div>
                  <div className="sDash_checklist__progress">
                    {item.checkListTask.length ? (
                      <Progress percent={Math.round((100 * checkedLength.length) / item.checkListTask.length)} />
                    ) : null}
                  </div>
                  <div className="sDash_checklist-tasks-wrap">
                    <ul className="sDash_checklist-tasks">
                      {item.checkListTask.map((task, index) => {
                        return (
                          <li className="sDash_checklist-tasks__single" key={index}>
                            <Checkbox
                              checked={task.checked}
                              onChange={value => handleChecklistTaskCheckbox(value, id, item.id, task.id)}
                            >
                              <span className="sDash_task-label">{task.label}</span>
                            </Checkbox>
                            <Dropdown
                              content={
                                <>
                                  <Link to="#">
                                    <span>Delete Task</span>
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
                          </li>
                        );
                      })}
                    </ul>
                    <div className="addChecklistTask-wrap">
                      {checkListPopup !== `cp-${item.id}` ? (
                        <Button
                          onClick={() => onShowChecklistAddPopup(`cp-${item.id}`)}
                          className="add-item"
                          type="light"
                        >
                          Add an Item
                        </Button>
                      ) : (
                        <div className="addChecklistTask-form">
                          <Input
                            name="checkListAddInputValue"
                            className="add-checklistTask"
                            placeholder="Checklist Title"
                            onPressEnter={() => addChecklistTask(id, item)}
                          />
                          <div className="addChecklistTask-form-action">
                            <Button
                              onClick={() => addChecklistTask(id, item)}
                              className="btn-add"
                              size="small"
                              type="primary"
                            >
                              Add
                            </Button>
                            <Link onClick={onHideChecklistAddPopup} to="#">
                              <FeatherIcon icon="x" size={18} />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ChecklistWrap>
    </Modal>
  );
};

UpdateTask.propTypes = {
  data: propTypes.object,
  modalVisible: propTypes.bool,
  editable: propTypes.bool,
  handleCancel: propTypes.func,
  addChecklist: propTypes.func,
  addChecklistTask: propTypes.func,
  checkListPopup: propTypes.string,
  onShowChecklistAddPopup: propTypes.func,
  onHideChecklistAddPopup: propTypes.func,
  handleChecklistTaskCheckbox: propTypes.func,
  handleTaskEdit: propTypes.func,
  onCancelTaskEdit: propTypes.func,
};

export default UpdateTask;
