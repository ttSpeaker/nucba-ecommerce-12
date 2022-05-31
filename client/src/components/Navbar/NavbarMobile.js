import { Box, Text, Stack, Badge, Menu, MenuButton, MenuList, MenuItem, IconButton, MenuGroup } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { TiShoppingCart } from "react-icons/ti";
import { NavLink } from 'react-router-dom'






const NavbarMobile = () => {

  return (

    <Stack display='flex' direction='row' justifyContent= 'space-between' bg='blackAlpha.300' p={6}>
        <NavLink to={'/home'}><Text fontWeight='black' fontSize='2xl'>
            NUCBA Ecommerce
        </Text></NavLink>
        <Menu >
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                size='md'
                variant='outline'
            />
            <MenuList bg='blackAlpha.300' mt={6} >
                <MenuGroup fontWeight='bold'>
                <MenuItem >
                    <NavLink to={'/register'}><Text >Register</Text></NavLink>
                </MenuItem>
                <MenuItem >
                     <NavLink to={'/login'}><Text>Login</Text></NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to={'/admin'}><Text>Admin</Text></NavLink>
                </MenuItem>
                <MenuItem >
                    <NavLink to={'/cart'}><Box size='small' fontSize='xl' textAlign='left' bg='trasparent' border='1px' px={2} py={1} display='flex' gap={1}>
                        <TiShoppingCart/>
                        <Badge variant='outline' colorScheme={'blackAlpha'} >0</Badge>
                    </Box></NavLink>
                </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    </Stack>
  )
}

export default NavbarMobile