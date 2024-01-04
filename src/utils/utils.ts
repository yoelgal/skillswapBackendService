import { courses } from './courses.data';

function testCourses() {
  return courses[0].slice(-7);
}

console.log(testCourses());
