import React from "react";
import { useAppSelector } from "../../redux/hooks/reduxHooks";
import ProductCard from "../productCard/ProductCard";
import { HomeStyled } from "./Styled.Home";

const Home: React.FC = () => {
  const products = useAppSelector((state) => state.reducerProducts.products);

  return (
    <HomeStyled>
      <h2>Products</h2>
      <div className="products">
        {products.slice(0, 12).map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </HomeStyled>
  );
};

export default Home;
