/*************************************************************************
 * Virtual Machine DOM loader
 *
 * Find the script element with the ID matching the
 * fully qualified module name (e.g., batavia-foo.bar.whiz)
 *************************************************************************/
var types = require('../types')
var Block = require('../core').Block
var builtins = require('../builtins')
var Frame = require('../core').Frame
var constants = require('../core').constants
var exceptions = require('../core').exceptions
var native = require('../core').native
var dis = require('../modules/dis')
var marshal = require('../modules/marshal')
var sys = require('../modules/sys')

module.exports = function(name) {
    var element = document.getElementById('batavia-' + name)
    if (element === null) {
        // If the element doesn't exist, look for a javascript element.
        element = window[name]
        if (element === undefined) {
            return null
        } else {
            return {
                'javascript': element
            }
        }
    }

    // Look for the filename in the data-filename
    // attribute of script tag.
    var filename
    if (element.dataset) {
        filename = element.dataset['filename']
    } else {
        filename = '<input>'
    }

    // Strip all the whitespace out of the text content of
    // the script tag.
    return {
        '$pyclass': true,
        'bytecode': element.text.replace(/(\r\n|\n|\r)/gm, '').trim(),
        'filename': new types.Str(filename)
    }
}

