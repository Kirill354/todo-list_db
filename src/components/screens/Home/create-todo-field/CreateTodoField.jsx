import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { db } from "../../../../firebase";

const CreateTodoField = () => {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [files, setFiles] = useState([]);

  // до firebase
  // const addTodo = (title, descr) => {
  //   setTodos((prev) => [
  //     {
  //       id: Date.now(),
  //       title,
  //       descr,
  //       isCompleted: false,
  //     },
  //     ...prev,
  //   ]);
  //   setTitle("");
  //   setDescr("");
  // };

  // после firebase
  const addTodo = async () => {
    await addDoc(collection(db, "todos"), {
      title,
      descr,
      files,
      isCompleted: false,
    });
    setTitle("");
    setDescr("");
    setFiles([]);
  };

  // для загрузки файлов
  const onFilesChange = (e) => {
    let fileObj = [];
    const files = e.target.files;
    console.log(files);
    for (const file of files) {
      fileObj.push({ name: file.name, type: file.type });
    }
    setFiles(fileObj);
  };

  return (
    <div
      className="flex flex-col gap-4 items-center
    mb-4 rounded-2xl mt-16 border-zinc-800 border-2 px-5 py-3 w-full"
    >
      <input
        className="bg-transparent w-full border-zinc-600 border-2 rounded-2xl p-2 outline-none"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="Add a title"
      />
      <input
        className="bg-transparent w-full border-zinc-600 border-2 rounded-2xl p-2 outline-none"
        onChange={(e) => setDescr(e.target.value)}
        value={descr}
        type="text"
        placeholder="Add a description"
      />
      <input
        className="bg-transparent w-fullrounded-2xl p-2 outline-none"
        onChange={onFilesChange}
        type="file"
        multiple={true}
      />
      <button
        onClick={() => title && descr && addTodo()}
        className="flex gap-2 self-end cursor-pointer text-gray-600 hover:text-white transition-colors ease-in-out duration-300"
      >
        <span className="text-lg">Add todo</span>
        <FiSend size={28} className="text-gray-600" />
      </button>
    </div>
  );
};

export default CreateTodoField;
