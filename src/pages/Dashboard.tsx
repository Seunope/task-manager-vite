import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import {
  createTask,
  fetchAllTask,
  editTask,
  updateTaskStatus,
  deleteTask,
} from '../config/redux/actions/taskActions';
import { TaskDTO } from '../config/utils/types';
import { AppDispatch, CentralState } from '../config/redux/store';
import { TaskState } from '../config/redux/reducers/taskSlice';
import { BeatLoader } from 'react-spinners';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector<CentralState, TaskState>((state) => state.task);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskDTO | null>(null);

  const formik = useFormik({
    initialValues: {
      title: editingTask ? editingTask.title : '',
      description: editingTask ? editingTask.description : '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: (values) => {
      if (editingTask) {
        dispatch(editTask({ taskId: editingTask.id, ...values }))
          .unwrap()
          .then(() => {
            toast.success('Task updated successfully!');
            setIsModalOpen(false);
            setEditingTask(null);
            formik.resetForm(); // Clear Formik state
          })
          .catch(() => {
            toast.error('Failed to update task');
          });
      } else {
        dispatch(createTask(values))
          .unwrap()
          .then(() => {
            toast.success('Task created successfully!');
            setIsModalOpen(false);
            setEditingTask(null);
            formik.resetForm(); // Clear Formik state
          })
          .catch(() => {
            toast.error('Failed to create task');
          });
      }
    },
  });

  useEffect(() => {
    dispatch(fetchAllTask());
  }, [dispatch]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    const foundTask = tasks.find((task) => task.id === Number(result.draggableId));

    if (foundTask) {
      dispatch(
        updateTaskStatus({
          taskId: foundTask.id,
          status: destination.droppableId as 'pending' | 'in-progress' | 'completed',
        }),
      );
    }
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId))
      .unwrap()
      .then(() => {
        toast.success('Task deleted successfully!');
      })
      .catch(() => {
        toast.error('Failed to delete task');
      });
  };

  const handleEditTask = (task: TaskDTO) => {
    setEditingTask(task);
    setIsModalOpen(true);
    formik.setValues({ title: task.title, description: task.description }); // Pre-fill form
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setEditingTask(null);
      formik.resetForm(); // Clear Formik state
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Loading and Error Handling */}
      {loading && (
        <div className="text-center mt-4">
          <BeatLoader color="blue" />
        </div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Dashboard */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['pending', 'in-progress', 'completed'].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <h2 className="text-lg font-semibold mb-4">{status}</h2>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(draggableProvided) => (
                          <div
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            ref={draggableProvided.innerRef}
                            className="bg-gray-50 p-2 mb-2 rounded-md shadow-sm flex justify-between items-center"
                          >
                            {task.title}
                            <div className="flex space-x-2">
                              <FaEdit
                                className="cursor-pointer text-blue-500"
                                onClick={() => handleEditTask(task)}
                              />
                              <FaTrash
                                className="cursor-pointer text-red-500"
                                onClick={() => handleDeleteTask(task.id.toString())}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Create Task Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-1 text-background px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 text-sm sm:text-base"
      >
        Create Task
      </button>

      {/* Create/Edit Task Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-3 bg-opacity-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingTask ? 'Edit Task' : 'Create Task'}</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-red-1 text-sm">{formik.errors.title}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-red-1 text-sm">{formik.errors.description}</div>
                ) : null}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingTask(null);
                    formik.resetForm(); // Clear Formik state
                  }}
                  className="bg-gray-1 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-1 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {editingTask ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
