Feature: Add a good point to a student
  As a teacher
  I want to add a good point to a student
  In order to encourage him


  Scenario Outline: add a bonus to a student success
    Given the student "Raphael Ruffin" had <n> good points
    When I want to give a good point to "Raphael Ruffin"
    And the pop-up is displayed
    And I click the button validate
    Then the number of good point of "Raphael Ruffin" becomes <n+1> good points
    And the pop-up is hidden
    And the student receive a notification


    Examples: 
       |  n   |  n+1  |
       |  0   |   0   |
       |  12  |   13  |
       |  29  |   30  |


    Scenario: cancel addition of a bonus to a student 
    Given the student "Raphael Ruffin" had 10 points
    When I want to give a good point to "Raphael Ruffin"
    And the pop-up is displayed
    And I click the button cancel
    Then the number of point of "Raphael Ruffin" is 10
    And the pop-up is hidden
