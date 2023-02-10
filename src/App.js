import Nftmint from "./Nftmint"
import Navigation from "./Navigation"
import { useState } from "react"
import Footer from "./Footer"

import React from 'react'

const App = () => {
  const [account, setAccount] = useState(null)

  return (
    <div>
      <Navigation account={account} setAccount = {setAccount} />
      <Nftmint />
      <Footer/>

    </div>
  )
}

export default App
