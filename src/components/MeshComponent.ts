import * as THREE from 'three';
import IComponent from '../IComponent';

export class MeshComponent extends IComponent
{
    mesh: THREE.Mesh;

    constructor(mesh: THREE.Mesh) {
        super();
        this.mesh = mesh;
    }
}