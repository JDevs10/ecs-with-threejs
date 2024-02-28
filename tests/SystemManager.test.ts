import SystemManager from '../src/SystemManager';
import ISystem from '../src/ISystem';
import Entity from '../src/Entity';
import Query from 'Query';

// Mock ISystem for testing
class MockSystem extends ISystem {
    public query: Query; // Simplified for example purposes

    public execute(entities: Entity[], deltaTime: number, time: number): void {
        // Mock execution logic
    }
}

describe('>>> SystemManager', () => {
    let systemManager: SystemManager;
    let mockSystem: ISystem;

    beforeEach(() => {
        systemManager = new SystemManager();
        mockSystem = new MockSystem();
    });

    it('should add a system correctly', () => {
        systemManager.addSystem(mockSystem);
        expect(systemManager.hasSystem(MockSystem)).toBeTruthy();
    });

    it('should remove a system correctly', () => {
        systemManager.addSystem(mockSystem);
        const result = systemManager.removeSystem(MockSystem);
        expect(result).toBeTruthy();
        expect(systemManager.hasSystem(MockSystem)).toBeFalsy();
    });

    it('should execute all systems with given parameters', () => {
        systemManager.addSystem(mockSystem);
        const mockEntities = [new Entity('testEntity')];
        const deltaTime = 1.0;
        const time = Date.now();

        // Spy on mockSystem's execute to verify it's called correctly
        const executeSpy = jest.spyOn(mockSystem, 'execute');

        systemManager.executeSystems(mockEntities, deltaTime, time);
        expect(executeSpy).toHaveBeenCalledWith(mockEntities, deltaTime, time);
    });
});
