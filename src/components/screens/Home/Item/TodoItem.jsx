import React, { useState } from "react";
import Check from "./Check";
import cn from "classnames";
import { BsTrash, BsCheck } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

const TodoItem = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescr, setEditDescr] = useState(todo.descr);

  // до firebase
  // const removeTodo = (id) => {
  //   setTodos((prev) => [...prev].filter((t) => t.id !== id));
  // };
  // const changeTodo = (id) => {
  //   const copy = [...todos];
  //   const currentTodo = copy.find((t) => t.id === id);
  //   currentTodo.isCompleted = !currentTodo.isCompleted;
  //   setTodos(copy);
  // };
  // const editTodo = (id, title, descr) => {
  //   const copy = [...todos];
  //   const currentTodo = copy.find((t) => t.id === id);
  //   currentTodo.title = title;
  //   currentTodo.descr = descr;
  //   setTodos(copy);
  //   setIsEdit(false);
  // };

  // после firebase
  const changeTodo = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      isCompleted: !todo.isCompleted,
    });
  };
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  const editTodo = async (todo) => {
    await updateDoc(
      doc(db, "todos", todo.id),
      {
        title: editTitle,
        descr: editDescr,
      },
      setIsEdit(false)
    );
  };

  return (
    <div className="flex justify-between items-center mb-4 rounded-2xl bg-zinc-800 p-5 w-full">
      <button
        disabled={isEdit ? true : false}
        className="flex items-center"
        onClick={() => changeTodo(todo)}
      >
        <Check isCompleted={todo.isCompleted} />
        <div className="flex flex-col items-start">
          {isEdit && !todo.isCompleted ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <input
                  className="bg-transparent border-zinc-600 border-2 rounded-2xl p-2 outline-none"
                  onChange={(e) => setEditTitle(e.target.value)}
                  value={editTitle}
                  type="text"
                />
                <input
                  className="bg-transparent border-zinc-600 border-2 rounded-2xl p-2 outline-none"
                  onChange={(e) => setEditDescr(e.target.value)}
                  value={editDescr}
                  type="text"
                />
              </div>
              <span
                onClick={() => editTodo(todo)}
                className="flex items-center cursor-pointer hover:text-zinc-600 transition-colors ease-in-out duration-300"
              >
                <BsCheck size={28} className="text-white cursor-pointer" />
                click to Edit!
              </span>
            </div>
          ) : (
            <>
              <span
                className={cn(
                  { "line-through": todo.isCompleted },
                  "font-bold text-lg"
                )}
              >
                {todo.title}
              </span>
              <span className={cn({ "line-through": todo.isCompleted })}>
                {todo.descr}
              </span>
              {todo.files.length ? (
                <div>
                  <h4>Файлы:</h4>
                  <ul className="flex flex-col items-start">
                    {todo.files.map((file, index) => (
                      <li className="flex flex-col items-start" key={index}>
                        <span className="text-gray-600">
                          {index + 1}. {file.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </button>
      <div>
        <button
          disabled={todo.isCompleted ? true : false}
          onClick={() => !todo.isCompleted && setIsEdit(!isEdit)}
        >
          <AiOutlineEdit
            size={24}
            className="text-gray-600 mr-2 hover:text-white transition-colors ease-in-out duration-300 "
          />
        </button>
        <button
          disabled={isEdit ? true : false}
          onClick={() => deleteTodo(todo.id)}
        >
          <BsTrash
            size={24}
            className="text-gray-600 hover:text-red-700 transition-colors ease-in-out duration-300"
          />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
