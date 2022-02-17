import VectorLayer from 'ol/layer/Vector'
import Fill from 'ol/style/Fill'
import Circle from 'ol/style/Circle'
import Stroke from 'ol/style/Stroke'
import Text from 'ol/style/Text'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import markerIcon from '../../assets/marker.svg'

const clusterLayer = (clusterSource: any) => {
    const styleCache: Record<string, Style[]> = {}
    return new VectorLayer({
        source: clusterSource,
        style: (feature) => {
            const size = feature.get('features').length
            let style = styleCache[size]
            if (!style || size === 1) {
                if (size === 1) {
                    const schoolName = feature
                        .get('features')[0]
                        .getProperties()['g_ea_lib_vx']
                    style = [
                        new Style({
                            image: new Icon({
                                src: markerIcon,
                                color: '#e63946',
                                anchor: [0.5, 1],
                                scale: 0.5,
                            }),
                            text: new Text({
                                text: schoolName,
                                offsetY: 10,
                            }),
                        }),
                    ]
                } else {
                    style = [
                        new Style({
                            image: new Circle({
                                radius: 15,
                                stroke: new Stroke({
                                    color: '#e63946',
                                }),
                                fill: new Fill({
                                    color: '#0e2950',
                                }),
                            }),
                            text: new Text({
                                text: size.toString(),
                                fill: new Fill({
                                    color: '#fff',
                                }),
                            }),
                        }),
                    ]
                }
                styleCache[size] = style
            }
            return style
        },
    })
}

export default clusterLayer
