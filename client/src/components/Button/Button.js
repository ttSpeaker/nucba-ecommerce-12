import { Button, useColorModeValue } from '@chakra-ui/react';

export default function ClickMe( {buttonCaption, buttonColor, onHandleButton} ) {  

  return (
    <Button
    textTransform= "uppercase"
    padding = "10px"
    margin={5}
    px={1}
    bg={useColorModeValue(`${buttonColor}`, 'gray.900')}   
    color={'white'}
    rounded={'md'}
    _hover={{
      transform: 'translateY(-2px)',
      boxShadow: 'lg',
    }}
    onClick={onHandleButton}>
        
    {buttonCaption}
  </Button>
  );
}