import Course from '../../entities/Course.js';

export function updatePersonCoursesByCourseNames(aPerson, courseNames) {
  aPerson.courses = courseNames.map(name => new Course(name, false));
}
