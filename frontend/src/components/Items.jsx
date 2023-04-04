import React, { useState } from "react";
import styled from "styled-components";
import { MdCheck } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { BsThreeDots, BsTrash2 } from "react-icons/bs";
import Tasks from './Tasks.jsx'

const Items = ({data,handleComplete,handleRefresh,refresh, setAnime,anime,handleDelete,handleUpdate}) => {

  const [toggle, setToggle] = useState("");  


  return (
    <div>
      {data.map((i) => (
        <React.Fragment key={i._id}>
      <Listi 
          className={
            (anime==i._id) 
            ? "fade flex"
            : "flex"
          }
          >
        <Header>
          <Checkbox onClick={() => {
                handleComplete(i._id, i.completed);
                handleRefresh(!refresh);
              }}
              style={
                i.completed
                  ? { background: "#17a366" }
                  : { background: "var(--bg-light)" }
              }>
            <MdCheck className="check" style={common} />
          </Checkbox>
          <Title>{i.input[0]}</Title>
          {(toggle==i._id) ? 
          <TbReload 
          onClick={(e) => {
            setToggle(i._id);
    e.stopPropagation();
    setChanged(i.input[1]);
          }}
          onDoubleClick={()=>{
            setToggle("");
          }}
          size={20}
          style={{
            color: "var(--bg-lighter)",
            cursor: "pointer",
            zIndex: "2",
          }}
        />
          : 
          <BsThreeDots 
          onClick={(e) => {
            setToggle(i._id);
    e.stopPropagation();
          }}
          onDoubleClick={()=>{
            setToggle("");
          }}
          size={20}
          style={{
            color: "var(--bg-lighter)",
            cursor: "pointer",
            zIndex: "2",
          }}
        />
          }
        </Header>
          <Tasks completed={i.completed} input={i.input} toggle={toggle} id={i._id} handleUpdate={handleUpdate} setToggle={setToggle} />
        <DropMenu
              style={
                !(toggle==i._id) 
                  ? {
                      opacity: "0",
                      transform: "translateY(0px) scale(0)",
                      right: "10%",
                    }
                  : {
                      opacity: "1",
                      transform: "translateY(10px) scale(1)",
                      padding: "6px",
                      right: "5%",
                    }
              }
            >
              <BsTrash2
                onClick={() => {
                  setAnime(i._id)
                  setTimeout(()=>handleDelete(i._id),2000);
                }}
                className="trash"
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
              />
            </DropMenu>
      </Listi>
      <br />
      </React.Fragment>
      ))}
    </div>
  );
};

const common = {
  color: "var(--color)",
};

const Listi = styled.div`
  justify-content: flex-start;
  flex-direction: column;
  padding: 0px 14px 20px 14px;
  align-items: center;
  width: 85%;
  position: relative;
  border-radius: 4px;
  background: var(--bg-dark);
  `;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 10px 14px;
  position: relative;
  border-bottom: 1.5px solid var(--bg-darker);
  `;

const Title = styled.div`
  font-size: 0.8rem;
  align-self: center;
  color: var(--color);
  text-transform: capitalize;
  font-weight: 500;
  letter-spacing: 2px;
  `;

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  padding: 1.2px;
  border: 1.5px solid var(--bg-border);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .check:hover {
    color: #ffffff;
    animation: bubble 0.9s infinite ease-in;
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
`;

export default Items;
