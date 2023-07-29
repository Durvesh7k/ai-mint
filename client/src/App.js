import Navigation from "./component/Navigation"
import { useState } from "react"
import NftMint from "./pages/NftMint"
import { Routes, Route } from 'react-router-dom'
import History from "./pages/History"
import { DataContextProvider } from "./context/DataContxetProvider"

import React from 'react'

const App = () => {
  const [white, setWhite] = useState(false);

  return (
    <div >
      <DataContextProvider>
        <Navigation white={white} setWhite={setWhite} />

        <Routes>
          <Route path="/" element={<NftMint white={white} />} />
          <Route path="/history" element={<History white={white} />} />
        </Routes>
      </DataContextProvider>

    </div>
  )
}

export default App
