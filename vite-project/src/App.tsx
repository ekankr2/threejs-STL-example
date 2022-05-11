import React, {Suspense, useRef, useState} from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
import {Center, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import Loader from "./Loader";


function App() {

    function MyBone() {
        const stl = useLoader(STLLoader, ['bone.stl', 'heart.stl', 'LLL.stl'])
        const group = useRef<any>(null!)
        const [spin, setSpin] = useState(4)

        const handleClick = () => {
            if(spin){
                return setSpin(1)
            }
            return setSpin(4)
        }

        useFrame(({clock}) => {
            group.current.rotation.set(-Math.PI / 2, 0, 0)
            group.current.position.set(0, 50, 0)
            group.current.rotation.z = clock.getElapsedTime() / spin

        })

        stl.map((data) => {
            console.log(data)
        })

        return (
            <Suspense fallback={""}>
                <Center>
                    <group onClick={handleClick} dispose={null} ref={group}>
                        {
                            stl.map((stl, idx) =>
                                <mesh key={idx} scale={1.2} castShadow receiveShadow geometry={stl}>
                                    <meshStandardMaterial color={'gray'}/>
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
            <button>SPIN</button>
            <Canvas>
                <Suspense fallback={<Loader/>}>
                    <PerspectiveCamera makeDefault fov={60} aspect={window.innerWidth / window.innerHeight}
                                       position={[3, 0.15, 3]} near={1} far={5000} position-z={600}>
                    </PerspectiveCamera>
                    <MyBone/>
                    <directionalLight color={0xffddcc} position={[1, 0.75, 0.5]}/>
                    <directionalLight color={0xccccff} position={[-1, 0.75, -0.5]}/>
                    <OrbitControls/>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default App
