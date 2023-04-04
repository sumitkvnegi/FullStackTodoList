import React, { useEffect, useState } from "react";
import styled from "styled-components";
import List from "./components/List.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);

  return (
    <>
      {loading == false ? (
        <Container>
          <h1 style={{ position: "fixed", top: "2.5%" }}>ToDo List</h1>
          <List />
        </Container>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 80px 0px 0px 0px;
`;
export default App;
