import React, { useEffect, useRef, useState } from 'react';

import { useMapbox } from '../hooks/useMapbox';

const puntoInicial={
  lng:5,
  lat:34,
  zoom:5
}
export const MapaPage = () => {

  const {setRef, coords} = useMapbox(puntoInicial);
  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat:{coords.lat} | zoom:{coords.zoom}
      </div>    
      <div 
          ref={setRef}
          className="mapContainer"
      />     
    </>   
  )
}
