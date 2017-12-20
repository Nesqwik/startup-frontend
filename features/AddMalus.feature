Feature: Add a malus to a student
  As a teacher
  I want to add a malus to a student
  In order to show him that his behavior was not good


  Scenario Outline: add a malus to a student success
    Given the student "Raphael Ruffin" had <n> points
    When I want to give a malus to "Raphael Ruffin"
    And I click the button "moins"
    Then the number of point of "Raphael Ruffin" becomes <n-1> points


    Examples: 
       |   n    |  n-1   |
       |   0    |   -1   |
       |   1    |   0    |      
       |  31    |   30   |
       | -10    |  -11   |
