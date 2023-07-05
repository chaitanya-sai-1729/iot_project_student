import React, { useState, useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import Axios from "axios";
import {
  Box,
  ChakraProvider,
  Flex,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const center = { lat: 12.839977, lng: 77.6644473 };

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state;
  console.log(username);

  const [users, setUsers] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [amount,setAmount] = useState(0);
  const handleAmount = () => {
    Axios.get("https://iot-project-red.vercel.app/users")
      .then((res) => {
        const arr = res.data;
        console.log(arr);
        // Further processing or updating state with allUsers data
        for(let i=0;i<arr.length;i++){
          if(arr[i]._id === username){
            console.log("hi");
            setAmount(arr[i].amount);
          }
        }
      })
      .catch((error) => {
        console.log("Error fetching all users:", error);
      });
  };

  useEffect(() => {
    handleAmount();
    Axios.get("https://iot-project-red.vercel.app/admin")
      .then((res) => {
        const usersData = res.data;
        console.log(usersData);
        setUsers(usersData);
        
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
  }, []);

  if (!isLoaded) {
    return <div>Loading....</div>;
  }

  const handleMarkerClick = () => {};

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const handleUserSelection = (user) => {
    const updatedSelectedUsers = [...selectedUsers];
    const index = updatedSelectedUsers.indexOf(user._id);

    if (index > -1) {
      updatedSelectedUsers.splice(index, 1); // Uncheck the user
    } else {
      updatedSelectedUsers.push(user._id); // Check the user
    }

    setSelectedUsers(updatedSelectedUsers);
  };

  const filteredUsers = users.filter((user) => selectedUsers.includes(user._id));

 
  

  

  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Flex bg="white" height="60px" p={4} align="center">
          <Box
            w="40px"
            h="40px"
            bg={`url("https://ict.iitk.ac.in/wp-content/uploads/vit-logo.jpg")`}
            bgSize="cover"
            borderRadius="full"
          />
          <HStack spacing={4} ml="auto" mr="10px">
            <Menu >
              <MenuButton  as={IconButton} icon={<Avatar />} variant="outline" />
              <MenuList>
                <MenuItem onClick={openProfile}>Select</MenuItem>
                <MenuItem >Balance: {amount}</MenuItem>
                <MenuItem onClick={() => navigate("/")}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        <Box flex="1">
          {isLoaded && (
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {filteredUsers.map((user) => (
                <Marker
                  key={user._id}
                  position={{ lat: user.latitude, lng: user.longitude }}
                  title={user._id}
                  onClick={handleMarkerClick}
                />
              ))}
            </GoogleMap>
          )}
        </Box>
        <Flex bg="white" p={4} height="60px" align="center" justify="space-between">
          <Box>&copy; VIT. All Rights Reserved.</Box>
          <Box>
            <a href="https://vit.ac.in/">Website</a> |{" "}
            <a href="https://www.instagram.com/vellore_vit/?hl=en">Instagram</a> |{" "}
            <a href="https://www.youtube.com/channel/UCA9pirjKrKlg2bCvPKRDkyg">YouTube</a>
          </Box>
        </Flex>
        <AlertDialog
          isOpen={isProfileOpen}
          leastDestructiveRef={undefined}
          onClose={closeProfile}
          motionPreset="slideInBottom"
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Select the Users to be shown</AlertDialogHeader>
            <AlertDialogBody>
              {users.map((user) => (
                <Box key={user._id}>
                  <Checkbox
                    defaultChecked={selectedUsers.includes(user._id)}
                    onChange={() => handleUserSelection(user)}
                  >
                    {user._id}
                  </Checkbox>
                </Box>
              ))}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={closeProfile}>Select</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Flex>
    </ChakraProvider>
  );
}

export default Home;
