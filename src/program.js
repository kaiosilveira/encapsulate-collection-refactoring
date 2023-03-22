import { aPerson } from './db/index.js';
import { readBasicCourseNames } from './clients/utils.js';
import { logBasicCoursesOf } from './clients/reader.js';
import { updatePersonCoursesByCourseNames } from './clients/writer1/index.js';
import { appendBasicCoursesToPersonByCourseName } from './clients/writer2/index.js';

logBasicCoursesOf(aPerson);
updatePersonCoursesByCourseNames(aPerson, readBasicCourseNames('filename.txt'));
appendBasicCoursesToPersonByCourseName(aPerson, readBasicCourseNames('filename.txt'));
