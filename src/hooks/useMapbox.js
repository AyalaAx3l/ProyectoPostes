import {useRef, useState, useEffect, useCallback} from 'react';
import mapboxgl from 'mapbox-gl';
import {v4} from 'uuid';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXlhbDRheDMxIiwiYSI6ImNsY2Zkdzc2cTR6bzQzcG1udTd4eTBuYWsifQ.2DnCColFAorJ-d-gyW18Mg';

export const useMapbox = (puntoInicial) => {
  
    //Referencia al DIV del mapa
    const mapaDiv = useRef();
    const setRef=useCallback((node)=>{
        mapaDiv.current = node;
    },[]);
    
    // Referencia los marcadores
    const marcadores = useRef({});

    // Mapa y coords
    const mapa = useRef();
    const [coords, setCoords] = useState(puntoInicial);
  
    useEffect(()=>{
  
      const map = new mapboxgl.Map({
        container: mapaDiv.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center:[puntoInicial.lng, puntoInicial.lat],
        zoom: puntoInicial.zoom
      });
  
      mapa.current = map; 
    },[puntoInicial]);
  
    // Movimiento del mapa
    useEffect(()=>{
      mapa.current?.on('move',()=>{
        const {lng, lat} = mapa.current.getCenter();
        setCoords({
            lng: lng.toFixed(4),
            lat: lat.toFixed(4),
            zoom: mapa.current.getZoom().toFixed(2)
          })
      }); 
    },[]);


    //Agregar marcadores al hacer click
    useEffect(()=>{

        mapa.current?.on('click',(ev)=>{
            
            const { lng, lat } = ev.lngLat;

            const marker = new mapboxgl.Marker();
            marker.id = v4(); 

            marker
              .setLngLat([lng,lat])
              .addTo(mapa.current)
              .setDraggable(true);

              marcadores.current[marker.id] = marker;

        });
    },[]);


   

    return {

        coords,
        marcadores,
        setRef
    } 
}

