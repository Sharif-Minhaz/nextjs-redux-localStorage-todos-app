import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { saveTodosToLocalStorage } from "@/lib/localStorage";

export interface Todo {
	id?: number;
	title: string;
	description: string;
	completed?: boolean;
}

interface TodoState {
	todos: Todo[];
	searchTerm: string;
}

const initialState: TodoState = {
	todos: [],
	searchTerm: "",
};

const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		initializeTodo: (state) => {
			if (typeof window !== "undefined") {
				const todosFromStorage = localStorage.getItem("todos");
				if (todosFromStorage) {
					state.todos = JSON.parse(todosFromStorage);
				}
			}
		},

		searchTodo: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
		},

		addTodo: (state, action: PayloadAction<Todo>) => {
			const data = {
				...action.payload,
				completed: false,
				id: Date.now(),
			};

			state.todos.push(data);
			saveTodosToLocalStorage(state.todos);
		},

		editTodo: (state, action: PayloadAction<Todo>) => {
			const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
			console.log(index);
			if (index !== -1) {
				state.todos[index] = {
					...state.todos[index],
					...action.payload,
				};
			}

			saveTodosToLocalStorage(state.todos);
		},

		toggleTodo: (state, action: PayloadAction<number>) => {
			const todo = state.todos.find((todo) => todo.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
				saveTodosToLocalStorage(state.todos);
			}
		},

		deleteTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
			saveTodosToLocalStorage(state.todos);
		},
	},
});

// Selector for filtering todos
export const selectFilteredTodos = createSelector(
	[(state: RootState) => state.todos.todos, (_, searchTerm: string) => searchTerm],
	(todos, searchTerm) => {
		if (!searchTerm) return todos;
		return todos.filter(
			(todo) =>
				todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				todo.description.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}
);

export const { initializeTodo, searchTodo, addTodo, toggleTodo, editTodo, deleteTodo } =
	todosSlice.actions;
export default todosSlice.reducer;

// Selector to get the todos state
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectSearchTerm = (state: RootState) => state.todos.searchTerm;
