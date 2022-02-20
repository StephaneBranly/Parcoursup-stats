import { useState, useRef, useEffect, RefObject } from 'react'

import './MapWrapper.scss'

import Map from 'ol/Map'
import View from 'ol/View'
import VectorSource from 'ol/source/Vector'
import Geometry from 'ol/geom/Geometry'
import { MapBrowserEvent } from 'ol'

import clusterLayer from './clusterLayer'
import clusterSource from './clusterSource'
import rasterLayer from './rasterLayer'
import { clickMap } from 'utils'
import { loadFeatures } from './loadFeatures'

export interface MapWrapperProps {
    formationsData: Record<string, any>[]
    setSelectedFormation: (formationID: string) => Promise<void>
    dataAttribution: string
    setCoordProximity: (coord: number[]) => void
}

const MapWrapper = (props: MapWrapperProps) => {
    const [map, setMap] = useState<Map>()
    const [source, setSource] = useState<VectorSource<Geometry>>()

    const mapElement = useRef() as RefObject<HTMLDivElement>

    useEffect(() => {
        const new_source = new VectorSource()

        const initialMap = new Map({
            target: mapElement.current ?? undefined,
            layers: [rasterLayer(), clusterLayer(clusterSource(new_source))],
            view: new View({
                projection: 'EPSG:3857',
                center: [0, 0],
                zoom: 2,
            }),
            controls: [],
        })

        initialMap.addEventListener('singleclick', (e) =>
            clickMap(
                e as MapBrowserEvent<UIEvent>,
                initialMap,
                props.setSelectedFormation,
                props.setCoordProximity
            )
        )
        // save map and vector layer references to state
        setMap(initialMap)
        setSource(new_source)
        if (props.formationsData.length)
            loadFeatures(new_source, initialMap, props.formationsData)
    }, [])

    useEffect(() => {
        if (!source || !map || props.formationsData.length === 0) return
        loadFeatures(source, map, props.formationsData)
    }, [props.formationsData])

    return (
        <div className="pcs-map-fragment">
            <div className="pcs-map-container">
                <div ref={mapElement} className="pcs-map"></div>
            </div>
        </div>
    )
}

export default MapWrapper
