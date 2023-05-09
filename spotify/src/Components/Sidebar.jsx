import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  Stack,
  VStack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import spotifyLogo from "../Assets/Images/spotify_logo.png";
import { NavLink } from "react-router-dom";
import { color } from "framer-motion";

const LinkItems = [
  { name: "For You", icon: FiHome, path: "/" },
  { name: "Top Tracks", icon: FiTrendingUp, path: "/top-tracks" },
  { name: "Favourites", icon: FiCompass, path: "/favorites" },

  { name: "Recently Played", icon: FiSettings, path: "/recently-played" },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" color={"white"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      backgroundColor={{
        base: "rgb(54,20,1)",
        sm: "rgb(54,20,1)",
        lg: "transparent",
        xl: "transparent",
      }}
      color={"white"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={spotifyLogo} w={"120px"} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((item, index) => (
        <Text
          key={index}
          textAlign={"left"}
          px={8}
          py={2}
          mt={1}
          fontSize={"20px"}
        >
          <NavLink
            to={item.path}
            style={({ isActive }) => {
              return isActive ? { opacity: "100" } : { opacity: 0.4 };
            }}
          >
            {item.name}
          </NavLink>
        </Text>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Box
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      pos={"sticky"}
      top={0}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Box>
  );
};
