import React, {Suspense, useState} from 'react';
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import Loader from "./Loader";
import MyStls from "./MyStls";
import {Controls} from "react-three-gui";


function App() {

    return (
        <div className='App'>
            <Controls.Canvas style={{backgroundColor: 'black'}}>
                <Suspense fallback={<Loader/>}>
                    <PerspectiveCamera makeDefault fov={60} aspect={window.innerWidth / window.innerHeight}
                                       position={[3, 0.15, 3]} near={1} far={5000} position-z={600}>
                    </PerspectiveCamera>
                    <MyStls/>
                    <directionalLight color={0xffddcc} position={[1, 0.75, 0.5]}/>
                    <directionalLight color={0xccccff} position={[-1, 0.75, -0.5]}/>
                    <OrbitControls/>
                </Suspense>
            </Controls.Canvas>
        </div>
    );
}

export default App
