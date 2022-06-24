import React, {Suspense, useRef, useState} from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
import {Center, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import Loader from "./Loader";

const color = ['#9c9ea1','#781e14','#d66154']

function App() {
    const [spin, setSpin] = useState(true)
    const [current, setCurrent] = useState(0)

    function MyStls() {
        const stl = useLoader(STLLoader, ['bone.stl', 'heart.stl', 'LLL.stl'])
        const group = useRef<any>(null!)

        useFrame(({clock}) => {
            if (spin) {
                setCurrent(prev => prev + 0.01)
            }
            group.current.rotation.z = current
        })

        return (
            <Suspense fallback={""}>
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

    return (
        <div className='App'>
            <button className="spin-btn" onClick={() => setSpin((prev) => !prev)}>
                {spin ? 'STOP' : 'SPIN'}
            </button>
            <Canvas style={{backgroundColor: 'black'}}>
                <Suspense fallback={<Loader/>}>
                    <PerspectiveCamera makeDefault fov={60} aspect={window.innerWidth / window.innerHeight}
                                       position={[3, 0.15, 3]} near={1} far={5000} position-z={600}>
                    </PerspectiveCamera>
                    <MyStls/>
                    <directionalLight color={0xffddcc} position={[1, 0.75, 0.5]}/>
                    <directionalLight color={0xccccff} position={[-1, 0.75, -0.5]}/>
                    <OrbitControls/>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App
