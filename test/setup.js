process.stdout.write('Starting test environment');

const getFile = function(filepath) {
  var path = require('path');
  var fs = require('fs');
  return fs.readFileSync(path.resolve(__dirname, '..', filepath)).toString();
};

const addScript = function(window, script) {
  const scriptEl = window.document.createElement("script");
  scriptEl.textContent = script;
  window.document.body.appendChild(scriptEl);
}

global.chai = require('chai');
global.expect = chai.expect;
global.assert = chai.assert;
chai.should();
process.stdout.write('.');

const { JSDOM } = require('jsdom');
process.stdout.write('. OK\n');

module.exports = function(done) {
  JSDOM.fromFile('test/fixtures/context.html', { runScripts: 'dangerously' }).then(dom => {
    const window = dom.window;
    addScript(window, getFile('support/vendor/jquery.js'));
    addScript(window, getFile('nextdoc.js'));
    global.window = window;
    global.$ = window.jQuery;
    global.Nextdoc = window.Nextdoc;
    done();
  }).catch(done);
};
