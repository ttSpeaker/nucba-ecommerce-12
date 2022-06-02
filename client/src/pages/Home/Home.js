import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Wrap, WrapItem } from "@chakra-ui/react";

const Home = () => {


    // TRAER EL LISTADO DE PRODUCTOS DE LA DB
  const data = [
    {
      imageURL:
        "https://cf.shopee.com.ar/file/2b59a8c6b1012d1a6a7d5c2c8a12585f_tn",
      name: "Gameboy",
      price: 124.35,
    },

    {
      imageURL:
        "https://cf.shopee.com.ar/file/1dfd71af76b06a0fc553f5259cd6def0_tn",
      name: "Family",
      price: 250.99,
    },

    {
      imageURL:
        "https://cf.shopee.com.ar/file/098b3cf0619ec377a8eb5f32075c0a69_tn",
      name: "Play2",
      price: 450.50,
    },

    {
        imageURL:
          "https://cf.shopee.com.ar/file/6c15685755a3518a9dfee9d6aabf7687_tn",
        name: "Sega",
        price: 110.80,
      },
  ];

 

  return (
    <div>
      <Navbar />
      <Wrap spacing="20px" align="center" shouldWrapChildren="true">
        {data.map( (p, index)  => 
                <WrapItem>
                    <ProductCard imageURL = {p.imageURL} name = {p.name} price = {p.price} />
                </WrapItem>
            )}          
      </Wrap>
    </div>
  );
};

export default Home;
