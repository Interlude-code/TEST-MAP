import { Inter } from 'next/font/google'
import React, { useRef, useEffect, useState, useCallback } from 'react';

import mapboxgl, { LngLatLike } from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2F1dW1lIiwiYSI6ImNsZ3h5djI3NzA0Y3YzcXJ0NDZncTFiOXkifQ.CMJ9a-sXjqChMntwa3zQRA';

const inter = Inter({ subsets: ['latin'] })

const initialPoint = {
  lng: -75.5722,
  lat: 6.2420,
  zoom: 12.50
}

export default function Home() {

  useEffect(() => {

    // Crear una instancia del mapa
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [initialPoint.lng, initialPoint.lat], // Reemplaza con las coordenadas de inicio deseadas
      zoom: initialPoint.zoom, // Reemplaza con el nivel de zoom deseado
    });

    // Agregar un marcador al mapa
    const addMarker = (lngLat: LngLatLike) => {

      const markerHeight = 50;
      const markerRadius = 10;
      const linearOffset = 25;
      const popupOffsets: any = {
      'top': [0, 0],
      'top-left': [0, 0],
      'top-right': [0, 0],
      'bottom': [0, -markerHeight],
      'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'left': [markerRadius, (markerHeight - markerRadius) * -1],
      'right': [-markerRadius, (markerHeight - markerRadius) * -1]
      };
      const popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
      .setLngLat(lngLat)
      .setHTML(`
        <div>
          <h1>HOla</h1>
          <h2>pezado</h2>
        </div>
      `)
      .setMaxWidth("300px")
      .addTo(map);

      
      new mapboxgl.Marker()
      .setLngLat(lngLat)
      .addTo(map)
      .setPopup(popup);
    };

    // Ejemplo de uso para agregar un marcador
    const markerCoordinates: LngLatLike = [initialPoint.lng, initialPoint.lat]; // Reemplaza con las coordenadas del marcador
    addMarker(markerCoordinates);
    addMarker([-75.5489, 6.1456])

    // Limpia el mapa y los recursos al desmontar el componente
    return () => map.remove();
  }, []);


  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}
