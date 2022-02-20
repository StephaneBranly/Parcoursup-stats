import { Map, MapBrowserEvent } from 'ol'
import { transform } from 'ol/proj'

export const clickMap = (
    evt: MapBrowserEvent<UIEvent>,
    map: Map,
    setSelectedFormationID: (id: string) => void,
    setCoordProximity: (coord: number[]) => void
) => {
    const features: any[] = []
    map.forEachFeatureAtPixel(evt.pixel, (f: any) => features.push(f))
    const coord = evt.coordinate
    setCoordProximity(transform(coord, 'EPSG:3857', 'EPSG:4326'))
    if (features.length !== 1) return
    if (features[0].getProperties().features.length !== 1) return
    const properties = features[0].getProperties().features[0].getProperties()
    if (properties['cod_aff_form'])
        setSelectedFormationID(properties['cod_aff_form'])
}
