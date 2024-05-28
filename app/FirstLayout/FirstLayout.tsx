"use client";
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ImageContextProvider } from '../contexts/ImagesContext';
import { RedirectContextProvider } from '../contexts/RedirectContext';
import SusuNavBar from '../components/SusuNavBar/SusuNavBar';
import SusuFooter from '../components/SusuFooter/SusuFooter';

function FirstLayout({children}:any) {
  return (
    <AuthProvider>
    <ImageContextProvider>
      <RedirectContextProvider>
      <SusuNavBar />
        {children}
      </RedirectContextProvider>
      <SusuFooter />
  </ImageContextProvider>
</AuthProvider>
  )
}

export default FirstLayout;