const chai = require("chai");
const chaiAsPromised = require('chai-as-promised')
const done = chai.done
const expect = chai.expect
const should = require('chai').should()
chai.use(chaiAsPromised);


const mocha = require('mocha')
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
    // Key = webdriver.Key;
const test = require('selenium-webdriver/testing');



describe( 'Test player-specific interactions' , function(){

    let driver
    const my_heading = "Join A Game"
    const url = 'https://nertzio.herokuapp.com/signin'

    before(() => {
        driver = new webdriver.Builder().forBrowser('chrome').build()
        driver.manage().window().setSize(1440, 817)
        driver.manage().timeouts().implicitlyWait(10000)

        // .then(_ => driver.wait(until))
        // .then(_ => driver.wait(until))

    });

    after(function(){

        return driver.quit();

    });

    it( 'Redirect to Join A Game from Successful Sign-in', () => {

        function testRedirectOnSignIn () {
            return driver.get(url)
            .then(_ => driver.findElement(By.id('email')).sendKeys('a@b.com'))
            // .then(_ => driver.wait(until))
            .then(_ => driver.findElement(By.id('password')).sendKeys('test123'))
            .then(_ => driver.findElement(By.id('quickstart-sign-in')).click())
            .then(_ => driver.findElement(By.tagName('h1')))
            .then(heading => {
                return heading
            })
            .catch(err => {
                console.error(err)
            })
        }

        // return expect("hi").equals("hi")
        testRedirectOnSignIn().should.eventually.equal(my_heading).notify(done);

    })
})


