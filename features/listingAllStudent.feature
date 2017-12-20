Feature: displaying a list of existing student
  As a teacher
  I want to list the students existing
  Then I see the list of these students 


  Scenario: no student existing
    Given there is no student existing
    When I want to see the list of student
    Then no student is displayed



  Scenario outline: display students existing
    Given I have  these students existing <student1>, <student2>, <student3>
    When I want to see the list of student
    Then a list of 3 students is displayed

    Examples:
      | student1           | student2       | student3        |
      | Nadia Ahassouni    | Hélène  Meyer  | Louis Nesqwik   |
