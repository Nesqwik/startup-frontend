Feature: Listing the list of student (auto-completion)
  As a teacher
  I want to list the students which names start with the input
  Then I see the list of these students 


  Scenario: 3 students whose name starts with the input are displayed
    Given I want to display the list of student whose name start with "ben"
    And there is 3 students whose name begins with "ben"
    When I wrote "ben" in the input
    Then a list of 3 students whose names begin with "ben" is displayed



  Scenario: 1 student whose name starts with the input is displayed
    Given I want to display the list of student whose name start with "ben"
    And there is only one student whose name begins with "ben"
    When I wrote "ben" in the input
    Then a list which content only one student whose name begin with "ben" is displayed



  Scenario: no student whose name stars with the input 
    Given I want to display the list of student whose name start with "ben"
    And there is no student whose name begins with "ben"
    When I wrote "ben" in the input
    Then no student is displayed
