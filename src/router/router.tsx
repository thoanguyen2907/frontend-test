 import {  createBrowserRouter } from "react-router-dom";
 import Root from "@/pages/Root";
import HomePage from "@/pages/HomePage";
import ProductDetail from "@/pages/ProductDetail";
import EditProductForm from "@/pages/EditProductForm";

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
    }, 
     {
      path: "/products/edit/:id", 
      element: <EditProductForm/>
    }
      ]
    }
  ])