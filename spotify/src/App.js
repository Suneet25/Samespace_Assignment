import logo from "./logo.svg";
import "./App.css";

import HomePage from "./Pages/HomePage";
import AllRoutes from "./Components/AllRoutes";
import { Box } from "@chakra-ui/react";
import MyComponent from "./Components/Test";

function App() {
  return (
    <Box className="App">
      <AllRoutes />
      {/* <MyComponent /> */}
    </Box>
  );
}

export default App;
