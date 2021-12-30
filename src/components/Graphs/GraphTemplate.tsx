import { IconButton, Container, Typography } from "@material-ui/core"
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { createRef, RefObject } from "react";
import { useScreenshot } from 'use-react-screenshot'

export interface GraphTemplateProps {
    children: JSX.Element
    name: string,
    attribution: string,
}
export const GraphTemplate = (props: GraphTemplateProps) => {
    const ref = createRef() as RefObject<HTMLDivElement>
    const [image, takeScreenshot] = useScreenshot()
    const getImage = () => takeScreenshot(ref.current)
    
    return <>
        {/* <IconButton onClick={getImage}><PhotoCameraIcon /></IconButton> */}
        <Container ref={ref} style= {{ padding: 5, margin: 0, border: "1px solid #BBB", borderRadius: "5px"}}>
        <Typography variant="h5">{props.name}</Typography>
        {props.children}
        <Typography variant="subtitle2">{`https://stephanebranly.github.io/parcoursup-stats - ${props.attribution}`}</Typography>
        </Container>
        {/* {image && <a href={image} download="graph.png">Download</a>} */}
        </>
}
