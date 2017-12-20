Feature: Add a new student to a class
  As a teacher
  I want to add an existing student to my class
  In order to follow him


  Scenario Outline: add a student in the class success
    Given the class "CM1" exist
    When I want to add a new student
    And I complete inputs : <firstName> <lastName> <birth>
    And I click the button submit to add this student to class "CM1"
    Then "Stephane Fonte" is added to the class "CM1"
    And the pop-up is hidden


      Examples: 
       | firstName       | lastName     |     birth       |
       | Nadia           | Ahassouni    |   2000-12-11    |
       | Jean            | Balbala      |   1994-03-06    |


  Scenario: cancel the addition of a student in a class
    Given the class "CM1" exist
    When I want to add a new student
    And I add complete the form informations
    And I click the button cancel 
    Then "Stephane Fonte" the student is not added in the class
    And the pop-up is hidden



  Scenario: add student with empty input failed
    Given the class "CM1" exist
    When I want to add a new student in this class
    When let the input name empty
    Then I can't click the button submit



  Scenario Outline: add a student name with invalid character failed
    Given the class "CM2" exist
    When I want to add a new student in this class
    And I write <studentName> in the input
    Then I can't click the button submit

    Examples: 
       | studentName         |
       | Ahassouni N@dia     |
       | Ahassouni *Na       |
       | Aha$$ouni Nadia     |
       | ahassouni nadia     |
