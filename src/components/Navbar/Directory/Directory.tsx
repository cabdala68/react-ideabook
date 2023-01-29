import { ChevronDownIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuList, Flex, Icon, Text } from '@chakra-ui/react'
import { TiHome } from 'react-icons/ti'

import React from 'react'
import Communities from './Communities'

const UserMenu: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        mr={2}
        ml={{ bas: 0, md: 2 }}
        _hover={{ outline: '1px solid', outllineColor: 'gray.200' }}
      >
        <Flex
          align=" center"
          justify="space-between"
          width={{ base: 'outo', lg: '200px' }}
        >
          <Flex align="center">
            <Icon
              fontSize={24}
              mr={{ base: 1, md: 2 }}
              color="green.500"
              as={TiHome}
            />
            <Text fontWeight={600} fontSize="10pt">
              Home
            </Text>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
        Communities
      </MenuList>
    </Menu>
  )
}
export default UserMenu
