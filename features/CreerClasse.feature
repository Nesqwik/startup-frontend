Feature: Create a new class
  As a teacher
  I want to create a new class
  In order to add my student in


  Scenario outline: Create a new class inexisting success
    Given I want to create a new class named <className>
    And the class <className> is not already existing
    When I wrote <className> in the className input
    And I click on the submit button
    Then A <className> class is created

  Examples:
  | className  |
  | CM1        |
  | ma classe  |
  | seconde    |



  Scenario : Create a new class existing failed
    Given I want to create a new class named "CM1"
    And the class "CM1" is already existing
    When I wrote "CM1" in the className input
    Then a message error is displaying
    And the class is not created


  Scenario outline: Create a new class name invalid failed
    Given I want to create a new class named <className>
    And the class name is invalid
    When I wrote <className> in the className input
    Then a message error is displaying
    And the class is not created


  Examples:
  | className  |
  | $class     |
  | £CM2       |
  | CM2%@¥     |


  Scenario: Create a new class empty name
    Given I am in the home page
    When I click the button to add a new class
    Then the submit button is disabled
    And the class is not created


  Scenario: Cancel a create class
    Given I am in the home page
    And I click the button to add a new class
    When I wrote the class name in the className input
    And I click on the cancel button
    Then the pop-up is hidden
    And the class is not created
