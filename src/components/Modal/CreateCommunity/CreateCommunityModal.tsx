import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from '@chakra-ui/react'
import { async } from '@firebase/util'
import { Transaction } from '@google-cloud/firestore'
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi'
import { auth, firestore } from '../../../firebase/clientApp'

type CreateCommunityModalProps = {
  open: boolean
  handleClose: () => void
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth)
  const [communityName, setCommunityName] = useState('')
  const [charsRemaining, setCharsRemaining] = useState(21)
  const [communityType, setCommunityType] = useState('public')
  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return
    setCommunityName(event.target.value)
    // recalculate how many chars we have left
    setCharsRemaining(21 - event.target.value.length)
  }

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCommunityType(event.target.name)
  }

  const handleCreateCommunity = async () => {
    if(error) setError("")
    // Validate the community name
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        '  Idea Sharing Community names must be between 3-21 characters, and can only contain letters, numbers, or underscored',
      )
      return
    }
    setLoading(true)

    try {
      const communityDocRef = doc(firestore, 'communinities', communityName)

      await runTransaction(firestore, async(transaction)=>{
         // Check if the Community Exists in db(Database)

      const communityDoc = await transaction.get(communityDocRef)

      if (communityDoc.exists()) {
        throw new Error(
          `Sorry, i/${communityName} is already taken.Try another.`,
        )
      }

         //Create Community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
          //create ID
          // createAt,
          // number of Memebers
          //privacytype
        })

        // Create a communitySnippet on user
        transaction.set(doc(firestore,`users/${user?.uid}/communitySnippets`, communityName),{
          communityId: communityName,
          isModerator: true,

        })
      })
     
   
    } catch (error: any) {
      console.log('handleCreateCommunity error', error)
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create Idea Sharing Community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Idea Book Community names including capitalization cannot be
                changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                i/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text color={charsRemaining == 0 ? 'red' : 'gray.500'}>
                {charsRemaining}Characters remaining
              </Text>
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
              <Box mt={4}>
                <Text fontWeight={600} fontSize={15}></Text>
                {/* chechkbox */}
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType == 'public'}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view, post, and comment to this idea
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType == 'restricted'}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view this idea community, but only approved
                        users can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType == 'private'}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved ones can view and submit to this idea
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              colorScheme="blue"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Idea Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default CreateCommunityModal
