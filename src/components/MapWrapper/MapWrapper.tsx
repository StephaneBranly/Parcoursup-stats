import { useState, useRef, useEffect, RefObject } from 'react'

import './MapWrapper.scss'

import Map from 'ol/Map'
import View from 'ol/View'
import VectorSource from 'ol/source/Vector'
import Geometry from 'ol/geom/Geometry'
import { Feature, MapBrowserEvent } from 'ol'
import Point from 'ol/geom/Point'
import { transform } from 'ol/proj'

import clusterLayer from './clusterLayer'
import clusterSource from './clusterSource'
import osmLayer from './osmLayer'
import { clickMap } from 'utils'

export interface MapWrapperProps {
    schoolsData: Record<string, any>[]
    loadSchool: (schoolID: string) => void
    dataAttribution: string
}

const MapWrapper = (props: MapWrapperProps) => {
    const [map, setMap] = useState<Map>()
    const [source, setSource] = useState<VectorSource<Geometry>>()

    const mapElement = useRef() as RefObject<HTMLDivElement>

    useEffect(() => {
        const new_source = new VectorSource()

        const initialMap = new Map({
            target: mapElement.current ?? undefined,
            layers: [osmLayer(), clusterLayer(clusterSource(new_source))],
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
                props.loadSchool
            )
        )
        // save map and vector layer references to state
        setMap(initialMap)
        setSource(new_source)
    }, [])

    useEffect(() => {
        if (!source || props.schoolsData.length === 0) return

        const features = props.schoolsData
            .filter((entry) => {
                return entry['g_olocalisation_des_formations'] !== undefined
            })
            .map((entry) => {
                const coord = entry['g_olocalisation_des_formations']
                const feat = new Feature({
                    geometry: new Point(
                        transform(coord.reverse(), 'EPSG:4326', 'EPSG:3857')
                    ),
                })
                feat.setProperties({ ...entry })
                return feat
            })

        if (!features) return
        source.clear()
        source.addFeatures(features)
        if (!map) return
        map.getView().fit(source.getExtent(), {
            padding: [100, 100, 100, 100],
        })
    }, [props.schoolsData])

    return (
        <div className="pcs-map-fragment">
            <h1 className="pcs-map-title">Carte des formations</h1>
            <div className="pcs-map-container">
                <div ref={mapElement} className="pcs-map"></div>
            </div>
        </div>
    )
}

export default MapWrapper
