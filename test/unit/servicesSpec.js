'use strict';

/* jasmine specs for services go here */

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

//        mocks
        var MockPaper = function() {
            return {
                path: function () {return this},
                attr: function () {return this}
            }
        };

        it('starting a path puts it in the right place', inject(function (drawing) {
            var paper = MockPaper();
            spyOn(paper, 'path').andCallThrough();

            drawing.startPath(paper, 1000, 10);

            expect(paper.path).toHaveBeenCalledWith("M1000,10");

        }));
    });

});
