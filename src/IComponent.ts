/**
 * A generic component class.
 * 
 * Different facets of an entity. ex: geometry, physics, hit points. Components only store data.
 */
export default abstract class IComponent
{
    /**
     * @returns The class name that extends from Component 
     */
    public getName(): string {
        return this.constructor.name;
    }
}