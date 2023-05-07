import {
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Image,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import spotifyLogo from "../Assets/Images/spotify_logo.png";

const LinkItems = [
  { name: "For You", icon: FiHome },
  { name: "Top Tracks", icon: FiTrendingUp },
  { name: "Favorites", icon: FiCompass },

  { name: "Recently Played", icon: FiSettings },
];

const HomePage = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex>
        <Box border="5px solid green">
          <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
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
              size="full"
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
        </Box>

        <Box w={"60%"} border="2px solid red">
          
        </Box>
        <Box w={"30%"} border="4px solid blue"></Box>
      </Flex>
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }) => {
  let [forYou, setForYou] = useState(true);
  let [topTracks, setTopTracks] = useState(false);
  let [favorite, setFavorite] = useState(false);
  let [recentlyPlayed, setRecentlyPlayed] = useState(false);
  let handleForyou = () => {
    setForYou(true);
    setTopTracks(false);
    setFavorite(false);
    setRecentlyPlayed(false);
  };

  let handleTopTracks = () => {
    setForYou(false);
    setTopTracks(true);
    setFavorite(false);
    setRecentlyPlayed(false);
  };

  let handleFavorites = () => {
    setForYou(false);
    setTopTracks(false);
    setFavorite(true);
    setRecentlyPlayed(false);
  };

  let handleRecentlyPlayed = () => {
    setForYou(false);
    setTopTracks(false);
    setFavorite(false);
    setRecentlyPlayed(true);
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text> */}
        <Image src={spotifyLogo} bgColor={"red"} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <NavItem onClick={handleForyou}>For You</NavItem>
      <NavItem onClick={handleTopTracks}>Top Tracks</NavItem>
      <NavItem onClick={handleFavorites}>Favorites</NavItem>
      <NavItem onClick={handleRecentlyPlayed}>Recently Played</NavItem>
    </Box>
  );
};

// interface NavItemProps extends FlexProps {
//   icon: IconType;
//   children: ReactText;
// }
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

// interface MobileProps extends FlexProps {
//   onOpen: () => void;
// }
const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

export default HomePage;
