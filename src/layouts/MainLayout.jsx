import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

import '../App.css'

function MainLayout() {
  return (
    //tambah main untuk imporve accessibility and SEO 
    //div untuk stylying
    <div>
      <Header />
        <main className='main'>
            <Outlet />
        </main>
      <Footer />
    </div>
  )
}

export default MainLayout