import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';


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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const center = [12.9692, 79.1559];

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state;
  console.log(username);

  const [users, setUsers] = useState([]);
  const [amount, setAmount] = useState(0);

  const girls = ["bus1","bus2","bus3"];

  const handleAmount = () => {
    Axios.get("https://iot-project-red.vercel.app/users")
      .then((res) => {
        const arr = res.data;
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]._id === username) {
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

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const handleUserSelection = (value) => {
    let updatedSelectedUsers = [];

    if (value === "girls") {
      updatedSelectedUsers = ["bus1", "bus2", "bus3"];
    } else if (value === "boys") {
      updatedSelectedUsers = ["bus4", "bus5", "bus6"];
    }

    setSelectedUsers(updatedSelectedUsers);
  };

  const filteredUsers = users.filter((user) => selectedUsers.includes(user._id));

  const blueIcon = L.icon({
    iconUrl: "data:image/png;base64,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",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const pinkIcon = L.icon({
    iconUrl: "data:image/png;base64,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",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

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
            <Menu>
              <MenuButton as={IconButton} icon={<Avatar />} variant="outline" zIndex="9999" />
              <MenuList zIndex="9999">
                <MenuItem>Balance: {amount}</MenuItem>
                <MenuItem onClick={() => navigate("/")}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        <Box flex="1">
          <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {users.map((user) => (
              <Marker
                key={user._id}
                position={[user.latitude, user.longitude]}
                icon={["bus1", "bus2", "bus3"].includes(user._id) ? pinkIcon : blueIcon}
              >
                <Popup>{user._id}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
        <Flex bg="white" p={4} height="60px" align="center" justify="space-between">
          <Box>&copy; VIT. All Rights Reserved.</Box>
          <Box>
            <a href="https://vit.ac.in/">Website</a> |{" "}
            <a href="https://www.instagram.com/vellore_vit/?hl=en">Instagram</a> |{" "}
            <a href="https://www.youtube.com/channel/UCA9pirjKrKlg2bCvPKRDkyg">YouTube</a>
          </Box>
        </Flex>
        
      </Flex>
    </ChakraProvider>
  );
}

export default Home;
