import { generateUUID } from "./utils";
import IComponent from "./IComponent";

/**
 * Representation of an entity in ECS.
 * 
 * An entity is a container for components.
 */
export default class Entity
{
    private components: Map<string, IComponent> = new Map();

    constructor(public id: string, useUuid: boolean = false) {
        if (useUuid) {
            this.id = `${id}--${generateUUID()}`;
        } else {
            this.id = id;
        }
    }

    /**
     * Add a component to the entity
     * 
     * @param component The component to add that inherit's IComponent
     */
    public addComponent(component: IComponent): this {
        if (Object.getPrototypeOf(component.constructor) !== IComponent) {
            throw new Error(`Component ${component.getName()} does not inherit from IComponent`);
        }

        this.components.set(component.getName(), component);


        return this;
    }

    /**
     * Get a component from the entity
     * 
     * @param componentClass The type of component to get
     * @returns The component or undefined if not found
     */
    public getComponent<T>(componentClass: { new(...args: any[]): T }): T | undefined {
        const componentName = componentClass.name;
        return this.components.get(componentName) as T | undefined;
    }

    /**
     * Get all components of the entity
     * @returns An array of components
     */
    public getComponents(): IComponent[] {
        return Array.from(this.components.values());
    }

    /**
     * Check if the entity has a specific component
     * 
     * @param componentClass The type of component to check
     * @returns True if the entity has the component, false otherwise
     */
    public hasComponent<IComponent>(componentClass: { new(...args: any): IComponent }): boolean {
        return this.components.has(componentClass.name);
    }

    /**
     * Remove a component from the entity
     * @param componentClass The type of component to remove
     * @returns True if the component was removed, false if not found
     */
    public removeComponent<T>(componentClass: { new(...args: any[]): T }): boolean {
        return this.components.delete(componentClass.name);
    }
}