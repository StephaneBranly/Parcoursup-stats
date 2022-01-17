import { Map, MapBrowserEvent } from 'ol'

export const clickMap = (
    evt: MapBrowserEvent<UIEvent>,
    map: Map,
    setSelectedSchoolID: (id: string) => void
) => {
    const features: any[] = []
    map.forEachFeatureAtPixel(evt.pixel, (f: any) => features.push(f))
    console.log(features)
    if (features.length !== 1) return
    if (features[0].getProperties().features.length !== 1) return
    const properties = features[0].getProperties().features[0].getProperties()
    console.log(properties)
    if (properties['cod_aff_form'])
        setSelectedSchoolID(properties['cod_aff_form'])
}
