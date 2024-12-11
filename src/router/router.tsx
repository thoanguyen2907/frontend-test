 import {  createBrowserRouter } from "react-router-dom";
 import Root from "@/pages/Root";
import HomePage from "@/pages/HomePage";
import ProductDetail from "@/pages/ProductDetail";

 export const router = createBrowserRouter([
    {
      path: "/", 
      element: <Root/>,
      children: [
        {
      path: "/", 
      element: <HomePage/>
    }, 
    {
      path: "/products/:id", 
      element: <ProductDetail/>
    }
      ]
    }
  ])