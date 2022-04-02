import styled from "styled-components";

export const Container = styled.div` 
  display: flex;  
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 400px;
  width: 100%;

  input {
    width: 100%;
    outline: none;
    border: 0;
    padding: 0.25rem;
    font-size: 1.25rem;
    color: var(--white);
    background: transparent;
    border-bottom: 2px solid var(--blue-200);
  }

  span {
    margin-top: 1rem;
    color: var(--red-400);
  }
`