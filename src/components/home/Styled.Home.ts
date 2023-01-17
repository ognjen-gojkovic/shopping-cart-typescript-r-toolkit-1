import styled from "styled-components";

export const HomeStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    margin-top: 50px;
    margin-left: 50px;
  }

  .products {
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
`;
