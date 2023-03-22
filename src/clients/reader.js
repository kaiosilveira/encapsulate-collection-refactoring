export function logBasicCoursesOf(aPerson) {
  const basicCourses = aPerson.courses.filter(course => !course.isAdvanced);
  console.log(basicCourses);
}
