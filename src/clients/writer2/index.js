import Course from '../../entities/Course.js';

export function appendBasicCoursesToPersonByCourseName(aPerson, courses) {
  for (const name of courses) {
    aPerson.addCourse(new Course(name, false));
  }
}
