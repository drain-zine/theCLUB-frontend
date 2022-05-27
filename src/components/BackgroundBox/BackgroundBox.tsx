import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as three from "three";

const BackgroundBox = ({ position, color, size, props}: any) => {
    const mesh = useRef<three.Mesh>();


    useFrame(() => {
      if(mesh.current){
          mesh.current.rotation.x = mesh.current.rotation.y += 0.001;
      }
    });
  
    return (
        <mesh 
          {...props} 
          position={position}
          ref={mesh} >
          <boxGeometry args={size} />
          <meshStandardMaterial color={color} />
       </mesh>
    );
  }
  

  export default BackgroundBox;