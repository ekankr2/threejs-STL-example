// @ts-nocheck
import {LevaPanel, useControls as useControlsImpl, useCreateStore} from 'leva'
import {useSelect} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";

export const SelectionBridge = ({setSelected}) => {
    const selected = useSelect()
    const prevSelectedRef = useRef(selected)

    // Use useFrame to check for selection changes on every frame
    useFrame(() => {
        if (selected !== prevSelectedRef.current) {
            console.log('SelectionBridge - selection changed via useFrame:', selected.length)
            prevSelectedRef.current = selected
            setSelected([...selected]) // Create new array to trigger state update
        }
    })

    return null
}

export const Panel = () => {
    const [store, setStore] = useState(null)

    useEffect(() => {
        const handleStoreSelected = (event: any) => {
            console.log('Panel received store:', event.detail.store)
            setStore(event.detail.store)
        }

        window.addEventListener('levaStoreSelected', handleStoreSelected)
        return () => window.removeEventListener('levaStoreSelected', handleStoreSelected)
    }, [])

    console.log('Panel render - current store:', store)

    if (store) {
        return (
            <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
                <LevaPanel store={store} fill flat />
            </div>
        )
    }
    return null
}

export const useControls = (selected, props) => {
    const store = useCreateStore()
    const isFirst = selected[0] === store
    const materialProps = useControlsImpl(
        Object.keys(props).reduce(
            (acc, key) => ({
                ...acc,
                [key]: {
                    ...props[key],
                    transient: false,
                    onChange: (value, path, ctx) =>
                        !ctx.initial && isFirst && selected.length > 1 && selected.forEach((s, i) => i > 0 && s.setValueAtPath(path, value)),
                    render: (get) => selected.length === 1 || selected.every((store) => store.getData()[key])
                }
            }),
            {}
        ),
        {store},
        [selected]
    )
    return [store, materialProps]
}
