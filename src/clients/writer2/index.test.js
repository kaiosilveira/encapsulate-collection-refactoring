import Person from '../../entities/Person.js';
import { appendBasicCoursesToPersonByCourseName } from './index.js';

describe('appendBasicCoursesToPersonByCourseName', () => {
  it('should append a persons courses', () => {
    const aPerson = new Person({ name: 'Kaio Silveira' });
    appendBasicCoursesToPersonByCourseName(aPerson, ['course1', 'course2']);

    expect(aPerson.courses.every(c => c.isAdvanced)).toBe(false);

    const courseNames = aPerson.courses.map(course => course.name);
    expect(courseNames).toContain('course1');
    expect(courseNames).toContain('course2');
  });
});
