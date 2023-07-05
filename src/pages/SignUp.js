import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

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
  Alert,
} from '@chakra-ui/react';

export const SignUp = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const isError = email === '';

  const handleLogin = () => {
    if (email === '') {
      setError(true);
    } else {
      if (!email.endsWith('@vitstudent.ac.in')) {
        setError(true);
      } else {
        setError(false);
        // Perform login logic
        if (password === repassword && email !== '') {
          Axios.get('https://iot-project-red.vercel.app/users')
            .then((response) => {
              console.log(response.data);
              for (var i = 0; i < response.data.length; i++) {
                if (
                  email === response.data[i]._id &&
                  response.data[i].password === null
                ) {
                  Axios.post('https://iot-project-red.vercel.app/signup', {
                    username: email,
                    password: password,
                  })
                    .then((e) => {
                      console.log(e);
                      navigate('/');
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                  return; // Return without navigating if username exists with null password
                } else if (email === response.data[i]._id) {
                  alert('User already exists');
                  return; // Return without navigating if username exists with non-null password
                }
              }
              Axios.post('https://iot-project-red.vercel.app/signup', {
                username: email,
                password: password,
              })
                .then((e) => {
                  console.log(e);
                  navigate('/');
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("Password and Re-Enter Password don't match");
        }
      }
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRePassword = (e) => {
    setRePassword(e.target.value);
  };

  return (
    <>
      <ChakraProvider>
        <Box bgColor="grey" h="717px">
          <Center>
            <Box boxShadow="dark-lg" p="0" rounded="md" bg="white" mt={10}>
              <Card maxW="sm">
                <CardBody mt={0}>
                  <Center>
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnhMZxaknowE4DkGwaUx-kpyrcIGbVkJxTSA&usqp=CAU"
                      alt="Tvs Logo"
                      borderRadius="lg"
                    />
                  </Center>
                  <Center>
                    <Stack mt="0" spacing="3">
                      <Center>
                        <Heading size="md">Welcome to Bus Tracker</Heading>
                      </Center>

                      <FormControl isRequired isInvalid={isError}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          placeholder="Enter Email"
                          type="email"
                          value={email}
                          onChange={handleInputChange}
                        />
                        {!error ? (
                          <FormHelperText></FormHelperText>
                        ) : (
                          <FormErrorMessage>
                            {email === ''
                              ? 'Email is required.'
                              : 'Email must be in the form of @vitstudent.ac.in'}
                          </FormErrorMessage>
                        )}
                      </FormControl>

                      <FormLabel>Password</FormLabel>
                      <InputGroup size="md">
                        <Input
                          pr="4.5rem"
                          type={show ? 'text' : 'password'}
                          placeholder="Enter password"
                          onChange={handlePassword}
                        />
                      </InputGroup>

                      <FormLabel>Re-Enter Password</FormLabel>
                      <InputGroup size="md">
                        <Input
                          pr="4.5rem"
                          type={show ? 'text' : 'password'}
                          placeholder="Enter password"
                          onChange={handleRePassword}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </Stack>
                  </Center>
                </CardBody>

                <CardFooter>
                  <ButtonGroup spacing="5">
                    <Button
                      ml={9}
                      variant="solid"
                      colorScheme="blue"
                      onClick={handleLogin}
                    >
                      SignUp
                    </Button>
                    <Text as="u">
                      Already have an account? <Link to="/">Login</Link>
                    </Text>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Box>
          </Center>
        </Box>
      </ChakraProvider>
    </>
  );
};
