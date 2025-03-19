import { useState } from 'react';
import { FaUserCircle, FaCheckCircle } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

// Mock tasks
type TaskStatus = 'pending' | 'inProgress' | 'completed';

const initialTasks: Record<TaskStatus, { id: string; content: string }[]> = {
  pending: [
    { id: '1', content: 'Task 1' },
    { id: '2', content: 'Task 2' },
  ],
  inProgress: [{ id: '3', content: 'Task 3' }],
  completed: [{ id: '4', content: 'Task 4' }],
};

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle drag-and-drop
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside the list, do nothing
    if (!destination) return;

    // If dropped in the same position, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;
    const sourceList = tasks[source.droppableId as TaskStatus];
    // Find the task being dragged
    const task = sourceList[source.index];

    // Remove the task from the source list
    sourceList.splice(source.index, 1);

    // Add the task to the destination list
    const destinationList = tasks[destination.droppableId as TaskStatus];
    destinationList.splice(destination.index, 0, task);

    // Update the state
    setTasks({ ...tasks });

    // Simulate an API call to update the task status
    console.log('Task moved:', task.id, 'from', source.droppableId, 'to', destination.droppableId);
  };

  // Formik form for creating tasks
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: (values) => {
      // Simulate API call to create a task
      console.log('Task created:', values);

      // Show success toast
      toast.success(
        <div className="flex items-center">
          <FaCheckCircle className="mr-2" />
          Task created successfully!
        </div>,
        {
          autoClose: 2000,
        },
      );

      // Close the modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/dashboard'); // Redirect to the dashboard
      }, 2000);
    },
  });

  // Close modal when overlay is clicked
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Dashboard */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Pending Tasks */}
          <Droppable droppableId="pending">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h2 className="text-lg font-semibold mb-4">Pending</h2>
                {tasks.pending.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(draggableProvided) => (
                      <div
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        ref={draggableProvided.innerRef}
                        className="bg-gray-50 p-2 mb-2 rounded-md shadow-sm"
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* In Progress Tasks */}
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h2 className="text-lg font-semibold mb-4">In Progress</h2>
                {tasks.inProgress.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(innerProvided) => (
                      <div
                        {...innerProvided.draggableProps}
                        {...innerProvided.dragHandleProps}
                        ref={innerProvided.innerRef}
                        className="bg-gray-50 p-2 mb-2 rounded-md shadow-sm"
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Completed Tasks */}
          <Droppable droppableId="completed">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h2 className="text-lg font-semibold mb-4">Completed</h2>
                {tasks.completed.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(draggableProvided) => (
                      <div
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        ref={draggableProvided.innerRef}
                        className="bg-gray-50 p-2 mb-2 rounded-md shadow-sm"
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {/* Create Task Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 text-sm sm:text-base"
      >
        Create Task
      </button>

      {/* Create Task Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-3 bg-opacity-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Task</h2>
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
                  <div className="text-red-500 text-sm">{formik.errors.title}</div>
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
                  <div className="text-red-500 text-sm">{formik.errors.description}</div>
                ) : null}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Container */}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Dashboard;
