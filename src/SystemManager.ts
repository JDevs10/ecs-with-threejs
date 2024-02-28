import Entity from "./Entity";
import ISystem from "./ISystem";

export default class SystemManager
{
    private systems: Map<string, ISystem> = new Map();

    public addSystem(system: ISystem): this {
        if (Object.getPrototypeOf(system.constructor) !== ISystem) {
            throw new Error(`System ${system.getName()} does not inherit from ISystem`);
        }

        this.systems.set(system.getName(), system);
        return this;
    }

    /**
     * Check if the manager has a specific system
     * 
     * @param System The type of system to check
     * @returns True if the manager has the system, false otherwise
     */
    public hasSystem<ISystem>(System: { new(...args: any): ISystem }): boolean {
        return this.systems.has(System.name);
    }

    /**
     * Remove a system
     * @param system The type of system to remove
     * @returns True if the system was removed, false if not found
     */
    public removeSystem<T>(system: { new(...args: any[]): T }): boolean {
        return this.systems.delete(system.name);
    }

    public executeSystems(entities: Entity[], deltaTime: number, time: number): void {
        const systems: ISystem[] = Array.from(this.systems.values());

        if (systems.length > 0) {
            systems.forEach((system: ISystem) => {
                system.execute(entities, deltaTime, time);
            });
        }
    }
}