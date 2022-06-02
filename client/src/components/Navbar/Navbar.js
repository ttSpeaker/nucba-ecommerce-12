import { Box, Flex, Text, IconButton, Stack, Collapse, Link, useColorModeValue, useBreakpointValue, useDisclosure, Badge } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti";
import { Link as RouteLink } from "react-router-dom";
  
  export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link as={RouteLink} to={'/home'}
                _hover={{
                    textDecoration: 'none'
                }} >
                <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                fontWeight={'black'}
                color={useColorModeValue('gray.800', 'white')}
                >
                NUCBA Ecommerce
                </Text>
            </Link>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
  
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Link as={RouteLink} to={'/cart'} _hover={{
                    textDecoration: 'none'
                }}>
                <Box size='small' 
                    fontSize='20px' 
                    textAlign='left' 
                    bg='trasparent' 
                    border='1px' 
                    paddingX={4} 
                    paddingY={2} 
                    display='flex' 
                    gap={2} 
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.900')}
                    
                >
                    <TiShoppingCart/>
                    <Badge variant='outline' color='black' fontWeight='bold' textAlign='center' >0</Badge>
                </Box>
            </Link>
          </Stack>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
  
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>

                <Link
                    as={RouteLink} 
                    to={`/${navItem.href}`}
                    p={2}
                    fontSize={'sm'}
                    fontWeight={'bold'}
                    color={linkColor}
                    _hover={{
                        textDecoration: 'none',
                        color: linkHoverColor,
                    }}>
                    {navItem.label}
                </Link>
          </Box>
        ))}
      </Stack>
    );
  };
  
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, href }) => {
    const { onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={onToggle}>
        <Flex
          py={2}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <NavLink to={`/${href}`}>
            <Text
                fontWeight={600}
                color={useColorModeValue('gray.600', 'gray.200')}>
                {label}
            </Text>
          </NavLink>  
        </Flex>
      </Stack>
    );
  };
  
 const NAV_ITEMS = [
    {
      label: 'Register',
      href: 'register'
    },
    {
      label: 'Login',
      href: 'login'
    },
    {
      label: 'Admin',
      href: 'admin',
    },
  ];