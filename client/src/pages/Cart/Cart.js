import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import React from "react";
import {
  Flex,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
  Link
} from "@chakra-ui/react";

import {  BsFillTrashFill } from "react-icons/bs";
import { Link as RouteLink } from "react-router-dom";


const Cart = () => {

    // TRAER EL CARRITO DE COMPRAS DEL USUSARIO DE LA DB
    const data = [
      {
        name: "Gameboy",
        quantity: 1,
        price: 124.35,
      },
  
      {
        name: "Family",
        quantity: 2,
        price: 250.99,
      },
  
      {        
        name: "Play2",
        quantity: 1,
        price: 450.50,
      },
  
      {         
        name: "Sega",
        quantity: 4,
        price: 110.80,
      },
    ];
    
  const total = data.reduce((acc, cur) => acc + cur.price, 0);
  
  
  const header = ["product", "quantity", "price", "actions"];

  const handleCheckout = () => {
    console.log("To checkout");
  }
 

  return (
    <div>
      
    <Navbar />
    <Flex
      w="full"
      bg="#2D3748"
      p={50}
      alignItems="center"
      justifyContent="center"      
    >
      <Table
        w="full"
        rounded={10}
        bg={useColorModeValue("white", "black")}     
        display={{
          base: "block",
          md: "table",
        }}
        sx={{
          "@media print": {
            display: "table",
          },
        }}
      >
        <Thead
          display={{
            base: "none",
            md: "table-header-group",
          }}
          sx={{
            "@media print": {
              display: "table-header-group",
            },
          }}
        >
          <Tr>
            {header.map((x) => (
              <Th key={x}>{x}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody
          display={{
            base: "block",
            lg: "table-row-group",
          }}
          sx={{
            "@media print": {
              display: "table-row-group",
            },
          }}
        >
          {data.map((token, tid) => {
            return (
              <Tr
                key={tid}
                display={{
                  base: "grid",
                  md: "table-row",
                }}
                sx={{
                  "@media print": {
                    display: "table-row",
                  },
                  gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                  gridGap: "10px",
                }}
              >
                {Object.keys(token).map((x) => {
                  return (
                    <React.Fragment key={`${tid}${x}`}>
                      <Td
                        display={{
                          base: "table-cell",
                          md: "none",
                        }}
                        sx={{
                          "@media print": {
                            display: "none",
                          },
                          textTransform: "uppercase",
                          color: "black",
                          fontSize: "xs",
                          fontWeight: "bold",
                          letterSpacing: "wider",
                          fontFamily: "heading",
                        }}
                      >
                        {x}
                      </Td>
                      <Td
                        color={"gray.500"}
                        fontSize="md"
                        fontWeight="hairline"
                      >
                        {token[x]}
                      </Td>
                    </React.Fragment>
                  );
                })}
                <Td
                  display={{
                    base: "table-cell",
                    md: "none",
                  }}
                  sx={{
                    "@media print": {
                      display: "none",
                    },
                    textTransform: "uppercase",
                    color: "black",
                    fontSize: "xs",
                    fontWeight: "bold",
                    letterSpacing: "wider",
                    fontFamily: "heading",
                  }}
                >
                  Actions
                </Td>
                <Td>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>            
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<BsFillTrashFill />}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Flex flexDirection = "column">
          <Box fontSize= "xl" fontWeight="bold" textTransform= "uppercase" marginLeft = "20px">
              total: $ {total}
          </Box>
          <Box>
             <Link as={RouteLink} to={'/home'}>
              <Button buttonCaption = "Continue Shopping" buttonColor = "#000000"/>
             </Link>
            <Button buttonCaption = "Checkout" buttonColor = "#38A169"  onHandleButton = {handleCheckout}/>
          </Box>
        </Flex>
      </Table>     
    </Flex>
    </div>
  );
};

export default Cart;




