'use strict';

/* jasmine specs for services go here */


//Pinched from here: http://eclipsesource.com/blogs/2014/03/27/mocks-in-jasmine-tests/
window.mock = function (constr, name) {
    var keys = [];
    for (var key in constr.prototype) {
        keys.push(key);
    }
    return keys.length > 0 ? jasmine.createSpyObj(name || "mock", keys) : {};
};


describe('service', function () {
    beforeEach(module('myApp.services'));


    describe('tools', function () {
        it('the first colour in the list should be the default selected', inject(function (tools) {
//            todo perhaps remove assumption about what the first colour is?
            expect(tools.colours[0].name).toEqual("Black");
            expect(tools.selectedColour.name).toEqual("Black");
        }));
    });

    describe('drawing', function () {


//    Mocks
        var PaperMock = {
            path: function () {
                return this
            }.bind(this),
            attr: function () {
                return this
            }.bind(this)
        };

        var ToolsMock = {selectedColour: {colourValue: ""} };

        beforeEach(function () {
            var tools = mock(ToolsMock);
            module(function ($provide) {
                $provide.value('tools', tools);
            });
        });

        it('starting a path puts it in the right place', inject(function (drawing) {

            var paper = mock(PaperMock);

            drawing.startPath(paper, 1000, 10);

            expect(paper.path).toHaveBeenCalledWith("M1000,10");
        }));
    });

});
