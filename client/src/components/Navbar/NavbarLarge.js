import { Box, Text, Stack, Badge, Flex, Spacer } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti";




const NavbarLarge = () => {

  return (

    <Flex alignItems='baseline' p={6} bg='blackAlpha.300' gap={6}>
        <NavLink to={'/home'}><Text fontWeight='black' fontSize='2xl'>
            NUCBA Ecommerce
        </Text></NavLink>
          <Stack direction='row' fontWeight='bold' gap={4}>
              <NavLink to={'/register'}><Text>Register</Text></NavLink>
              <NavLink to={'/login'}><Text>Login</Text></NavLink>
              <NavLink to={'/admin'}><Text>Admin</Text></NavLink>
          </Stack>
          <Spacer/>
          <Stack>
              <NavLink to={'/cart'}><Box size='small' fontSize='20px' textAlign='left' bg='trasparent' border='1px' paddingX={4} paddingY={2} display='flex' gap={2}>
                  <TiShoppingCart/>
                  <Badge variant='outline' color='black' fontWeight='bold'>0</Badge>
              </Box></NavLink>
          </Stack>
    </Flex>
  )
}

export default NavbarLarge