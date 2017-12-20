Feature: Add a new student to a class
  As a teacher
  I want to add an existing student to my class
  In order to follow him



  Scenario Outline: add a non-existent student in an existing class success
    Given the class <className> exist
    And I want to add a new student to this class
    When I wrote the starting of the student name <someLetters> in the input
    And I choose the <studentName> in the list of student 
    And I click the button submit
    Then student is added to the class
    And Im redirected to home page

    Examples: 
      | className | someLetters | studentName     | 
      | CM1       | Nad         | Nadia Ahassouni |
      | CM2       | Nes         | Louis Nesqwik   |
      | CM1       | H           | Helene Mayer    |



  Scenario: add non-existent student in list failed
    Given the class CM1 exist
    And I want to add a student name "Nadia Ahassouni" to this class
    And this student is nonexistent
    When I wrote "Nadia Ahassouni" in the input
    Then no student list is displayed
    And I cant click the button to add this student



  Scenario: add a student in an existing class cancel failed
    Given the class CM1 exist
    And I want to add a student named "Nadia Ahassouni" to this class
    And I wrote the begening of the student name in the input
    When I choose "Nadia Ahassouni" in the list of student displayed
    And I click the cancel submit
    Then the pop-up is hidden
    And the student is not added to the class



  Scenario: add new student with empty input failed
    Given the class CM1 exist
    And I want to add a student name "Nadia Ahassouni" to this class
    When let the input name empty
    Then I cant click the button add to add the student



  Scenario: add a student name with invalid character failed
    Given the class CM2 exist
    And I want to add a student named "Basile Dyment" to this class
    When I wrote "@Basile"
    Then I cant click the button submit to add the student



