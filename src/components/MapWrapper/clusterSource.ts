import Geometry from 'ol/geom/Geometry'
import { Cluster, Vector as VectorSource } from 'ol/source'

const clusterSource = (source: VectorSource<Geometry>) => {
    return new Cluster({
        distance: 40,
        minDistance: 20,
        source: source,
    })
}

export default clusterSource
