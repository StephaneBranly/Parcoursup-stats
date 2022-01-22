import { Feature, Map } from 'ol'
import Geometry from 'ol/geom/Geometry'
import Point from 'ol/geom/Point'
import { transform } from 'ol/proj'
import VectorSource from 'ol/source/Vector'

export const loadFeatures = (
    source: VectorSource<Geometry>,
    map: Map,
    schoolsData: Record<string, any>[]
) => {
    const features = schoolsData
        .filter((entry) => {
            return entry['g_olocalisation_des_formations'] !== undefined
        })
        .map((entry) => {
            const coord = entry['g_olocalisation_des_formations']
            const realCoord = Array.from(coord).reverse() as number[]
            const feat = new Feature({
                geometry: new Point(
                    transform(realCoord, 'EPSG:4326', 'EPSG:3857')
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
}
