import ISystem from '../src/ISystem';
import ECS from '../src/ECS';
import Entity from '../src/Entity';
import Query from '../src/Query';

class MockSystem extends ISystem {
    public query: Query; // Simplified for example purposes

    public execute(entities: Entity[], deltaTime: number, time: number): void {
        // Mock execution logic
    }
}

describe('>>>> ECS', () => {

    describe('System Execution', () => {

        it('should add systems and execute', () => {
          const ecs = new ECS();
          ecs.addSystem(new MockSystem()).createEntity('testEntity');
      
          // Mock or simulate system execution
          ecs.execute(1.0, 1.0); // Assuming execute takes a deltaTime argument
        });
    });
});
