import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsPlay, BsSun, BsMoonStars } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import axios from "axios";
import Items from "./Items.jsx";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const List = () => {
  const [anime, setAnime] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [val, setVal] = useState("");
  const [task, setTask] = useState([]);

  useEffect(() => {
    function getData() {
      axios.get("http://localhost:3300/tasks").then((res) => {
        console.log(res.data);
        setTask(res.data);

        setTimeout(
          () => task.filter((i) => console.log(i.col === "left")),
          3000
        );
      });
    }

    getData();
  }, [refresh]);

  async function updateCompleted(id, completed) {
    await axios.patch(`http://localhost:3300/tasks/${id}`, {
      completed: !completed,
    });
  }

  async function deleteTask(id) {
    await axios.delete(`http://localhost:3300/tasks/${id}`);
    setRefresh(!refresh);
    toast.success("Successfully Deleted!",{
      position:"top-right",
      autoClose:5000,
      pauseOnHover:true,
      draggable:true,
      theme:"light"
    });
  }

  async function pushToDatabase(data) {
    await axios.post(`http://localhost:3300/tasks`, {
      input: data,
      completed: false,
      col: val,
    });
    setRefresh(!refresh);
    setInput("");
    setTitle("");
    setVal("");
    toast.success("Task Added Successfully!",{
      position:"top-right",
      autoClose:5000,
      pauseOnHover:true,
      draggable:true,
      theme:"light"
    });
  }

  async function updateInput(id, input) {
    await axios.patch(`http://localhost:3300/tasks/${id}`, {
      input: input,
    });
    setRefresh(!refresh);
    setInput("");
    toast.success("Task Updated Successfully!",{
      position:"top-right",
      autoClose:5000,
      pauseOnHover:true,
      draggable:true,
      theme:"light"
    });
  }

  return (
    <>
      <ListHeadIcons>
        <div>
          <BsSun className={val === "left" ? "glow rotate" : "rotate"}  style={{ color: "var(--color)",padding:"4px",marginBottom:"12px", borderRadius:"50%" }} size={20} />
          <h2>Morning Tasks</h2>
        </div>
        <div>
          <AiOutlineThunderbolt
          className={val === "middle" ? "glow" : null}
            style={{ color: "var(--color)",padding:"4px",marginBottom:"12px", borderRadius:"50%" }}
            size={20}
          />
          <h2>Day Tasks</h2>
        </div>
        <div>
          <BsMoonStars className={val === "right" ? "glow" : null} style={{ color: "var(--color)",padding:"4px",marginBottom:"12px", borderRadius:"50%" }} size={16} />
          <h2>Night Tasks</h2>
        </div>
      </ListHeadIcons>
      <ListContainer>
        <Items
          data={
            task.filter((a) => a.col === "left")
          }
          handleComplete={updateCompleted}
          handleRefresh={setRefresh}
          refresh={refresh}
          setAnime={setAnime}
          anime={anime}
          handleDelete={deleteTask}
          handleUpdate={updateInput}
        />
        <Items
          data={
            task.filter((a) => a.col === "middle")
          }
          handleComplete={updateCompleted}
          handleRefresh={setRefresh}
          refresh={refresh}
          setAnime={setAnime}
          anime={anime}
          handleDelete={deleteTask}
          handleUpdate={updateInput}
        />
        <Items
          data={
            task.filter((a) => a.col === "right")
          }
          handleComplete={updateCompleted}
          handleRefresh={setRefresh}
          refresh={refresh}
          setAnime={setAnime}
          anime={anime}
          handleDelete={deleteTask}
          handleUpdate={updateInput}
        />
      </ListContainer>
      <AddTask>
        <EstentialDetails>
          <input
            type="text"
            className="head"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <BsSun
              className={val === "left" ? "glow" : null}
              onClick={() => setVal("left")} onDoubleClick={()=>setVal("")}
            />
            <AiOutlineThunderbolt
              className={val === "middle" ? "glow" : null}
              onClick={() => setVal("middle")} onDoubleClick={()=>setVal("")}
            />
            <BsMoonStars
              className={val === "right" ? "glow" : null}
              size={15}
              onClick={() => setVal("right")} onDoubleClick={()=>setVal("")}
            />
          </div>
        </EstentialDetails>
        <input
          type="text"
          placeholder="Add a task..."
          style={{ width: "100%" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if(e.code === "Enter"){
              if (input.length > 0 || title.length > 0) {
                if(input.length==0){
                  toast.warn("Input Required",{
                    position:"top-right",
                    autoClose:5000,
                    pauseOnHover:true,
                    draggable:true,
                    theme:"dark"
                  });
                  return;
                }
                if(title.length==0){
                  toast.warn("Title Required",{
                    position:"top-right",
                    autoClose:5000,
                    pauseOnHover:true,
                    draggable:true,
                    theme:"dark"
                  });
                  return;
                }
                if (val.length === 0) {
                  toast.warn("must choose the time phase",{
                    position:"top-right",
                    autoClose:5000,
                    pauseOnHover:true,
                    draggable:true,
                    theme:"dark"
                  });
                  return;
                } else {
                  pushToDatabase([title, input]);
                }
              }
            }
          }}
        />
        <BsPlay
          onClick={() => {
            if (input.length > 0 || title.length > 0) {
              if(input.length==0){
                toast.warn("Input Required",{
                  position:"top-right",
                  autoClose:5000,
                  pauseOnHover:true,
                  draggable:true,
                  theme:"dark"
                });
                return;
              }
              if(title.length==0){
                toast.warn("Title Required",{
                  position:"top-right",
                  autoClose:5000,
                  pauseOnHover:true,
                  draggable:true,
                  theme:"dark"
                });
                return;
              }
              if (val.length === 0) {
                toast.warn("must choose the time phase",{
                  position:"top-right",
                  autoClose:5000,
                  pauseOnHover:true,
                  draggable:true,
                  theme:"dark"
                });
                return;
              } else {
                pushToDatabase([title, input]);
              }
            }
          }}
          style={btn}
          className="btn"
          size={25}
        />
      </AddTask>
      <ToastContainer
       position="top-right"
       autoClose={5000}
       draggable
       pauseOnHover
       theme="dark"
       />
    </>
  );
};

