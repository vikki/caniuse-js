'use strict';

var chai = require('chai');
var assert = chai.assert;

var _ = require('underscore');
var consoleReporter = require('../../../lib/reporters/console.js');
var chalk = require('chalk');

describe('console.js', function () {
  describe('should log', function() {
    it('a single error', function () {
        var input = [{
          filename:"./stuff.js",
          tokens:[
          {
            token:"getUserMedia",
            location:{
              start:{ line:14, column:50},
              end:{ line:14, column:55}
            }
          }]
        }];

        var expectedOutput = "./stuff.js"
                           + "\n  line  14  col  50  getUserMedia"
                           + "\n"
                           + "\n⚠ 1 warnings";

        var actualOutput = chalk.stripColor(consoleReporter.getReportText(input));
        assert.equal(expectedOutput, actualOutput);
      });

      it('multiple errors', function () {
        var input = [{
          filename:"./stuff.js",
          tokens:[
          {
            token:"getUserMedia",
            location:{
              start:{ line:14, column:50},
              end:{ line:14, column:55}
            }
          },
          {
            token:"now",
            location:{
              start:{ line:13, column:15},
              end:{ line:13, column:17}
            }
          }]
        }];

        var expectedOutput = "./stuff.js"
                           + "\n  line  14  col  50  getUserMedia"
                           + "\n  line  13  col  15  now"
                           + "\n"
                           + "\n⚠ 2 warnings";

        var actualOutput = chalk.stripColor(consoleReporter.getReportText(input));
        assert.equal(expectedOutput, actualOutput);
      });

      it('multiple files', function () {
        var input = [{
          filename:"./stuff.js",
          tokens:[
          {
            token:"getUserMedia",
            location:{
              start:{ line:14, column:50},
              end:{ line:14, column:55}
            }
          },
          {
            token:"now",
            location:{
              start:{ line:13, column:15},
              end:{ line:13, column:17}
            }
          }]
        },
        {
          filename:"./stuff2.js",
          tokens:[
          {
            token:"now",
            location:{
              start:{ line:13, column:15},
              end:{ line:13, column:17}
            }
          }]
        }];

        var expectedOutput = "./stuff.js"
                           + "\n  line  14  col  50  getUserMedia"
                           + "\n  line  13  col  15  now"
                           + "\n"
                           + "\n./stuff2.js"
                           + "\n  line  13  col  15  now"
                           + "\n"
                           + "\n⚠ 3 warnings";

        var actualOutput = chalk.stripColor(consoleReporter.getReportText(input));
        assert.equal(expectedOutput, actualOutput);
      });

      it('no errors', function () {
        var input = [{
          filename:"./stuff.js",
          tokens:[]
        }];

        var expectedOutput = "./stuff.js"
                           + "\n"
                           + "\n"
                           + "\n⚠ 0 warnings";

        var actualOutput = chalk.stripColor(consoleReporter.getReportText(input));
        assert.equal(expectedOutput, actualOutput);
      });
  });
});