import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoById } from "../Redux/todosSlice";
import Cookies from "js-cookie";
import TodoCard from "./TodoCard";
import CreateTodo from "./CreateTodo";
import Navbar from "./Navbar";

const Home = () => {
  const userId = Cookies.get("userId");
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector((state) => state.todos);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodoById(userId));
    }

    if (status === "succeeded") {
      setData(todos);
    } else if (status === "failed") {
      console.error("Failed to fetch todos:", error);
    }
  }, [status, dispatch, userId, todos, error]);

  return (
    <div className="bg-[#FAF0E6] pb-20 bg-cover">
      <Navbar />
      <CreateTodo />
      <div className="flex gap-5 px-5 mt-5 flex-wrap">
        {status === "loading" ? (
          <p>Loading todos...</p>
        ) : status === "failed" ? (
          <p>Error: {error}</p>
        ) : data.length > 0 ? (
          data.map((item) => <TodoCard key={item.id} component={item} />)
        ) : (
          <p>No todos available...</p>
        )}
      </div>
    </div>
  );
};

export default Home;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTodoById } from "../Redux/todosSlice";
// import Cookies from "js-cookie";
// import TodoCard from "./TodoCard";
// import CreateTodo from "./CreateTodo";
// import Navbar from "./Navbar";

// const Home = () => {
//   const userId = Cookies.get("userId");
//   const [data, useData] = useState([]);
//   // console.log(userId);
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.todos);
//   // console.log(todos);
//   // console.log("status", status);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchTodoById(userId));
//       console.log("userid useef", userId);
//     }

//     if (status == "succeeded") {
//       const { todos, status, error } = useSelector((state) => state.todos);
//       useData([...todos[0]]);
//     }
//     // console.log("todocard refresh useeffect", todos);
//   }, [status, dispatch, userId]);

//   console.log("todocard refresh home", status);

//   return (
//     <div className="bg-[#FAF0E6] pb-20 bg-cover">
//       <Navbar />
//       <CreateTodo />
//       {/* todos && todos.length > 0 && todos[0] && Array.isArray(todos[0]) ? (
//         todos[0] */}

//       <div className="flex gap-5 px-5 mt-5  flex-wrap ">
//         {data.map((item) => (
//             //   <p key={item.id}>naame</p>
//             <TodoCard key={item.id} component={item} />
//           ))
//         ) : (
//           <p>Loading todos or no todos available...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
