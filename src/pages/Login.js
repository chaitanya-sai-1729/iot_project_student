import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import {
  Box,
  Card,
  Image,
  Stack,
  Heading,
  Button,
  CardBody,
  CardFooter,
  ChakraProvider,
  Center,
  Input,
  InputLeftAddon,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Divider,
  Text,
  ButtonGroup,
  Checkbox,
  Flex,
  HStack,
  useColorModeValue,

  




} from '@chakra-ui/react'


function Login() {
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => setInput(e.target.value)

  const isError = input === ''

  const handleLogin = async () => {
    try {

      const allUsers = await Axios.get("https://iot-project-red.vercel.app/users").then((e) => {
        console.log(e.data);
        const arr = e.data;
        var len = 0;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i]._id === input && arr[i].password === password) {
            navigate('/front',{ state: { username: input } });
          }
          else if(arr[i]._id === input && arr[i].password != password){

            alert("Incorrect Password");
          }
          else{
            len = len +1;
          }
        }
        if(len === arr.length){
          alert("Incorrect Username or Password");
        }

      });
    } catch (e) {
      console.log(e);
    }

  }

  const [showPassword, setShowPassword] = useState(false);


  return (
    <>

      <ChakraProvider>
        <Flex minH={"100vh"} justify={"center"} align={"center"}>
        <Box>
          <Center>
            <Box boxShadow='dark-lg' p='0' rounded='md' bg='white' mt={0}>
              <Card maxW='sm'>

                <CardBody mt={0}>
                  <Center>
                    <Image
                      src='data:image/png;base64,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'
                      alt='Tvs Logo'
                      borderRadius='lg'
                      height='300px'
                    />
                  </Center>
                  <Center>
                    <Stack mt='0' spacing='3'>

                      <Center><Heading size='md'>Welcome to Bus Tracker</Heading></Center>
                      <Center></Center>

                      <FormControl isRequired isInvalid={isError}>
                        <FormLabel>Email</FormLabel>
                        <Input type='email' value={input} onChange={handleInputChange} />
                        {!isError ? (
                          <FormHelperText></FormHelperText>
                        ) : (
                          <FormErrorMessage>Email is required.</FormErrorMessage>
                        )}
                      </FormControl>
                      <FormLabel>Password</FormLabel>
                      <InputGroup size='md'>
                        <Input
                          pr='4.5rem'
                          type={show ? 'text' : 'password'}
                          placeholder='Enter password'
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>

                    </Stack>
                  </Center>
                </CardBody>

                <CardFooter>
                  <ButtonGroup spacing='5'>
                    <Button ml={9} variant='solid' colorScheme='blue' onClick={handleLogin} >
                      Login
                    </Button>
                    <Text as='u'>Dont have an account? <Link to='/SignUp'>SignUp</Link></Text>
                  </ButtonGroup>
                </CardFooter>



              </Card>
            </Box>
          </Center>
        </Box>

        </Flex>
      </ChakraProvider>
    </>
  );
}

export default Login;
