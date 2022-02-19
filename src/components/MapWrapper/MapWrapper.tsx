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
    schoolsData: Record<string, any>[]
    setSelectedSchool: (schoolID: string) => Promise<void>
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
                props.setSelectedSchool,
                props.setCoordProximity
            )
        )
        // save map and vector layer references to state
        setMap(initialMap)
        setSource(new_source)
        if (props.schoolsData.length)
            loadFeatures(new_source, initialMap, props.schoolsData)
    }, [])

    useEffect(() => {
        if (!source || !map || props.schoolsData.length === 0) return
        loadFeatures(source, map, props.schoolsData)
    }, [props.schoolsData])

    return (
        <div className="pcs-map-fragment">
            <div className="pcs-map-container">
                <div ref={mapElement} className="pcs-map"></div>
            </div>
        </div>
    )
}

export default MapWrapper
