Feature: Add a new student to a class
  As a teacher
  I want to add an existing student to my class
  In order to follow him



  Scenario: add a student already created and nonexistent in the class success
    Given the class "CM1" exist
    And the student "Stephane Fonte" is already created
    And the student "Stephane Fonte" don't exist in this class
    When I write "Stephane Fonte" in the input
    And I click the button submit to add this student to class "CM1"
    Then "Stephane Fonte" is added to the class "CM1"
    And the pop-up is hidden



  Scenario: add non-created student failed
    Given the class "CM2" exist
    And the student "Stephane Fonte" is not yet created
    When I write "Stephane Fonte" in the input
    Then an error is displayed
    And I can't click the button submit



  Scenario: cancel the addition of a student in a class
    Given the class "CM1" exist
    And the student "Stephane Fonte" is already created
    And the student "Stephane Fonte" don't exist in this class
    When I write "Stephane Fonte" in the input
    And I click the button cancel
    Then the pop-up is hidden
    And the student is not added to the class



  Scenario: add student with empty input failed
    Given the class "CM1" exist
    When let the input name empty
    Then I can't click the button submit



  Scenario Outline: add a student name with invalid character failed
    Given the class "CM2" exist
    When I wrote <studentName> in the input
    Then I can't click the button submit

    Examples: 
       | studentName         |
       | Ahassouni N@dia     |
       | Ahassouni *Na       |
       | Aha$$ouni Nadia     |



