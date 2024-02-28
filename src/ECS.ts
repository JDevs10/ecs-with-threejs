import ISystem from './ISystem';
import Entity from './Entity';
import SystemManager from './SystemManager';

export default class ECS
{
    private entities: Entity[];
    private systemManager: SystemManager;

    constructor() {
        this.entities = [];
        this.systemManager = new SystemManager();
    }

    public createEntity(id: string): Entity {
        return new Entity(id);
    }

    public addEntity(entity: Entity): this {
        this.entities.push(entity);
        return this;
    }

    public addSystem(system: ISystem): this {
        this.systemManager.addSystem(system);
        return this;
    }

    public execute(deltaTime: number, time: number): void {
        this.systemManager.executeSystems(this.entities, deltaTime, time);
    }
}
