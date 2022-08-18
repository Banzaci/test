import * as React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from './pages/Home';
import Salon from './pages/Salon';
import './index.css';

const App = () => (
  <Wrapper>
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Salon />} />
      </Routes>
    </Container>
  </Wrapper>
)

export default App;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  max-width: 720px;
  width: 100%;
`;