const AddTask = styled.div`
  position: fixed;
  bottom: 0%;
  width: 80vw;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .head {
    font-size: 0.8rem;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-left-color: var(--bg-border);
    border-right-color: var(--bg-border);
    border-top-color: var(--bg-border);
    border-bottom-color: transparent;
  }
  user-select:none;
`;

const btn = {
  position: "absolute",
  top: "25%",
  right: "2%",
  cursor: "pointer",
};

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: flex-start;
  flex-direction: column;
  gap: 2%;
  row-gap: 2%;
  width: 75vw;
  @media (max-width: 768px) {
    width: 91vw;
    gap: 4%;
    row-gap: 4%;
  }
`;

const ListHeadIcons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2%;
  width: 75vw;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    width: 91vw;
    gap: 4%;
  }
  h2 {
    font-size: 0.9rem;
    text-align: center;
    font-weight: 400;
  }
  div{
    display: flex;
    justify-content: center;
    width:100%;
    flex-direction:column;
    align-items:center;
  }
`;

const EstentialDetails = styled.div`
  position: absolute;
  top: -108%;
  left: 0%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
  div {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;

    svg {
      margin-left: 20px;
      cursor: pointer;
      text-align: center;
      padding: 8px;
      border-radius: 50%;
    }
  }
`;

export default List;

/* 
<ListContainer onClick={()=>{
        setToggle("");
        }}>
        {task.map((i) => (
          <Listi key={i._id} 
          className={
            (anime==i._id) 
                  ? "fade flex"
                  : "flex"
          }
          >
            <Checkbox
              onClick={() => {
                updateCompleted(i._id, i.completed);
                setRefresh(!refresh);
              }}
              style={
                i.completed
                  ? { background: "#17a366" }
                  : { background: "var(--bg-light)" }
              }
            >
              <MdCheck className="check" style={common} />
            </Checkbox>
            <Task
              style={
                i.completed
                  ? {
                      textDecoration: "line-through",
                      color: "var(--bg-lighter)",
                    }
                  : { textDecoration: "none" }
              }
            >
              {i.input}
            </Task>
            <BsThreeDots
              onClick={(e) => {
                setToggle(i._id);
        e.stopPropagation();
              }}
              onDoubleClick={()=>{
                setToggle("");
              }}
              size={20}
              style={{ color: "var(--bg-lighter)", cursor: "pointer",zIndex:"2" }}
            />
            <DropMenu
              style={
                !(toggle==i._id) 
                  ? {
                      opacity: "0",
                      transform: "translateY(0) scale(0)",
                      right: "1%",
                    }
                  : {
                      opacity: "1",
                      transform: "translateY(50px) scale(1)",
                      padding: "6px",
                      right: "-1%",
                    }
              }
            >
              <BsTrash2
                onClick={() => {
                  setAnime(i._id)
                  setTimeout(()=>deleteTask(i._id),2000);
                }}
                className="trash"
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
              />
            </DropMenu>
            <DropMenu
              style={
                !(toggle==i._id) 
                  ? {
                      opacity: "0",
                      transform: "translateY(0) scale(0)",
                      right: "1%",
                    }
                  : {
                      opacity: "1",
                      transform: "translateY(95px) scale(1)",
                      padding: "10px",
                      right: "-1.8%",
                    }
              }
            >
              <BsPencilFill
                className="edit"
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
              />
            </DropMenu>
            <DropMenu
            onClick={(e)=>e.stopPropagation()}
            style={
              !(toggle==i._id) 
                ? {
                    opacity: "0",
                    transform: "translateY(0) scale(0)",
                    right: "1%",
                  }
                : {
                    opacity: "1",
                    transform: "translateY(100px) scale(1)",
                    right: "6%",
                  }
            }
            >
              <input
                type="text"
                placeholder="Update task..."
                style={{ width: "100%" }}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <BsPlay
              onClick={()=>updateInput(i._id,input)}
              style={btn} className="btn" size={25} />
            </DropMenu>
          </Listi>
        ))}
      </ListContainer>
*/
