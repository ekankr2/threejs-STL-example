import {FC} from 'react';
import {Edges, useSelect} from "@react-three/drei";
import {useControls} from "./MultiLeva";

interface Props {
    stl: any
    organName: string
    color: string
    opacity: number
}

const Stls: FC<Props> = ({organName, color, opacity, stl}) => {
    const selected = useSelect()
    const selectedStores = selected.map((sel) => sel.userData.store)
    const [store, materialProps] = useControls(selectedStores, {
        name: {value: organName},
        color: {value: color},
        opacity: {value: opacity, min: 0.2, max: 1, step: 0.1},
        visible: {value: true}
    })
    const isSelected = !!selectedStores.find((sel) => sel === store)

    console.log('Stls component:', organName, 'selected:', selected, 'isSelected:', isSelected)

    return (
        <mesh userData={{store}} scale={1.2} castShadow receiveShadow>
            <primitive attach="geometry" object={stl}></primitive>
            <meshStandardMaterial {...(materialProps as any)} transparent/>
            <Edges visible={isSelected} scale={1.01} renderOrder={1000}>
                <meshBasicMaterial transparent color="#e0d984" depthTest={false} depthWrite={false}/>
            </Edges>
        </mesh>
    );
};

export default Stls;