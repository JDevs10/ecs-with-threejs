// /src/systems/RenderSystem.ts
import * as THREE from 'three';
import Entity from '../Entity';
import { MeshComponent } from '../components/MeshComponent';
import { PositionComponent } from '../components/PositionComponent';
import { RotationComponent } from '../components/RotationComponent';
import ISystem from '../ISystem';
import Query from '../Query';

export class RenderSystem extends ISystem
{
    public query: Query = new Query([MeshComponent, PositionComponent, RotationComponent]);

    private scene: THREE.Scene;

    constructor(scene: THREE.Scene) {
        super();
        this.scene = scene;
    }

    public execute(entities: Entity[], deltaTime: number, time: number): void {
        this.query.execute(entities).forEach((entity: Entity) => {
            const meshComponent = entity.getComponent(MeshComponent);
            const positionComponent = entity.getComponent(PositionComponent);
            const rotationComponent = entity.getComponent(RotationComponent);

            if (meshComponent && positionComponent) {
                meshComponent.mesh.position.set(positionComponent.x, positionComponent.y, positionComponent.z);
                this.scene.add(meshComponent.mesh);
            }

            if (meshComponent && rotationComponent) {
                meshComponent.mesh.rotation.x += rotationComponent.x * deltaTime;
                meshComponent.mesh.rotation.y += rotationComponent.y * deltaTime;
                meshComponent.mesh.rotation.z += rotationComponent.z * deltaTime;
            }
        });
    }
}
