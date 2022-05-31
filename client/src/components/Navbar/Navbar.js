import React from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import NavbarLarge from './NavbarLarge'
import NavbarMobile from './NavbarMobile'

const Navbar = () => {

    const [isMobile] = useMediaQuery('(max-width: 900px)')

  return (
      <>
        { isMobile ? <NavbarMobile/> : <NavbarLarge/> }
      </>
  )
}

export default Navbar