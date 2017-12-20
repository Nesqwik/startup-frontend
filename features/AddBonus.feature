Feature: Add a good point to a student
  As a teacher
  I want to add a good point to a student
  In order to encourage him


  Scenario Outline: add a bonus to a student success
    Given the student "Raphael Ruffin" had <n> good points
    When I want to give a good point to "Raphael Ruffin"
    And I click the button "plus"
    Then the number of good point of "Raphael Ruffin" becomes <n+1> good points

    Examples: 
       |  n   |  n+1  |
       |  0   |   1   |
       |  12  |   13  |
       |  29  |   30  |
       