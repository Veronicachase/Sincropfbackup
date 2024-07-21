// src/context/MappingContext.js
import  { createContext, useState } from 'react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import PoolIcon from '@mui/icons-material/Pool';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import RoofingIcon from '@mui/icons-material/Roofing';
import DeckIcon from '@mui/icons-material/Deck';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LivingIcon from '@mui/icons-material/Living';

export const SectionMappingContext = createContext();

const initialSectionMapping = {
  pool: { icon: <PoolIcon />, name: 'Piscina' },
  kitchen: { icon: <KitchenIcon />, name: 'Cocina' },
  laundry: { icon: <LocalLaundryServiceIcon />, name: 'Lavandería' },
  roof: { icon: <RoofingIcon />, name: 'Techo' },
  terrace: { icon: <DeckIcon />, name: 'Terraza' },
  room: { icon: <BedroomParentIcon />, name: 'Habitación' },
  bathRoom: { icon: <BathtubIcon />, name: 'Baño' },
  hall: { icon: <ArrowCircleRightIcon />, name: 'Pasillo' },
  livingRoom: { icon: <LivingIcon />, name: 'Sala de estar' },
};

export const SectionMappingProvider = ({ children }) => {
  const [sectionMapping, setSectionMapping] = useState(initialSectionMapping);

  const updateSectionMapping = (newSections) => {
    const newSectionMapping = { ...sectionMapping };
    newSections.forEach(section => {
      if (!newSectionMapping[section]) {
        newSectionMapping[section] = { icon: <ArrowCircleRightIcon />, name: section };
      }
    });
    setSectionMapping(newSectionMapping);
  };

  return (
    <SectionMappingContext.Provider value={{ sectionMapping, updateSectionMapping }}>
      {children}
    </SectionMappingContext.Provider>
  );
};
