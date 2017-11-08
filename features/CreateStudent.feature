Feature: Create a new student to a class
  As a teacher
  I want to create a new student 
  In order to add him to a class


	Scenario Outline: Add a new student nonexistent success
 		Given I want to create a new student named <lastName> and <firstName>
 		And this student does not exist already in the list of students
 		When I wrote in the form the student name <lastName> <firstName> and the date of birthday <birth>
 		And I click the submit button
 		Then the student is created
 		And I am redirected to the page which list student

 		Examples: 
     	 | lastName         | firstName     | birth       |
     	 | Ahassouni        | Nadia         | 06-03-1994  |
     	 | Pierre-claver    | Diarra        | 09-02-1994  |
     	 | Richard          | Marie         | 05-02-1992  |


 	Scenario Outline: Add a new student name already existing success
 		Given I want to create a new student named <studentName>
 		And there is already a student named <studentName> which date of birthday is <datebirth1>
 		When I wrote in the form the name of the new student and his date of birthday <datebirth2>
 		And I click the submit button
 		Then the student is created

 	 	Examples: 
     	 | name              | dateBirth1    | dateBirth1    
     	 | Nadia Ahassouni   | 06-03-1994    | 23-09-1992 
     	 | Nadia Ahassouni   | 07-02-1994    | 12-12-1993 
     	 | Nadia Ahassouni   | 23-09-1992    | 09-04-1994 


 	Scenario: Add a new student name and birthday already existing failed
 		Given I want to create a new student named "Nadia Ahassouni" and born on 06-03-1994
 		And there is already a student named "Nadia Ahassouni" born on the same date
 		When I wrote in the form the name of the new student and his date of birthday
 		And I click the submit button
 		Then a message error is dispalyed
 		And the student is not created


 	 Scenario : Add a new student error - one or all of the inputs are empty
 		Given I want to create a new student named "Nadia Ahassouni" and born on 06-03-1994
 		And this student does not already exit in the list of students
 		When I wrote in the form the last name of the new student and his date of birthday
 		And I let the firt name empty
 		then I can't click the button submit to add the new student


 	 Scenario Outline: Add a new student error - one or all of the inputs ane invalid
 		Given I want to create a new student named "Nadia Ahassouni" and born on 06-03-1994
 		And this student does not already exit in the list of students
 		When I wrote in the form the name of the new student <lastName> <firtName> and his date of birthday <birth>
 		And one or all of the inputs is invalid
 		then I can't click the button submit to add the new student

 		Examples: 
     	 | lastName         | firstName     | birth       |
     	 | Ahassouni^^      | Nadia         | 06-03-1994  |
     	 | Pierre=claver    | Dia%rra:      | 09-02-1994  |

