import React from 'react'
import { Center, Flex, Image } from '@chakra-ui/react'
import SearchInput from './SearchInput'
import RightContent from './RightContent/RightContent'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/clientApp'
import Directory from './Directory/Directory'

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth)
  return (
    <Flex
      bg="white"
      height="44px"
      padding=" 6px 12 px"
      justify={{ md: 'space-between' }}
    >
      <Flex
        align=" center"
        justify="space-between"
        width={{ base: '40px', md: 'auto', lg: '200px' }}
        mr={{ base: '40px', md: 2 }}
      >
        <Center w="100px" height="50px">
          <Image src="/images/sintra-logo.png" />
        </Center>
      </Flex>
      {user && <Directory />}

      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  )
}
export default Navbar
