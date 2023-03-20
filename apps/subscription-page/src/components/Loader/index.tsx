import { Center, Flex, Spinner } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Center height={"100%"} width={"100%"} color={"white"}>
      <Flex height={10} width={10}>
        <Spinner />
      </Flex>
    </Center>
  );
};
