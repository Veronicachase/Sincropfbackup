import PoolIcon from '@mui/icons-material/Pool';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import RoofingIcon from '@mui/icons-material/Roofing';
import DeckIcon from '@mui/icons-material/Deck';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import BathtubIcon from '@mui/icons-material/Bathtub';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import LivingIcon from '@mui/icons-material/Living';

export const sectionMapping = {
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
