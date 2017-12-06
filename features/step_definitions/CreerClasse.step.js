const cucumber = require('cucumber');
const Selector = require('testcafe').Selector;

cucumber.defineSupportCode(function ({Given, When, Then}) {
    let t;

    Given('I am in the home page', function () {
        return this.waitForTestController()
            .then(function (tc) {
                t = tc;
                return t.navigateTo('http://localhost:3000');
            });
    });

    When('I click the button to add a new class', function () {
        let createClass = Selector(".create-class");
        return t.click(createClass.find(".add-button"));
    });

    Then('the submit button is disabled', function () {
        const submitButton = Selector(".create-class-form .cancel-button");

        return t.expect(submitButton.attributes.disabled).eql(true);
    });

    Then('the class is not created', function () {
        return t.expect()
    });

    /*********************************/
/*
    Given('I open two chat window', function () {
        return this.waitForTestController()
            .then((tc) => {
                t = tc;
                return t.navigateTo('http://localhost:3000');
            }).then(() => {
                return this.waitForTestController().then((tc) => {
                    t2 = tc;

                    return t2.navigateTo('http://localhost:3000');
                })
            });
    });

    When('I wrote {string} in the chat input in the first window', async function (text) {
        await t.typeText(addMessage.find("input"), text);
        await t.expect(addMessage.find("input").with({boundTestRun: t}).value).eql(text);
        return t2.expect(addMessage.find("input").with({boundTestRun: t2}).value).eql(text);
    });

    When('I click on the send button in the first window', function () {
        return t.click(addMessage.find("button"));
    });

    Then('A {string} message is printed in the second window', function (text) {
        const messageLi = messageList.find("li").with({boundTestRun: t2});
        return t2.expect(messageLi.textContent).contains(text);
    });

*/
});