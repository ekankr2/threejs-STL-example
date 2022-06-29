import React, {FC, Suspense, useRef, useState} from 'react';
import {useFrame, useLoader} from "@react-three/fiber";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {Center} from "@react-three/drei";
import {useControl} from "react-three-gui";

const color = ['#9c9ea1', '#781e14', '#d66154']

const MyStls = () => {
    const stl = useLoader(STLLoader, ['bone.stl', 'heart.stl', 'LLL.stl'])
    const group = useRef<any>(null!)
    const [current, setCurrent] = useState(0)
    const spinner = useControl('Spin', {type: 'boolean'});

    useFrame(() => {
        if (spinner) {
            setCurrent((prev: number) => prev + 0.01)
        }
        group.current.rotation.z = current
    })

    return (
        <Suspense fallback={null}>
            <Center>
                <group rotation={[-Math.PI / 2, 0, 0]} dispose={null} ref={group}>
                    {
                        stl.map((stl, idx) =>
                            <mesh key={idx} scale={1.2} castShadow receiveShadow>
                                <primitive attach="geometry" object={stl}></primitive>
                                <meshStandardMaterial color={color[idx]}/>
                            </mesh>
                        )
                    }
                </group>
            </Center>
        </Suspense>
    )
}

export default MyStls;