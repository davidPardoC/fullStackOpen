import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserInfo from '../UserInfo'
import { Link as ChacraLink } from '@chakra-ui/react'

const NavigationMenu = () => {
  const user = useSelector((state) => state.user)
  return (
    <Box bg="teal.400" as="nav" padding={2}>
      <Flex justifyContent="space-between">
        <Box>
          <Link to="/blogs">
            <ChacraLink textDecor="underline" color="blue.700" as="span">
              Blogs
            </ChacraLink>
          </Link>
          <Link to="/users">
            <ChacraLink
              textDecor="underline"
              color="blue.700"
              as="span"
              marginLeft={1}
            >
              Users
            </ChacraLink>
          </Link>
        </Box>
        {user.isLoggedIn && <UserInfo user={user} />}
      </Flex>
    </Box>
  )
}

export default NavigationMenu
