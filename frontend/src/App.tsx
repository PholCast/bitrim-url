import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { LinkCreated } from './pages/LinkCreated'

function App() {
  return (
    <>

      <BrowserRouter>
        <Header />

        <main className='flex-1 flex-col w-full flex justify-center items-center'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<LinkCreated />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
