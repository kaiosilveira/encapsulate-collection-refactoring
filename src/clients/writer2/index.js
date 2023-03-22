import Course from '../../entities/Course.js';

export function appendBasicCoursesToPersonByCourseName(aPerson, courses) {
  for (const name of courses) {
    aPerson.courses.push(new Course(name, false));
  }
}
