import React from "react";
import { useAppDispatch } from "../../redux/hooks/reduxHooks";
import { formatText } from "../../utils/formater";
import { Product } from "../../utils/Types";
import { ProductCardStyled } from "./Styled.ProductCard";
import { addItem } from "../../redux/reducers/Reducer.Cart";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [index, setIndex] = React.useState<number>(0);
  const [slideFlag, setSlideFlag] = React.useState<boolean>(false);
  const [slideDirection, setSlideDirection] = React.useState<string>("");

  const handleClick = (direction?: string): void => {
    let temp: number;

    if (direction === "left") {
      setSlideFlag(true);
      setSlideDirection("left");
      setTimeout(() => {
        setIndex((prev) => {
          temp = prev - 1;
          if (temp < 0) {
            temp = product.images.length - 1;
          }

          return temp;
        });
      }, 300);
    } else {
      setSlideFlag(true);
      setSlideDirection("right");
      setTimeout(() => {
        setIndex((prev) => {
          temp = prev + 1;
          if (temp > product.images.length - 1) {
            temp = 0;
          }

          return temp;
        });
      }, 300);
    }
  };

  React.useEffect(() => {
    let id = setTimeout(() => {
      setSlideFlag(false);
      //setSlideDirection("");
    }, 300);

    return () => clearTimeout(id);
  }, [slideFlag]);

  return (
    <ProductCardStyled slideDirection={slideDirection} flag={slideFlag}>
      <h3>{product.title}</h3>
      <div className="arrows">
        <span className="arrow-left" onClick={() => handleClick("left")}>
          {"<"}
        </span>
        <span className="arrow-right" onClick={() => handleClick()}>
          {">"}
        </span>
      </div>
      <img src={product.images[index]} alt={product.title} />
      <p>{formatText(product.description)}</p>
      <div className="btn">
        <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>
      </div>
    </ProductCardStyled>
  );
};

export default ProductCard;
