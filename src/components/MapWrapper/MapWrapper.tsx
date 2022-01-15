import { useState, useRef, useEffect, RefObject } from 'react'

import './MapWrapper.scss'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import Geometry from 'ol/geom/Geometry'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import { transform } from 'ol/proj'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Icon from 'ol/style/Icon'
import Text from 'ol/style/Text'

import markerIcon from '../../assets/marker.svg'
import Stroke from 'ol/style/Stroke'

export interface MapWrapperProps {
    schoolsData: Record<string, any>[]
    dataAttribution: string
}

const MapWrapper = (props: MapWrapperProps) => {
    const [map, setMap] = useState<Map>()
    const [featuresLayer, setFeaturesLayer] =
        useState<VectorLayer<VectorSource<Geometry>>>()

    const mapElement = useRef() as RefObject<HTMLDivElement>

    useEffect(() => {
        const initalFeaturesLayer = new VectorLayer({
            source: new VectorSource(),
        })

        const initialMap = new Map({
            target: mapElement.current ?? undefined,
            layers: [
                new TileLayer({
                    maxZoom: 19,
                    source: new XYZ({
                        url: 'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
                    }),
                }),
                initalFeaturesLayer,
            ],
            view: new View({
                projection: 'EPSG:3857',
                center: [0, 0],
                zoom: 2,
            }),
            controls: [],
        })

        // save map and vector layer references to state
        setMap(initialMap)
        setFeaturesLayer(initalFeaturesLayer)
    }, [])

    useEffect(() => {
        if (!featuresLayer || props.schoolsData.length === 0) return

        const features = props.schoolsData.map((entry, index) => {
            const coord = entry['g_olocalisation_des_formations']
            const feat = new Feature({
                geometry: new Point(
                    transform(coord.reverse(), 'EPSG:4326', 'EPSG:3857')
                ),
            })
            feat.setStyle(
                new Style({
                    text: new Text({
                        text: entry.Établissement,
                        offsetY: 10,
                        fill: new Fill({ color: '#111' }),
                        stroke: new Stroke({ color: '#FF3333', width: 2 }),
                    }),
                    image: new Icon({
                        src: markerIcon,
                        color: 'red',
                        anchor: [0.5, 1],
                        scale: 0.5,
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
            padding: [100, 100, 100, 100],
        })
    }, [props.schoolsData])

    return (
        <div className="pcs-map-fragment">
            <div className="pcs-map-title">Carte des formations</div>
            <div className="pcs-map-container">
                <div ref={mapElement} className="pcs-map"></div>
            </div>
        </div>
    )
}

export default MapWrapper
