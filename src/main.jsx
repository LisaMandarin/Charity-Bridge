import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './lib/context/user.jsx'
import { StorageProvider } from './lib/context/storage.jsx'
import { UserProfileProvider } from './lib/context/userProfile.jsx'
import { ProductStorageProvider } from './lib/context/productStorage.jsx'
import { ProductInfoProvider } from './lib/context/productInfo.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <StorageProvider>
          <UserProfileProvider>
            <ProductStorageProvider>
              <ProductInfoProvider>
                <App />
              </ProductInfoProvider>
            </ProductStorageProvider>
          </UserProfileProvider>
        </StorageProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)


