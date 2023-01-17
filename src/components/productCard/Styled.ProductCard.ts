import styled from "styled-components";

export const ProductCardStyled = styled.div<{
  flag: boolean;
  slideDirection: string;
}>`
  width: 250px;
  height: 400px;
  background: whitesmoke;
  border-radius: 10px;
  box-shadow: 3px 5px 3px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  margin: 50px 30px;
  overflow: hidden;

  h3 {
    margin: 10px 0;
    display: flex;
    justify-content: center;
  }

  .arrows {
    width: 100%;
    height: 60%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    color: #fff;
    z-index: 110;

    &:hover {
      transition: all 0.4s ease-in-out;
      opacity: 1;
    }

    .arrow-left,
    .arrow-right {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 100%;
      background-color: black;
      transition: all 0.3s ease-in-out;

      &:active {
        transform: scale(1.05);
      }
    }
  }

  img {
    width: 100%;
    height: 60%;
    animation: ${({ flag, slideDirection }) => {
      let stringReturn;

      if (slideDirection === "left") {
        if (flag) {
          stringReturn = "leftScrollStart";
        } else {
          stringReturn = "leftScrollEnd";
        }
      } else if (slideDirection === "right") {
        if (flag) {
          stringReturn = "rightScrollStart";
        } else {
          stringReturn = "rightScrollEnd";
        }
      }

      return stringReturn;
    }};
    animation-duration: 0.4s;
    //animation-delay: 0.2;
    //transition: all 0.5s ease-in-out;
  }

  p {
    margin: 10px 5px;
  }

  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      padding: 10px 50px;
      display: flex;
      background-color: #5978ff;
      border: none;
      outline: none;
      border-radius: 4px;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;

      &:hover {
        transform: scaleX(1.05);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }

  @keyframes rightScrollStart {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes rightScrollEnd {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes leftScrollStart {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  @keyframes leftScrollEnd {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
