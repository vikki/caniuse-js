'use strict';

var chalk = require('chalk');
var table = require('text-table');
var logSymbols = require('log-symbols');
var pluralize = require('pluralize');

var theme = {
  title: chalk.underline.gray,
  fileLocation: chalk.gray,
  warning: (process.platform !== 'win32' ? chalk.blue : chalk.cyan)
};

var getReportText = function (data) {
  var output = '';

  data.forEach(function(file) {
    output += theme.title(file.filename);
    output += "\n";

    var cells = file.tokens.map(function(token) {
      return [
        '',
        theme.fileLocation("line"),
        theme.fileLocation(token.location.start.line),
        theme.fileLocation("col"),
        theme.fileLocation(token.location.start.column),
        theme.warning(token.token)
      ];
    });
    output += table(cells);
    output += '\n\n';
  });

  var numberOfErrors = data.reduce(function(acc, file) {
    return acc + file.tokens.length;
  }, 0);

  output += logSymbols.warning + ' ' + numberOfErrors + ' ' + pluralize('warning');
  return output;
}

var consoleReporter = function (data) {
  console.log(getReportText(data));
};

module.exports = {
	report: consoleReporter,
	getReportText: getReportText
};
