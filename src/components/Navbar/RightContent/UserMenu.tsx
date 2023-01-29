import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Text,
  Flex,
  Icon,
  MenuDivider,
} from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import { FaBrain } from 'react-icons/fa'
import { VscAccount } from 'react-icons/vsc'
import { IoSparkles } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLogin } from 'react-icons/md'

import React from 'react'
import { cpuUsage } from 'process'
import { auth } from '../../../firebase/clientApp'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '../../../atoms/authModalAtom'

type UserMenuProps = {
  user?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState)

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: '1px solid', outllineColor: 'gray.200' }}
      >
        <Flex>
          <Flex>
            {user ? (
              <>
                <Icon fontSize={24} mr={1} color="green.300" as={FaBrain} />
                <Flex
                  direction="column"
                  display={{ base: 'none', lg: 'flex' }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split('@')[0]}
                  </Text>
                  <Flex>
                    <Icon as={IoSparkles} color="brand.300" mr={1} />
                    <Text color="gray.400"> 1st User Sintra</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} color="green.400" mr={1} as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize={10}
              fontWeight={700}
              _hover={{ bg: 'green.400', color: 'white' }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize={10}
              fontWeight={700}
              _hover={{ bg: 'green.400', color: 'white' }}
              onClick={() => signOut(auth)}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize={20}
              fontWeight={700}
              _hover={{ bg: 'green.400', color: 'white' }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize={20}
              fontWeight={700}
              _hover={{ bg: 'green.400', color: 'white' }}
              onClick={() => setAuthModalState({ open: true, view: 'login' })}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  )
}
export default UserMenu
