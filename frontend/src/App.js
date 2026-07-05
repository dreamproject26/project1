import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Founder from '@/pages/Founder';
import Ventures from '@/pages/Ventures';
import VentureDetail from '@/pages/VentureDetail';
import Services from '@/pages/Services';
import Impact from '@/pages/Impact';
import Journey from '@/pages/Journey';
import Proposal from '@/pages/Proposal';
import Media from '@/pages/Media';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/ventures" element={<Ventures />} />
          <Route path="/ventures/:slug" element={<VentureDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}

export default App;
