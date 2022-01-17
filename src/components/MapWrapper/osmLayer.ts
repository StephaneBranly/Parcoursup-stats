import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

export const osmLayer = () => {
    return new TileLayer({
        maxZoom: 19,
        source: new XYZ({
            url: 'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        }),
    })
}

export default osmLayer
