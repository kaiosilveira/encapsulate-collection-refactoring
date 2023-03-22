import Person from '../entities/Person.js';
import Course from '../entities/Course.js';

export const aPerson = new Person('Kaio Silveira');
aPerson.courses = [
  new Course('Refactoring', true),
  new Course('TDD', true),
  new Course('Introduction to Programming', false),
];
