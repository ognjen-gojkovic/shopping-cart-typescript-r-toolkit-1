import styled from "styled-components";

export const CartStyled = styled.div<{ toggle: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.toggle ? 1 : 0)};
  z-index: ${(props) => (props.toggle ? 190 : -10)};
  transition: all 0.4s ease-in-out;

  /*
  ::-webkit-scrollbar {
    display: none;
  }
*/

  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    opacity: ${(props) => (props.toggle ? 1 : 0)};
    transition: opacity 0.4s ease-in-out;
  }

  .cart {
    color: #222;
    background: whitesmoke;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    height: 600px;
    opacity: ${(props) => (props.toggle ? 1 : 0)};
    z-index: ${(props) => (props.toggle ? 200 : -10)};
    transform: ${(props) =>
      props.toggle ? "translateX(0)" : "translateX(100%)"};
    transition: all 0.4s ease-in-out;
    overflow-y: scroll;

    h2 {
      margin-bottom: 30px;
      margin-left: 0;
    }

    .items {
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .head {
          img {
            width: 100px;
          }
        }
        .update {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          .btn-opr {
            border: none;
            outline: none;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            background-color: #5978ff;
            color: #fff;
            font-weight: bold;
            font-size: 1rem;
            transition: all 0.2s ease-in-out;
            cursor: pointer;

            &:active {
              transform: scale(0.9);
              transition: all 0.2s ease-in-out;
            }

            &:nth-of-type(1) {
              border-bottom-left-radius: 10px;
              border-top-left-radius: 10px;
              border-right: 1px solid #fff;
            }
            &:nth-of-type(2) {
              border-bottom-right-radius: 10px;
              border-top-right-radius: 10px;
            }
          }
        }
        .show {
          margin-left: 20px;
          width: 220px;
        }
        .delete {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 35px;
          background-color: tomato;
          color: #fff;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 4px;
          transition: all 0.4s ease-in-out;
          cursor: pointer;

          &:active {
            transform: scale(1.05);
          }
        }
      }
      .container {
        margin-top: 20%;
        display: flex;
        justify-content: flex-end;
        margin-right: 0;
        font-weight: 700;
      }
    }

    .btn {
      width: 100%;
      display: flex;
      justify-content: center;

      button {
        margin-top: 10%;
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
  }
`;
