"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    value: string
    openModal: boolean
    todosList: any
    editModal: boolean
    editValue: string
    editId: number | null
    selectedFilter: string
}
let storedTodos = localStorage.getItem("todosList")
const initialState: InitialState = {
    value: "",
    openModal: false,
    todosList: storedTodos ? JSON.parse(storedTodos) : [],
    editModal: false,
    editValue: "",
    editId: null,
    selectedFilter: "All"
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        handleInputChange: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        handleModal: (state, action) => {
            state.openModal = action.payload
        },
        handleEditModal: (state, action) => {
            state.editModal = action.payload
        },
        handleAddTodos: (state, action) => {
            state.todosList.push({ id: Date.now(), todoItem: action.payload, completed: false })
            state.value = ""
            localStorage.setItem("todosList", JSON.stringify(state.todosList))
        },
        toggleTask: (state, action: PayloadAction<{ id: number; completed: boolean }>) => {
            console.log(action.payload);

            const updatedTasks = state.todosList.map((task: any) =>
                task.id === action.payload.id ? { ...task, completed: action.payload.completed } : task
            );
            state.todosList = updatedTasks; // Update the todosList with the updatedTasks
            localStorage.setItem("todosList", JSON.stringify(state.todosList))

        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todosList = state.todosList.filter((todo: any) => todo.id !== action.payload);
            localStorage.setItem("todosList", JSON.stringify(state.todosList))

        },
        handleEditValue: (state, action) => {
            state.editValue = action.payload
        },
        editTodo: (state) => {

            const todoToEdit = state.todosList.find((todo: any) => todo.id === state.editId);

            if (todoToEdit) {
                todoToEdit.todoItem = state.editValue;
            }

        },
        storingEditIndex: (state, action) => {
            state.editId = action.payload
        },
        setSelectedFilter: (state, action) => {
            state.selectedFilter = action.payload
        }

    },
});

export const { handleInputChange, handleModal, handleAddTodos, toggleTask, deleteTodo, handleEditModal, handleEditValue, editTodo, storingEditIndex, setSelectedFilter } = authSlice.actions
export default authSlice.reducer