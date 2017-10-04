/*
* ====================================
* Unlimited messaging helper functions
* ====================================
*
* CHALK EXAMPLE USAGE:
*
* Combine styled and normal strings
*   log(chalk.blue('Hello') + 'World' + chalk.red('!'));
*
* Compose multiple styles using the chainable API
*   log(chalk.blue.bgRed.bold('Hello world!'));
*
* Pass in multiple arguments
*   log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
*
* Nest styles
*   log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
*
* Nest styles of the same type even (color, underline, background)
*   log(chalk.green(
*       'I am a green line ' +
*       chalk.blue.underline.bold('with a blue substring') +
*       ' that becomes green again!'
*   ));
*
*/

const chalk = require('chalk');
const log = console.log;

function header(msg) {
    log(chalk.yellow('============ ' + msg + ' =============='));
}

function message(msg) {
    log(chalk.green( msg ));
}

function note(msg) {
    log(chalk.dim('Note: ' + msg ));
}

function error(msg) {
    log(chalk.red('Error: ' + msg ));
}

module.exports = {
    header: header,
    note: note,
    message: message,
    error: error
};
