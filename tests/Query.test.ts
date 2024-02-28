import Query from '../src/Query';
import Entity from '../src/Entity';
import IComponent from '../src/IComponent';

// Mock components for testing
class MockComponent1 extends IComponent 
{
    constructor(public name: number) {
        super();
    }
}

class MockComponent2 extends IComponent {
    constructor(public name: number) {
        super();
    }
}

describe('Query', () => {
  it('should return only entities with the specified components', () => {
    // Create a query that matches entities with MockComponent1 and MockComponent2
    const query = new Query([MockComponent1, MockComponent2]);

    // Create entities, some of which have the components and some do not
    const entityWithBothComponents = new Entity('entityWithBoth');
    entityWithBothComponents.addComponent(new MockComponent1(10));
    entityWithBothComponents.addComponent(new MockComponent2(10));

    const entityWithOneComponent = new Entity('entityWithOne');
    entityWithOneComponent.addComponent(new MockComponent1(10));

    const entityWithNoComponents = new Entity('entityWithNone');

    // Execute the query
    const matchingEntities = query.execute([
        entityWithBothComponents,
        entityWithOneComponent,
        entityWithNoComponents,
    ]);

    // Assertions
    expect(matchingEntities.length).toBe(1);
    expect(matchingEntities).toContain(entityWithBothComponents);
    expect(matchingEntities).not.toContain(entityWithOneComponent);
    expect(matchingEntities).not.toContain(entityWithNoComponents);
  });
});
