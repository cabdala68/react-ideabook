import { Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { Community } from "../../atoms/communitiesAtom";
import { FaRobot } from "react-icons/fa";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="green.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="90%" maxWidth="860px" border="1px solid red">
          <Icon
            as={FaRobot}
            fontSize={64}
            position="relative"
            top={-3}
            color="blue.500"
            border="4px solid white"
            borderRadius="50%"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
