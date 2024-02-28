import Entity from "../src/Entity";
import IComponent from "../src/IComponent";
import { generateUUID } from "../src/utils";


// Mocking the generateUUID function
jest.mock('../src/utils', () => ({
    generateUUID: jest.fn(),
}));

// Creating a mock component that implements IComponent
class MockComponent extends IComponent {

    constructor(public name: number) {
        super();
    }
}

describe('Entity', () => {
    let entity: Entity;

    beforeEach(() => {
        // Resetting mocks before each test
        (generateUUID as jest.Mock).mockReturnValue('uuid');

        entity = new Entity('testEntity');
    });

    it('should create an entity with a specified ID', () => {
        expect(entity).toBeDefined();
        expect(entity.id).toBe('testEntity');
    });

    it('should create an entity with a UUID', () => {
        const entity = new Entity('testEntity', true);
        expect(entity.id).toBe('testEntity--uuid');
    });

    it('should add and retrieve a component', () => {
        const component = new MockComponent(10);
        entity.addComponent(component);
        expect(entity.getComponent(MockComponent)).toBe(component);
    });

    it('should check if an entity has a specific component', () => {
        const component = new MockComponent(10);
        entity.addComponent(component);
        expect(entity.hasComponent(MockComponent)).toBeTruthy();
    });

    it('should remove a component from the entity', () => {
        const component = new MockComponent(10);
        entity.addComponent(component);
        const result = entity.removeComponent(MockComponent);
        expect(result).toBeTruthy();
        expect(entity.getComponent(MockComponent)).toBeUndefined();
    });
});
