/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     * This suite contains 3 specs.
     */
    describe('RSS Feeds', function() {

        /* Ensures that the allFeeds variable has been defined and that
         * it is not empty.
         */
        it('are defined', function() {
            // Checks that the allFeeds variable has been defined.
            expect(allFeeds).toBeDefined();
            // Checks that the length of the allFeeds variable is not 0.
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed in the allFeeds object and ensures
         * it has a URL defined and that the URL is not empty.
         */
        it('have URLs', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                // Checks that the current URL is defined.
                expect(allFeeds[i].url).toBeDefined();
                // Checks that the current URL is not empty.
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        /* Loops through each feed in the allFeeds object and ensures
         * it has a name defined and that the name is not empty.
         */
        it('have names', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                // Checks if the current name is defined.
                expect(allFeeds[i].name).toBeDefined();
                // Checks if the current name is not empty.
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    /* This is our second test suite. This suite is all about the menu
     * visibility. It contains 2 specs.
     */
    describe('The menu', function() {
        /* Ensures the menu element is hidden by default.
         */
        it('menu is hidden by default', function() {
            // Checks if the menu-hidden class is active in the body element.
            // If true, menu is successfully hidden.
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Ensures the menu visibility is toggled when the menu icon is
         * clicked. This test has two expectations: the menu should display
         * when clicked and should hide when clicked again.
         */
        it('menu unhides & hides when clicked', function() {
            // Initiates a click on the menu icon.
            $('.menu-icon-link').trigger("click");
            // Checks if the menu-hidden class is no longer active in the body
            // element. If true, menu is visible.
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            // Initiates a click on the menu icon.
            $('.menu-icon-link').trigger("click");
            // Checks if the menu-hidden class is once again active in the body
            // element. If true, menu is hidden.
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* This is our third test suite. This suite is all about making sure
     * initial entrise are present within the .feed container.
     * It contains 1 spec.
     */
    describe('Initial Entries', function() {
        /* Ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // Performs the asynchronous loadFeed function before running test.
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Checks that there is an .entry element within the .feed container.
        it('at least one .entry element exists within .feed container', function(done) {
            // Checks if the .feed element contains an .entry child element
            // by checking that the .entry element is not a length of 0.
            expect($('.feed').has($('.entry')).length).not.toBe(0);
            done();
        });
    });


    /* This is our fourth test suite. This suite is all about making sure
     * new feeds are loaded properly when selected.
     * It contains 2 specs.
     */
    describe('New Feed Selection', function() {

        /* Ensures when a new feed is loaded by the loadFeed function that the
         * content actually changes. Remember, loadFeed() is asynchronous.
         */

        var indexNum = 0; // Creates variable for the loadFeed index.
        var previous = ''; // Creates variable that the current .entry element
        // html will be passed into, so that the next .entry element html can
        // be compared against it.

        // Performs the asynchronous loadFeed function before running tests.
        //// The indexNum is incremented after each test so the next item in the allFeeds
        //// object will be loaded to ensure the content changes each time
        beforeEach(function(done) {
            loadFeed(indexNum, function() {
                done();
            });
        });

        // Increments the indexNum after each test is run so the loadFeed function will
        // load the feeds for the next item in the allFeeds object
        afterEach(function(done) {
            indexNum++;
            done();
        });

        // Checks if the initial feed has an .entry element.
        it('initial feed should have at least a single .entry element', function(done) {
            // Checks if the .feed element contains an .entry child element
            // by checking that length of .entry element is not 0.
            expect($('.feed').has($('.entry')).length).not.toBe(0);
            // Overwrites previous variable with .entry element html of current
            // item.
            previous = $('.entry').html();
            done();
        });

        // Iterates through allFeeds items to check for change in .entry content.
        for (var i = 1; i < allFeeds.length; i++) {
            var currentIndex = i + 1; // Indicates the current feed item
            // Checks if the .entry element has changed.
            it('first .entry of feed ' + currentIndex + ' is different than first .entry of feed ' + i, function(done) {
                // Checks if the .feed element contains an .entry child element
                // by checking that length of .entry element is not 0.
                expect($('.feed').has($('.entry')).length).not.toBe(0);
                // Checks that the current .entry element html is different from
                // .entry element html of previous item.
                expect($('.entry').html()).not.toBe(previous);
                // Overwrites previous variable with .entry element html of
                // current item in preparation for next comparison.
                previous = $('.entry').html();
                done();
            });
        }
    });

}());
