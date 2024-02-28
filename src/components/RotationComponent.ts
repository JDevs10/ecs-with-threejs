import IComponent from "../IComponent";

export class RotationComponent extends IComponent
{
    x: number;
    y: number;
    z: number;

    constructor(x = 0, y = 0, z = 0) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
