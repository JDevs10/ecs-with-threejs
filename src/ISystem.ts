import Entity from "./Entity";
import Query from "./Query";

export default abstract class ISystem
{
    public abstract query: Query;

    /**
     * @returns The class name that extends from Component 
     */
    public getName(): string {
        return this.constructor.name;
    }

    public abstract execute(entities: Entity[], deltaTime: number, time: number): void;
}