import Navbar from "../../components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  Icon,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FileUpload } from "../../components/FileUpload/FileUpload";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const {
    handleSubmit,
    register,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    console.log(title, price);
    console.log(values);
  }
  return (
    <div>
      <Navbar />
      <Box position={"relative"}>
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Add new product
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
            </Stack>
            <Box mt={10}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Product title</FormLabel>
                    <Input
                      onChange={(event) => setTitle(event.currentTarget.value)}
                      placeholder="Product title"
                      name="title"
                      id="title_id"
                      type="text"
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input
                      onChange={(event) => setPrice(event.currentTarget.value)}
                      placeholder="100.00"
                      bg={"gray.100"}
                      name="price"
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                  </FormControl>
                  <FileUpload
                    name="product_picture"
                    acceptedFileTypes="image/*"
                    isRequired={true}
                    placeholder="Select picture"
                    control={control}
                  >
                    Product picture
                  </FileUpload>
                </Stack>
                <Button
                  type="submit"
                  fontFamily={"heading"}
                  mt={8}
                  w={"full"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                  }}
                >
                  Submit
                </Button>
              </form>
            </Box>
            form
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default Admin;
