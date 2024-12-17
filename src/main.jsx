import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./lib/context/user.jsx";
import { AvatarStorageProvider } from "./lib/context/AvatarStorage.jsx";
import { UserProfileProvider } from "./lib/context/userProfile.jsx";
import { ProductStorageProvider } from "./lib/context/productStorage.jsx";
import { ProductInfoProvider } from "./lib/context/productInfo.jsx";
import { MessageProvider } from "./lib/context/messages.jsx";
import App from "./App.jsx";
import "./styles/main.css";
import { ReviewsProvider } from "./lib/context/reviews.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AvatarStorageProvider>
          <UserProfileProvider>
            <ProductStorageProvider>
              <ProductInfoProvider>
                <MessageProvider>
                  <ReviewsProvider>
                    <App />
                  </ReviewsProvider>
                </MessageProvider>
              </ProductInfoProvider>
            </ProductStorageProvider>
          </UserProfileProvider>
        </AvatarStorageProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
