import {Suspense, useState} from 'react';
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import Loader from "./components/Loader";
import Editor from "./components/Editor";
import {Canvas} from "@react-three/fiber";
import {Panel} from "./components/MultiLeva";
import {Object3D} from "three";


function App() {
    const [selected, setSelected] = useState<Object3D[]>()

    return (
        <div className='App'>
            <Canvas style={{backgroundColor: 'black'}}>
                <Suspense fallback={<Loader/>}>
                    <PerspectiveCamera makeDefault fov={60} aspect={window.innerWidth / window.innerHeight}
                                       position={[3, 0.15, 3]} near={1} far={5000} position-z={600}>
                    </PerspectiveCamera>
                    <Editor setSelected={setSelected}/>
                    <directionalLight color={0xffddcc} position={[1, 0.75, 0.5]}/>
                    <directionalLight color={0xccccff} position={[-1, 0.75, -0.5]}/>
                </Suspense>
                <OrbitControls/>
            </Canvas>
            <Panel selected={selected}/>
        </div>
    );
}

export default App