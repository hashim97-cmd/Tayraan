'use client'
import React from 'react'
import Navbar from '../../components/shared/navbar'
import Footer from '../../components/website/home/Footer';

const Layout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div>
            <div className="sticky top-0 left-0 z-50">
                <Navbar />
            </div>
            {children}
            <Footer />
        </div>
    ) 
}

export default Layout
