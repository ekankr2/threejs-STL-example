import React, {FC, Suspense, useRef} from 'react';
import {useFrame, useLoader} from "@react-three/fiber";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {Center} from "@react-three/drei";

const color = ['#9c9ea1','#781e14','#d66154']

interface Props {
    spin: boolean
    current: number
    setCurrent: (p: (prev: number) => number) => void
}

const MyStls: FC<Props> = ({spin, current, setCurrent}) => {
    const stl = useLoader(STLLoader, ['bone.stl', 'heart.stl', 'LLL.stl'])
    const group = useRef<any>(null!)

    useFrame(({clock}) => {
        if (spin) {
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