import styled from "styled-components";

export const NavbarStyled = styled.nav`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #333;
  color: #fff;
  z-index: 120;

  h2 {
    margin-left: 40px;
  }

  .container {
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      margin-right: 40px;
      font-size: 1.2rem;
    }

    .cart {
      font-size: 1.4rem;
      cursor: pointer;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: #5978ff;
      }
    }
  }
`;
