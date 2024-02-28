import IComponent from './IComponent';
import Entity from './Entity';

/**
 * Used by systems to determine which entities they are interested in, based on the components the entities own.
 */
export default class Query
{
    private componentTypes: (new (data: any) => IComponent)[];


    /**
     * Creates a new query with the specified components.
     * @param componentTypes - An array of component constructors that entities must have to match the query.
     */
    constructor(componentTypes: (new (data: any) => IComponent)[]) {
        this.componentTypes = componentTypes;
    }

    private matches(entity: Entity): boolean {
        for (let type of this.componentTypes) {
            if (!entity.hasComponent(type)) {
                return false;
            }
        }
        return true;
    }

    public execute(entities: Entity[]): Entity[] {
        const matchingEntities: Entity[] = [];
        entities.forEach(entity => {
            if (this.matches(entity)) {
                matchingEntities.push(entity);
            }
        });
        return matchingEntities;
    }
}