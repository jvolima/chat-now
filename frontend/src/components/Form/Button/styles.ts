import styled from "styled-components";

export const Container = styled.button`
  border: 0;
  border-radius: 4rem;
  padding: 0.5rem 2.5rem;

  background: var(--blue-500);
  color: var(--white);
  font-size: 1.25rem;
  font-weight: bold;

  box-shadow: 0 0 40px 40px var(--blue-500) inset, 0 0 0 0 var(--blue-500);
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;

  &:hover {
    background: transparent;
    box-shadow: 0 0 10px 0 var(--blue-500) inset, 0 0 6px 4px var(--blue-500)
  }
`