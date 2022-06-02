import {
    Flex,   
    Box,
    Image,   
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
  } from '@chakra-ui/react';

  import { FiShoppingCart } from 'react-icons/fi'; 
  
  const RenderProductCard = ( {imageURL, name, price} ) => {
    return (
      <Flex p={5} w="full" alignItems="center" justifyContent="center" flexWrap = "wrap">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative">         
  
          <Image
            src={imageURL}
            alt={`Picture of ${name}`}
            w="15rem"
            roundedTop="lg"
          />
  
          <Box p="6">
            <Box d="flex" alignItems="baseline">             
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated>
                {name}
              </Box>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}>
                <chakra.a href={'#'} display={'flex'}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                </chakra.a>
              </Tooltip>
            </Flex>
  
            <Flex justifyContent="space-between" alignContent="center">      
              <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                <Box as="span" color={'white'} fontSize="lg" marginRight = "10px">
                  $ 
                </Box>
                {price.toFixed(2)}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    );
  }
  
  export default RenderProductCard;