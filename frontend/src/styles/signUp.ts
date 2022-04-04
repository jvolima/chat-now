import styled from "styled-components";

export const Container = styled.main`
  max-width: 1120px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 0 0.4rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    text-align: center;
    font-size: 2.75rem;
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 3rem;
  }

  p {
    margin-top: 3rem;
    text-align: center;
    font-size: 1.125rem;

    a {
      color: var(--blue-50);
    }
  }
`