import React, {Suspense, useEffect, useRef, useState} from 'react';
import {useFrame, useLoader} from "@react-three/fiber";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {Center, Edges, Select} from "@react-three/drei";
import {useControls} from "leva";
import {Object3D} from "three";


const MyStls = () => {
    const stl = useLoader(STLLoader, ['bone.stl', 'heart.stl', 'LLL.stl'])
    const group = useRef<any>(null!)
    const [select, setSelect] = useState<Object3D[]>([])
    const [currentRotation, setCurrentRotation] = useState(0)
    const [color, setColor] = useState<string[]>([])
    const {spin, boneColor, heartColor, LLLColor} = useControls({
        spin: false,
        boneColor: {value: '#9c9ea1', label: 'bone color'},
        heartColor: {value: '#781e14', label: 'heart color'},
        LLLColor: {value: '#d66154', label: 'LLL color'},
    });

    console.log('stl: ',stl[0].uuid)

    console.log(select[0]?.userData)

    useEffect(() => {
        setColor([boneColor, heartColor, LLLColor])
    }, [boneColor, heartColor, LLLColor])

    useFrame(() => {
        if (spin) {
            setCurrentRotation((prev: number) => prev + 0.01)
        }
        group.current.rotation.z = currentRotation
    })

    return (
        <Suspense fallback={null}>
            <Center>
                    <group rotation={[-Math.PI / 2, 0, 0]} dispose={null} ref={group}>
                        <Select onChange={setSelect}>
                        {
                            stl.map((stl, idx) =>
                                <mesh userData={{key: idx}} key={idx} scale={1.2} castShadow receiveShadow>
                                    <primitive attach="geometry" object={stl}></primitive>
                                    <meshStandardMaterial color={color[idx]}/>
                                    <Edges visible={select[0]?.userData.key === idx}>
                                        <meshBasicMaterial transparent color="#333" depthTest={false}/>
                                    </Edges>
                                </mesh>
                            )
                        }
                        </Select>
                    </group>
            </Center>
        </Suspense>
    )
}

export default MyStls;