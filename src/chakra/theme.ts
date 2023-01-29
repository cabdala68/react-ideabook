
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import {Button } from "./button";
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FAF089",
      // ...
      
    },
  },
    fonts:{
      body :"Open Sans, sans-serif",
    },
    styles:{
      global:()=>({
        body:{
       bg:"green.50",
    },
  }),
  },
  components:{
    Button,
    
  },
});