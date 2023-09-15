"use client"
import { BsPlus } from "react-icons/bs"
import { MdEdit, MdDelete } from "react-icons/md"
import { handleModal, handleInputChange, handleAddTodos, toggleTask, deleteTodo, handleEditModal, handleEditValue, editTodo, storingEditIndex, setSelectedFilter } from "@/redux/features/auth-slice"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/redux/store"
import { RiArrowDropDownLine } from "react-icons/ri"
const Todos = () => {
  const { openModal, value, todosList, editModal, editValue, selectedFilter } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const addTodo = (value: string) => {
    if (value.trim() !== "") {
      dispatch(handleAddTodos(value))
    }
  }
  const handleCheckboxChange = (id: number, completed: boolean) => {
    // toggleTask(task.id, !task.completed);
    dispatch(toggleTask({ id, completed }))
  };
  // console.log(todosList);
  const filteredTodos = todosList.filter((todo: any) => {
    if (selectedFilter === "All") {
      return true;
    } else if (selectedFilter === "Completed") {
      return todo.completed;
    } else if (selectedFilter === "NotCompleted") {
      return !todo.completed;
    }
    return true;
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-center text-3xl mt-3">TODOS LIST</h1>
      <button className="btn btn-primary w-[200px]"
        onClick={() => dispatch(handleModal(!openModal))}>
        <BsPlus size={25} />Add Todo
      </button>
      <dialog id="my_modal_3" className={openModal ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => dispatch(handleModal(false))}>✕</button>
          </form>
          <h3 className="font-bold text-lg text-center">Add Your Task</h3>
          <div className="flex gap-3 justify-center">
            <input type="text"
              placeholder="Type here"
              className="input input-bordered input-primary outline-none w-full max-w-xs"
              value={value}
              onChange={(e: any) => dispatch(handleInputChange(e.target.value))}
            />
            <button className="btn btn-primary" onClick={() => {
              addTodo(value)
              dispatch(handleModal(false))
            }}>Add</button>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_3" className={editModal ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => dispatch(handleEditModal(false))}>✕</button>
          </form>
          <h3 className="font-bold text-lg text-center">Edit your Task</h3>
          <div className="flex gap-3 justify-center">
            <input type="text"
              placeholder="edit here"
              className="input input-bordered input-primary w-full max-w-xs"
              value={editValue}
              onChange={(e: any) => dispatch(handleEditValue(e.target.value))}
            />
            <button className="btn btn-primary" onClick={() => {
              dispatch(editTodo())
              dispatch(handleEditModal(false))
            }}>edit</button>
          </div>
        </div>
      </dialog>
      <div className="relative inline-block">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => dispatch(setSelectedFilter(e.target.value))}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="NotCompleted">Not Completed</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <RiArrowDropDownLine size={25}/>
        </div>
      </div>
      <div className="">
        {filteredTodos.map((each: any) => (
          <div className="flex gap-3 justify-center items-center mb-4">
            <div className="form-control">
              <label className="cursor-pointer label">
                <input type="checkbox"
                  checked={each.completed}
                  className="checkbox checkbox-info"
                  onChange={() => handleCheckboxChange(each.id, !each.completed)}
                />
              </label>
            </div>
            <h2 className="w-[250px] break-words">{each.todoItem}</h2>
            <MdEdit className="text-blue-500 cursor-pointer" size={25} onClick={() => {
              dispatch(handleEditModal(!editModal))
              dispatch(storingEditIndex(each.id))
            }} />
            <MdDelete className="text-red-500 cursor-pointer" onClick={() => dispatch(deleteTodo(each.id))} size={25} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todos