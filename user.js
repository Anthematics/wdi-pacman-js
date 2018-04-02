function User(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

const user1 = new User('Jason', 'Harder', 26, 'male');

// A prototype is an object that other objects can refer to when getting
// needed information or functionality.
User.prototype.emailDomain = '@hireharder.com';

//

User.prototype.getEmailAddress = function () {
  return this.firstName + this.lastName + this.emailDomain;
};
// with this method written - any user would have access to a custom email
// address on their prototype.

// the below function will invoke the function that creates users.

user1.getEmailAddress();
