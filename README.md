[![Continuous Integration](https://github.com/kaiosilveira/encapsulate-collection-refactoring/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/encapsulate-collection-refactoring/actions/workflows/ci.yml)

ℹ️ _This repository is part of my Refactoring catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

# Encapsulate Collection

Sometimes our code already has a good level of encapsulation: we have classes protecting the access to records and we are providing getters and setters when appropriate. Then, it turns out that one of these getters is returning a collection. Providing raw access to our original nested data structures can be tricky[<sup>[1]</sup>](https://github.com/kaiosilveira/encapsulate-variable-refactoring/tree/099d816c773ebb72232cb1f0744e32bfbf300628#example-2-complex-objects), as unwanted side effects can creep up as hard-to-debug problems. This refactoring provides general guidelines on how to avoid this problem.

## Working example

Our working example happens in an educational problem space where we have a `Person` with some `Courses`. Some of these courses are advanced, while others are not. Our initial code is providing direct access to the heap value of the `_courses` array (via a getter), which can lead to the problems mentioned above. Check the before/after comparison below for a sneaky peak of the refactoring outcomes.

**Before**

```javascript
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }

  get name() {
    return this._name;
  }

  get courses() {
    return this._courses;
  }

  set courses(aList) {
    this._courses = aList;
  }
}
```

**After**

```javascript
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }

  get name() {
    return this._name;
  }

  get courses() {
    return this._courses.slice();
  }

  set courses(aList) {
    this._courses = aList.slice();
  }

  addCourse(aCourse) {
    this._courses.push(aCourse);
  }

  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    }
  ) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1) fnIfAbsent();
    else this._courses.splice(index, 1);
  }
}
```

Some clients are using this data in different ways. We have a reader:

```javascript
export function logBasicCoursesOf(aPerson) {
  const basicCourses = aPerson.courses.filter(course => !course.isAdvanced);
  console.log(basicCourses);
}
```

and some writers:

```javascript
// writer1.js
export function updatePersonCoursesByCourseNames(aPerson, courseNames) {
  aPerson.courses = courseNames.map(name => new Course(name, false));
}

// writer2.js
export function appendBasicCoursesToPersonByCourseName(aPerson, courses) {
  for (const name of courses) {
    aPerson.courses.push(new Course(name, false));
  }
}
```

The main idea here is straightforward: assigning and returning copies of the array data structure to the `Person` class is key to keeping it protected from external modifications. Check the next sections for a step-by-step guide on how to get to this result.

### Test suite

A simple test suite was put in place to make sure our clients remain consistent as we perform the refactoring steps:

```javascript
// writer1.test.js
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

// writer2.test.js
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
```

These tests should be enough to keep us protected throughout.

### Steps

We begin our refactoring by adding handlers to intermediate the interactions with a person's courses:

```diff
diff --git a/src/entities/Person.js b/src/entities/Person.js
@@ -15,4 +15,19 @@
export default class Person {
   set courses(aList) {
     this._courses = aList;
   }
+
+  addCourse(aCourse) {
+    this._courses.push(aCourse);
+  }
+
+  removeCourse(
+    aCourse,
+    fnIfAbsent = () => {
+      throw new RangeError();
+    }
+  ) {
+    const index = this._courses.indexOf(aCourse);
+    if (index === -1) fnIfAbsent();
+    else this._courses.splice(index, 1);
+  }
 }

```

Then we update the client which was appending data to the courses to use the new `addCourse` method instead of accessing the array directly:

```diff
diff --git a/src/clients/writer2/index.js b/src/clients/writer2/index.js
@@ -2,6 +2,6 @@
import Course from '../../entities/Course.js';

 export function appendBasicCoursesToPersonByCourseName(aPerson, courses) {
   for (const name of courses) {
-    aPerson.courses.push(new Course(name, false));
+    aPerson.addCourse(new Course(name, false));
   }
 }
```

Moving on, we can assign a copy (by using `array.slice()` here) to the data being provided as the value of `_courses`, instead of using the real, external pointer to the heap:

```diff
diff --git a/src/entities/Person.js b/src/entities/Person.js
@@ -13,7 +13,7 @@
export default class Person {
   }

   set courses(aList) {
-    this._courses = aList;
+    this._courses = aList.slice();
   }

   addCourse(aCourse) {
```

The same rule is valid when we are returning our data:

```diff
diff --git a/src/entities/Person.js b/src/entities/Person.js
@@ -9,7 +9,7 @@
export default class Person {
   }

   get courses() {
-    return this._courses;
+    return this._courses.slice();
   }

   set courses(aList) {
```

And that's it! Now our collection inside a `Person`'s instance is protected against external, unnoticed modifications.

### Commit history

Below there's the commit history for the steps detailed above.

| Commit SHA                                                                                                                    | Message                                                           |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [1b869d0](https://github.com/kaiosilveira/encapsulate-collection-refactoring/commit/1b869d0bd2c7f20cc88c523538e04a29271e6b94) | add handlers to intermediate interactions with a person's courses |
| [6dda53f](https://github.com/kaiosilveira/encapsulate-collection-refactoring/commit/6dda53ff29fd8a755778f6d17d3c310e898ff07f) | update client to use `Person.addCourses`                          |
| [1ec8365](https://github.com/kaiosilveira/encapsulate-collection-refactoring/commit/1ec836521e350572de7200853382250f2790608f) | clone collection when adding to a Person's courses                |
| [f4252f6](https://github.com/kaiosilveira/encapsulate-collection-refactoring/commit/f4252f68b2334ecf211ee50c96391d3d4dadea6c) | clone the collection when returning a Person's course list        |

For the full commit history for this project, check the [Commit History tab](https://github.com/kaiosilveira/encapsulate-collection-refactoring/commits/main).
