Feature: Login in yandex.ru

Scenario: Login via email with invalid password
    Given I am on the Yandex login page
    When I fill in the email field with "zaq321456@yandex.ru"
    And I click the "Войти" button
    And I fill in the password field with "invalidPass"
    And I click the "Продолжить" button
    Then I see the error message "Неверный пароль"

Scenario: Login via email with not existed email
    Given I am on the Yandex login page
    When I fill in the email field with "invalid598@yandex.ru"
    And I click the "Войти" button
    Then I see the error message "Нет такого аккаунта"

Scenario: Login via email with email in Cyrillic
    Given I am on the Yandex login page
    When I fill in the email field with "фыв@фыв.фыв"
    And I click the "Войти" button
    Then I see the error message "Такой логин не подойдет"

Scenario: Login via email with email with invalid format
    Given I am on the Yandex login page
    When I fill in the email field with "sergey@sergey@sergey.ru"
    And I click the "Войти" button
    Then I see the error message "Такой логин не подойдет"

Scenario: Login via telephone with invalid number format
    Given I am on the Yandex login page
    When I click the "Телефон" button
    And I fill in the "Беларусь" phone field with "+375 (02) 123-12-3123"
    And I click the "Войти" button
    Then I see the error message "Недопустимый формат номера"

Scenario: Login via telephone with valid number
    Given I am on the Yandex login page
    When I click the "Телефон" button
    And I fill in the "Беларусь" phone field with "+375 (29) 542-19-43"
    And I click the "Войти" button
    Then I see the message "Введите код"