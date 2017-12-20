Feature: display good points and malus
  As a student
  I want to display my good points and malus 
  In order to know what i've to improve and what i've to avoid

    Scenario: display number of good points and malus
    Given I have 20 good points and 3 malus
    When I want to display the detail of my points
    Then the number of my good points displayed is 20
    And the number of my malus displayed is 3
