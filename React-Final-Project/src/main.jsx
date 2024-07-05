// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CategoryProvider } from "./contexts/CategoriesContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ProductsProvider } from "./contexts/ProductsContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { AuctionProvider } from "./contexts/AuctionContext.jsx";
import { ColorProvider } from "./contexts/ColorContext.jsx";
import LoveProvider from "./contexts/LoveContext.jsx";
import { SocketProvider } from "./contexts/SocketContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";
import AddressProvider from "./contexts/AddressContext.jsx";
import { PostsProvider } from "./contexts/PostsContext.jsx";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";
import PaymentProvider from "./contexts/PaymentContext.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";
import ConversationProvider from "./contexts/ConversationsContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
    <LoaderProvider>
  <UserProvider>
    <ConversationProvider>
      
                  <CartProvider>
    <PaymentProvider>
      <AddressProvider>
        <ColorProvider>
          <LoveProvider>
            <CategoryProvider>
              <ProductsProvider>
                <AuctionProvider>
                    <BrowserRouter>
                      <SocketProvider>
                        <OrderProvider>
                          <PostsProvider>
                            <React.StrictMode>
                              <NotificationProvider>
                                <App />
                              </NotificationProvider>
                            </React.StrictMode>
                          </PostsProvider>
                        </OrderProvider>
                      </SocketProvider>
                    </BrowserRouter>
                </AuctionProvider>
              </ProductsProvider>
            </CategoryProvider>
          </LoveProvider>
        </ColorProvider>
      </AddressProvider>
    </PaymentProvider>
                  </CartProvider>

    </ConversationProvider>
  </UserProvider>
    </LoaderProvider>
);
