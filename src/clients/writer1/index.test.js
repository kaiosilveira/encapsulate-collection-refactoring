import Person from '../../entities/Person.js';
import { updatePersonCoursesByCourseNames } from './index.js';

describe('updatePersonCoursesByCourseNames', () => {
  it('should update a person with a set of courses', () => {
    const aPerson = new Person({ name: 'Kaio Silveira' });
    updatePersonCoursesByCourseNames(aPerson, ['course1', 'course2']);
    expect(aPerson.courses).toHaveLength(2);

    const courseNames = aPerson.courses.map(course => course.name);
    expect(courseNames).toContain('course1');
    expect(courseNames).toContain('course2');
  });
});
