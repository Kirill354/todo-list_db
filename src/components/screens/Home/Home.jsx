import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import CreateTodoField from "./create-todo-field/CreateTodoField";
import TodoItem from "./Item/TodoItem";

// https://console.firebase.google.com/project/todo-list-5c1b7/firestore/data/~2Ftodos~2F61AN0csuJvI5dzlefwHo

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="text-white w-4/5 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Todo List</h1>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <CreateTodoField />
    </div>
  );
};

export default Home;
