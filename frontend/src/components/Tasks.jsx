import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsPlay } from "react-icons/bs";

const Tasks = ({ completed, input, toggle, id, handleUpdate, setToggle }) => {
  const [changed, setChanged] = useState("");
  useEffect(() => {
    setChanged(input[1])
  }, []);
  
  return (
    <>
      <Task
        value={toggle == id ? changed : input[1]}
        onChange={(e) => {
          setChanged(e.target.value);
        }}
        className={!(toggle == id) ? "" : "active"}
        disabled={!(toggle == id) ? true : false}
        style={
          completed
            ? {
                textDecoration: "line-through",
                color: "var(--bg-lighter)",
              }
            : { textDecoration: "none" }
        }
      />
      <DropMenu
        style={
          !(toggle == id)
            ? {
                opacity: "0",
                transform: "translateY(0) scale(0)",
                right: "10%",
              }
            : {
                opacity: "1",
                transform: "translateY(55px) scale(1)",
                padding: "8px",
                right: "2%",
              }
        }
      >
        <BsPlay
          onClick={() => {
            if (input[1] !== changed && changed.length > 0) {
                handleUpdate(id, [input[0], changed]);
              setTimeout(()=>setToggle(""),300);
            } else {
              console.log("say");
            }
          }}
          className="play"
          style={{
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
          size={20}
        />
      </DropMenu>
    </>
  );
};

const Task = styled.textarea`
  margin-top: 12px;
  font-size: 0.7rem;
  border-color: transparent;
  border-radius: 0px;
  z-index: 0;
  resize: none;
  transition: all 0.5s ease-in;
  font-family: cursive;
  background-color: var(--bg-dark);
  color: var(--bg-lighter);
  height: 50px;
  width: 100%;
  :focus {
    outline: transparent;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const DropMenu = styled.div`
  background: var(--bg-light);
  position: absolute;
  bottom: 50%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in;
  color: var(--bg-lighter);
  z-index: 3;
  .trash:hover {
    color: #ff5900;
    animation: bubble 0.9s infinite ease-in;
    z-index: 1;
  }
  .play:hover {
    color: #99cfff;
    animation: bubble 0.9s infinite ease-in;
    z-index: 1;
  }
`;

export default Tasks;
