import logo from "./logo.svg";
import "./App.css";

import HomePage from "./Pages/HomePage";
import AllRoutes from "./Components/AllRoutes";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box className="App">
      <AllRoutes />
    </Box>
  );
}

export default App;
