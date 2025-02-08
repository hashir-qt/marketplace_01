import { CartProvider } from "@/components/CartContext";
import "../styles/globals.css"; // Adjust the path based on your setup
import { AppProps } from "next/app";


function MyApp({ Component, pageProps }: AppProps) {
  return (
  
    <CartProvider>
    
      <Component {...pageProps} />
  
    </CartProvider>

   
  );
}

export default MyApp;
