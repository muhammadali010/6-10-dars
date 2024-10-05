import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Board() {
  const [boards, setBoards] = useState([]);
  const nameRef = useRef();
  const colorRef = useRef();
  const descRef = useRef();

  const handleCreateBoard = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token mavjud emas!');
      return;
    }

    axios.post(`${import.meta.env.VITE_API_URL}/boards/create`, {
      name: nameRef.current.value,
      color: colorRef.current.value,
      description: descRef.current.value,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    })
    .then(data => {
      console.log(data.data.board);
      fetchBoards();
    })
    .catch(err => {
      console.error(err);
    });
  };

  const fetchBoards = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error('Token mavjud emas!');
        return;
      }

      const response = await axios.get(`https://trello.vimlc.uz/api/boards/my-boards`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setBoards(response.data.boards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleCreateBoard} className="flex flex-col space-y-3 w-1/3 mx-auto mt-5">
        <input
          type="text"
          ref={nameRef}
          placeholder="Enter board name"
          className=" border p-2"
        />
        <select ref={colorRef} className="  border p-2">
          <option value="" disabled selected>Select board color</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="orange">Orange</option>
          <option value="blue">Blue</option>
        </select>

        <textarea
          ref={descRef}
          placeholder="Enter description"
          className="textarea resize-none  border p-2"
        />
        <button type="submit" className="btn bg-blue-700 p-3 rounded-md">Create</button>
      </form>
      
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4 text-center">Boardlar ro'yxati:</h2>
        <ul className="flex flex-wrap justify-center space-x-4 space-y-4">
          {boards.length > 0 ? (
            boards.map((board) => (
              <li key={board.id} className="flex flex-col p-4 border border-gray-900 rounded shadow-md  cursor-pointer max-w-xs">
                <h3 className="font-semibold">{board.name}</h3>
                <h4 className="text-sm text-gray-500">{board.color}</h4>
                <p className="text-gray-700">{board.description}</p>
              </li>
            ))
          ) : (
            <p>Hozircha boardlar mavjud emas.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Board;
