import React, { useState, useRef, useEffect, RefObject } from 'react';

import './MapWrapper.css'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import Geometry from 'ol/geom/Geometry';
import { Paper } from '@material-ui/core';
import { DataType } from '../../type/DataType';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import {transform} from 'ol/proj'
import Style from 'ol/style/Style';
import { colors } from '../../theme/colors';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';

export interface MapWrapperProps {
  selectedData: DataType[]
  dataAttribution: string
}


const MapWrapper = (props: MapWrapperProps) => {
    const [ map, setMap ] = useState<Map>()
    const [ featuresLayer, setFeaturesLayer ] = useState<VectorLayer<VectorSource<Geometry>>>()

  const mapElement = useRef() as RefObject<HTMLDivElement>

  useEffect( () => {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource()
    })

    const initialMap = new Map({
      target:  mapElement.current ?? undefined,
      layers: [
        
        new TileLayer({
          maxZoom: 19,
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          })
        }),
        initalFeaturesLayer
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2
      }),
      controls: []
    })

    // save map and vector layer references to state
    setMap(initialMap)
    setFeaturesLayer(initalFeaturesLayer)

  },[])

  useEffect(() => {
    if(!featuresLayer || props.selectedData.length === 0) return

    const features = props.selectedData.map((entry, index) => {
      const coord = entry['Coordonnées GPS de la formation'].split(',').map((c) => Number(c))
      const feat =  new Feature(
        { geometry: new Point(transform(coord.reverse(), 'EPSG:4326', 'EPSG:3857')),}
      )
      feat.setStyle(
        new Style({ 
          image: new CircleStyle({
            fill: new Fill({ color: colors[index]}),
            radius: 5,
          }),
        })
      )
      return feat
    })
    const source = featuresLayer.getSource()
    source.clear()
    source.addFeatures(features)
    if (!map) return
    map.getView().fit(source.getExtent(), {
      padding: [100,100,100,100]
    })
  }, [featuresLayer, map, props.selectedData])

  return (
    <Paper><div ref={mapElement} className="map-container"></div></Paper>
  )
}

export default MapWrapper