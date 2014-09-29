var isWin = /^win/.test(process.platform);

if (isWin) {
    var usb = require('./platform/windows/HID.node');
} else {
    var usb = require('usb');
}

var VENDOR_ID = 0x20a0,
PRODUCT_ID = 0x41e5,

COLOR_KEYWORDS = {
    "aqua": "#00ffff",
    "aliceblue": "#f0f8ff",
    "antiquewhite": "#faebd7",
    "black": "#000000",
    "blue": "#0000ff",
    "cyan": "#00ffff",
    "darkblue": "#00008b",
    "darkcyan": "#008b8b",
    "darkgreen": "#006400",
    "darkturquoise": "#00ced1",
    "deepskyblue": "#00bfff",
    "green": "#008000",
    "lime": "#00ff00",
    "mediumblue": "#0000cd",
    "mediumspringgreen": "#00fa9a",
    "navy": "#000080",
    "springgreen": "#00ff7f",
    "teal": "#008080",
    "midnightblue": "#191970",
    "dodgerblue": "#1e90ff",
    "lightseagreen": "#20b2aa",
    "forestgreen": "#228b22",
    "seagreen": "#2e8b57",
    "darkslategray": "#2f4f4f",
    "darkslategrey": "#2f4f4f",
    "limegreen": "#32cd32",
    "mediumseagreen": "#3cb371",
    "turquoise": "#40e0d0",
    "royalblue": "#4169e1",
    "steelblue": "#4682b4",
    "darkslateblue": "#483d8b",
    "mediumturquoise": "#48d1cc",
    "indigo": "#4b0082",
    "darkolivegreen": "#556b2f",
    "cadetblue": "#5f9ea0",
    "cornflowerblue": "#6495ed",
    "mediumaquamarine": "#66cdaa",
    "dimgray": "#696969",
    "dimgrey": "#696969",
    "slateblue": "#6a5acd",
    "olivedrab": "#6b8e23",
    "slategray": "#708090",
    "slategrey": "#708090",
    "lightslategray": "#778899",
    "lightslategrey": "#778899",
    "mediumslateblue": "#7b68ee",
    "lawngreen": "#7cfc00",
    "aquamarine": "#7fffd4",
    "chartreuse": "#7fff00",
    "gray": "#808080",
    "grey": "#808080",
    "maroon": "#800000",
    "olive": "#808000",
    "purple": "#800080",
    "lightskyblue": "#87cefa",
    "skyblue": "#87ceeb",
    "blueviolet": "#8a2be2",
    "darkmagenta": "#8b008b",
    "darkred": "#8b0000",
    "saddlebrown": "#8b4513",
    "darkseagreen": "#8fbc8f",
    "lightgreen": "#90ee90",
    "mediumpurple": "#9370db",
    "darkviolet": "#9400d3",
    "palegreen": "#98fb98",
    "darkorchid": "#9932cc",
    "yellowgreen": "#9acd32",
    "sienna": "#a0522d",
    "brown": "#a52a2a",
    "darkgray": "#a9a9a9",
    "darkgrey": "#a9a9a9",
    "greenyellow": "#adff2f",
    "lightblue": "#add8e6",
    "paleturquoise": "#afeeee",
    "lightsteelblue": "#b0c4de",
    "powderblue": "#b0e0e6",
    "firebrick": "#b22222",
    "darkgoldenrod": "#b8860b",
    "mediumorchid": "#ba55d3",
    "rosybrown": "#bc8f8f",
    "darkkhaki": "#bdb76b",
    "silver": "#c0c0c0",
    "mediumvioletred": "#c71585",
    "indianred": "#cd5c5c",
    "peru": "#cd853f",
    "chocolate": "#d2691e",
    "tan": "#d2b48c",
    "lightgray": "#d3d3d3",
    "lightgrey": "#d3d3d3",
    "thistle": "#d8bfd8",
    "goldenrod": "#daa520",
    "orchid": "#da70d6",
    "palevioletred": "#db7093",
    "crimson": "#dc143c",
    "gainsboro": "#dcdcdc",
    "plum": "#dda0dd",
    "burlywood": "#deb887",
    "lightcyan": "#e0ffff",
    "lavender": "#e6e6fa",
    "darksalmon": "#e9967a",
    "palegoldenrod": "#eee8aa",
    "violet": "#ee82ee",
    "azure": "#f0ffff",
    "honeydew": "#f0fff0",
    "khaki": "#f0e68c",
    "lightcoral": "#f08080",
    "sandybrown": "#f4a460",
    "beige": "#f5f5dc",
    "mintcream": "#f5fffa",
    "wheat": "#f5deb3",
    "whitesmoke": "#f5f5f5",
    "ghostwhite": "#f8f8ff",
    "lightgoldenrodyellow": "#fafad2",
    "linen": "#faf0e6",
    "salmon": "#fa8072",
    "oldlace": "#fdf5e6",
    "bisque": "#ffe4c4",
    "blanchedalmond": "#ffebcd",
    "coral": "#ff7f50",
    "cornsilk": "#fff8dc",
    "darkorange": "#ff8c00",
    "deeppink": "#ff1493",
    "floralwhite": "#fffaf0",
    "fuchsia": "#ff00ff",
    "gold": "#ffd700",
    "hotpink": "#ff69b4",
    "ivory": "#fffff0",
    "lavenderblush": "#fff0f5",
    "lemonchiffon": "#fffacd",
    "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a",
    "lightyellow": "#ffffe0",
    "magenta": "#ff00ff",
    "mistyrose": "#ffe4e1",
    "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead",
    "orange": "#ffa500",
    "orangered": "#ff4500",
    "papayawhip": "#ffefd5",
    "peachpuff": "#ffdab9",
    "pink": "#ffc0cb",
    "red": "#ff0000",
    "seashell": "#fff5ee",
    "snow": "#fffafa",
    "tomato": "#ff6347",
    "white": "#ffffff",
    "yellow": "#ffff00",
    "warmwhite": "fdf5e6"	// Non-standard. Added to support CheerLights.
};




/**
 * A BlinkStick device.
 *
 * @class BlinkStick
 * @constructor
 * @param {Object} device The USB device as returned from "usb" package.
 * @param {String} [serialNumber] Serial number of the device. Used only in Windows.
 * @param {String} [manufacturer] Manufacturer of the device. Used only in Windows.
 * @param {String} [product] Product name of the device. Used only in Windows.
 */

function BlinkStick (device, serialNumber, manufacturer, product) {

    if (isWin) {
        if (device) {
            this.device = new usb.HID(device);
            this.serial = serialNumber;
            this.manufacturer = manufacturer;
            this.product = product;

            var self = this;

            process.on('exit', function() {
                self.device.close();
            });
        }
    } else {
        if (device) {
            process.on('exit', function() {
                device.close();
            });

            device.open ();
            this.device = device;

            var self = this;

        }
    }

    this.inverse = false;

    this.getSerial(function (error, result) {
        self.requiresSoftwareColorPatch = self.getVersionMajor() == 1 &&
            self.getVersionMinor() >= 1 && self.getVersionMinor() <= 3;
    });
}




/**
* Returns the serial number of device.
*
* BSnnnnnn-1.0
* ||  |    | |- Software minor version
* ||  |    |--- Software major version
* ||  |-------- Denotes sequential number
* ||----------- Denotes BlinkStick device
*
* Software version defines the capabilities of the device
*
* @returns {String} The device's serial number.
*/
BlinkStick.prototype.getSerial = function (callback) {
    if (isWin) {
        if (callback) callback(null, this.serial);
    } else {
        var self = this;
        this.device.getStringDescriptor(3, function(error, result) {
            self.serial = result;
            if (callback) callback(error, result);
        });
    }
};


BlinkStick.prototype.getVersionMajor = function () {
    return parseInt(this.serial.substring(this.serial.length - 3, this.serial.length - 2));
};


BlinkStick.prototype.getVersionMinor = function () {
    return parseInt(this.serial.substring(this.serial.length - 1, this.serial.length));
};




/**
* Returns the manufacturer of the device.
* @returns {String} The device's manufacturer.
*/
BlinkStick.prototype.getManufacturer = function (callback) {
    if (isWin) {
        if (callback) callback(null, this.manufacturer);
    } else {
        this.device.getStringDescriptor(1, function(error, result) {
            if (callback) callback(error, result);
        });
    }
};




/**
* Returns the description of the device.
* @returns {String} The device's description.
*/
BlinkStick.prototype.getDescription = function (callback) {
    if (isWin) {
        if (callback) callback(null, this.product);
    } else {
        this.device.getStringDescriptor(2, function(error, result) {
            if (callback) callback(error, result);
        });
    }
};


function _determineReportId(ledCount)
{
    var reportId = 9;
    var maxLeds = 64;

    if (ledCount <= 8 * 3) {
        reportId = 6;
        maxLeds = 8;
    } else if (ledCount <= 16 * 3) {
        reportId = 7;
        maxLeds = 16;
    } else if (ledCount <= 32 * 3) {
        reportId = 8;
        maxLeds = 32;
    }

    return { 'reportId': reportId, 'maxLeds': maxLeds };
}

/**
* Set the color to the device as RGB.
* @param {Number|String} red Red color intensity 0 is off, 255 is full red intensity OR string CSS color keyword OR hex color, eg "#BADA55".
* @param {Number} [green] Green color intensity 0 is off, 255 is full green intensity.
* @param {Number} [blue] Blue color intensity 0 is off, 255 is full blue intensity.
* @param {Hash}   [options] additional options {"channel": 0, "index": 0}
* @param {Function} [callback] Callback, called when complete.
*/
BlinkStick.prototype.setColor = function (red, green, blue, options, callback) {
    var params = this.interpretParameters(red, green, blue, options, callback);

    var self = this;

    var sendColorInternal = function (r, g, b, callback) {
        if (params.options.channel == 0 && params.options.index == 0) {
            self.setFeatureReport(1, [1, r, g, b], callback);
        } else {
            self.setFeatureReport(5, [5, params.options.channel, params.options.index, r, g, b], callback);
        }
    };

    if (this.requiresSoftwareColorPatch) {
        this.getColor(function (err, cr, cg, cb) {
            if (params.red == cg && params.green == cr && params.blue == cb)
                {
                    if (cr > 0)
                        {
                            cr = cr - 1;
                        }
                        else if (cg > 0)
                            {
                                cg = cg - 1;
                            }

                            sendColorInternal(cr, cg, cb, function () {
                                sendColorInternal(params.red, params.green, params.blue, params.callback);
                            });
                }
                else
                    {
                        sendColorInternal(params.red, params.green, params.blue, params.callback);
                    }
        });
    } else {
        sendColorInternal(params.red, params.green, params.blue, params.callback);
    }
};


BlinkStick.prototype.setInverse = function (inverse) {
    this.inverse = inverse;
};

BlinkStick.prototype.getInverse = function (inverse) {
    return this.inverse;
};

BlinkStick.prototype.setMode = function (mode, callback) {
    this.setFeatureReport(0x0004, [4, mode], callback);
};

BlinkStick.prototype.getMode = function (callback) {
    try
    {
        this.getFeatureReport(4, 33, function (err, buffer) {
            if (callback) callback(err, buffer[1]);
        });
    }
    catch (err)
    {
        if (callback) callback(err, 0);
    }
};


/**
* Get the current color settings as RGB.
* @param {Function} callback Callback to which to pass the color values.
* @returns {Array} Array of three numbers: R, G and B (0-255).
*/
BlinkStick.prototype.getColor = function (index, callback) {
    if (typeof(index) == 'function') {
        callback = index;
        index = 0
    }

    if (index == 0) {
        this.getFeatureReport(0x0001, 33, function (err, buffer) {
            if (callback) callback(err, buffer[1], buffer[2], buffer[3]);
        });
    } else {
        this.getColors(index, function(err, buffer) {
            if (callback) callback(err, buffer[index * 3 + 1], buffer[index * 3], buffer[index * 3 + 2]);
        });
    }
};


BlinkStick.prototype.getColors = function (count, callback) {
    if (typeof(index) == 'function') {
        callback = index;
        index = 0
    }

    params = _determineReportId(count);

    this.getFeatureReport(params.reportId, params.maxLeds * 3 + 2, function (err, buffer) {
        if (callback) callback(err, buffer.slice(2, buffer.length -1));
    });
};


BlinkStick.prototype.setColors = function (channel, data, callback) {
    params = _determineReportId(data.length);

    var i = 0;

    report = [params.reportId, channel];

    data.forEach(function(item) {
        if (i < params.maxLeds * 3) {
            report.push(item);
            i += 1;
        }
    });

    for (var j = i; j < params.maxLeds * 3; j++) {
        report.push(0);
    }

    this.setFeatureReport(params.reportId, report, callback);
};

function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

/**
* Get the current color settings as hex string.
* @param {Function} callback Callback to which to pass the color string.
* @returns {String} Hex string, eg "#BADA55".
*/
BlinkStick.prototype.getColorString = function (index, callback) {
    if (typeof(index) == 'function') {
        callback = index;
        index = 0
    }

    this.getColor(index, function (err, r, g, b) {
        callback(err, '#' + decimalToHex(r, 2) + decimalToHex(g, 2) + decimalToHex(b, 2) );
    });
};




/**
* Get an infoblock from a device.
* @private
* @static
* @param {BlinkStick} device Device from which to get the value.
* @param {Number} location Address to seek the data.
* @param {Function} callback Callback to which to pass the value.
*/
function getInfoBlock (device, location, callback) {
    getFeatureReport(location, 33, function (err, buffer) {
        if (err) return callback(err);

        var result = '',
        i, l;

        for (i = 1, l = buffer.length; i < l; i++) {
            if (i == 0) break;
            result += String.fromCharCode(buffer[i]);
        }

        callback(null, result);
    });
};


function opt(options, name, defaultValue){
    return options && options[name]!==undefined ? options[name] : defaultValue;
}

/**
* Sets an infoblock on a device.
* @private
* @static
* @param {BlinkStick} device Device on which to set the value.
* @param {Number} location Address to seek the data.
* @param {String} data The value to push to the device. Should be <= 32 chars.
* @param {Function} callback Callback to which to pass the value.
*/
function setInfoBlock (device, location, data, callback) {
    var i,
    l = Math.min(data.length, 33),
    buffer = new Buffer(33);

    buffer[0] = 0;
    for (i = 0; i < l; i++) buffer[i + 1] = data.charCodeAt(i);
    for (i = l; i < 33; i++) buffer[i + 1] = 0;

    setFeatureReport(location, buffer, callback);
}




/**
* Get the infoblock1 of the device.
* This is a 32 byte array that can contain any data. It's supposed to
* hold the "Name" of the device making it easier to identify rather than
* a serial number.
*
* @param {Function} callback Callback to which to pass the value.
*/
BlinkStick.prototype.getInfoBlock1 = function (callback) {
    getInfoBlock(this.device, 0x0002, callback);
};




/**
* Get the infoblock2 of the device.
* This is a 32 byte array that can contain any data.
*
* @param {Function} callback Callback to which to pass the value.
*/
BlinkStick.prototype.getInfoBlock2 = function (callback) {
    getInfoBlock(this.device, 0x0003, callback);
};




/**
* Sets the infoblock1 with specified string.
* It fills the rest of bytes with zeros.
*
* @param {Function} callback Callback to which to pass the value.
*/
BlinkStick.prototype.setInfoBlock1 = function (data, callback) {
    setInfoBlock(this.device, 0x0002, data, callback);
};




/**
* Sets the infoblock2 with specified string.
* It fills the rest of bytes with zeros.
*
* @param {Function} callback Callback to which to pass the value.
*/
BlinkStick.prototype.setInfoBlock2 = function (data, callback) {
    setInfoBlock(this.device, 0x0003, data, callback);
};




/**
* Sets the LED to a random color.
*/
BlinkStick.prototype.setRandomColor = function () {
    var args = [],
    i;

    for (i = 0; i < 3; i++) args.push(Math.floor(Math.random() * 256));
    this.setColor.apply(this, args);
};




/**
* Turns the LED off.
*/
BlinkStick.prototype.turnOff = function () {
    this.setColor();
};

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

BlinkStick.prototype.interpretParameters = function (red, green, blue, options, callback)
{
    var hex;

    if (typeof red == 'string') {
        if (typeof green == 'object') {
            options = green;
            callback = blue;
        } else {
            callback = green;
        }

        if (red == 'random') {
            red = randomIntInc(0, 255);
            green = randomIntInc(0, 255);
            blue = randomIntInc(0, 255);
        } else if  (hex = red.match(/^\#[A-Za-z0-9]{6}$/)) {
            hex = hex[0];
        } else if (!(hex = COLOR_KEYWORDS[red])) {
            if (callback)
                callback(new ReferenceError('Invalid CSS color keyword'));
            return;
        }
    } else if (typeof(options) == 'function') {
        callback = options;
    }


    if (hex) {
        red = parseInt(hex.substr(1, 2), 16);
        green = parseInt(hex.substr(3, 2), 16);
        blue = parseInt(hex.substr(5, 2), 16);

    } else {
        red = red || 0;
        green = green || 0;
        blue = blue || 0;
    }

    if (options === undefined) {
        options = {}
    }
    options.channel = opt(options, 'channel', 0)
    options.index = opt(options, 'index', 0)

    red = Math.max(Math.min(red, 255), 0);
    green = Math.max(Math.min(green, 255), 0);
    blue = Math.max(Math.min(blue, 255), 0);

    if (this.inverse)
        {
            red = 255 - red;
            green = 255 - green;
            blue = 255 - blue;
        }

        return {'red': red, 'green': green, 'blue': blue, 'options': options, 'callback': callback};
}

/**
* Blinks specified RGB color.
* @param {Number|String} red Red color intensity 0 is off, 255 is full red intensity OR string CSS color keyword OR hex color, eg "#BADA55".
* @param {Number} green Green color intensity 0 is off, 255 is full green intensity.
* @param {Number} blue Blue color intensity 0 is off, 255 is full blue intensity.
* @param {Hash}   options additional options {"repeats": 1, "delay": 500}
* @param {Function} callback Callback to which to pass the value.
*/
BlinkStick.prototype.blink = function (red, green, blue, options, callback) {
    var params = this.interpretParameters(red, green, blue, options, callback);

    var repeats = opt(params.options, 'repeats', 1)
    var delay = opt(params.options, 'delay', 500)

    var self = this;

    var blinker = function (count) {
        self.setColor(params.red, params.green, params.blue, params.options);

        setTimeout(function() {
            self.setColor(0, 0, 0, params.options);

            setTimeout(function() {
                if (count == repeats - 1) {
                    if (params.callback) params.callback();
                } else {
                    blinker(count + 1);
                }
            }, delay);
        }, delay);
    }

    blinker(0);
};

/**
* Morphs to specified RGB color from current color.
* @param {Number} red Red color intensity 0 is off, 255 is full red intensity.
* @param {Number} green Green color intensity 0 is off, 255 is full green intensity.
* @param {Number} blue Blue color intensity 0 is off, 255 is full blue intensity.
* @param {Hash}   options additional options {"repeats": 1, "delay": 500}
* @param {Function} callback Callback to which to pass the value.
*/
BlinkStick.prototype.morph = function (red, green, blue, options, callback) {
    var params = this.interpretParameters(red, green, blue, options, callback);

    var duration = opt(params.options, 'duration', 1000)
    var steps = opt(params.options, 'steps', 50)

    var self = this;

    this.getColor(params.options.index, function(err, cr, cg, cb) {

        var morpher = function (count) {

            self.setColor(
                parseInt(cr + (params.red - cr) / steps * count),
                parseInt(cg + (params.green - cg) / steps * count),
                parseInt(cb + (params.blue - cb) / steps * count),
                params.options);

                setTimeout(function() {
                    if (count == steps) {
                        if (params.callback) params.callback();
                    } else {
                        morpher(count + 1);
                    }
                }, parseInt(duration/steps));
        }

        morpher(1);
    });
};


/**
* Pulses specified RGB color.
* @param {Number} red Red color intensity 0 is off, 255 is full red intensity.
* @param {Number} green Green color intensity 0 is off, 255 is full green intensity.
* @param {Number} blue Blue color intensity 0 is off, 255 is full blue intensity.
* @param {Hash}   options additional options {"repeats": 1, "delay": 500}
* @param {Function} callback Callback to which to pass the value.
*/
BlinkStick.prototype.pulse = function (red, green, blue, options, callback) {
    var params = this.interpretParameters(red, green, blue, options, callback);

    var self = this;

    self.morph(params.red, params.green, params.blue, params.options, function() {
        self.morph(0, 0, 0, params.options, params.callback);
    });
};


/**
* Pulses specified RGB color.
* @param {Number} red Red color intensity 0 is off, 255 is full red intensity.
* @param {Number} green Green color intensity 0 is off, 255 is full green intensity.
* @param {Number} blue Blue color intensity 0 is off, 255 is full blue intensity.
*/
BlinkStick.prototype.pulseColor = function (red, green, blue) {

    red = Math.min(red, 255);
    green = Math.min(green, 255);
    blue = Math.min(blue, 255);

    var cr = 0,
    cg = 0,
    cb = 0,
    i, l;

    for (i = 0, l = Math.max(red, green, blue); i < l; i++) {
        if (cr < red) cr++;
        if (cg < green) cg++;
        if (cb < blue) cb++;

        this.setColor(cr, cg, cb);
    }

    while (cr > 0 || cg > 0 || cb > 0) {
        if (cr > 0) cr--;
        if (cb > 0) cb--;
        if (cg > 0) cg--;

        this.setColor(cr, cg, cb);
    }
};




/**
* Find BlinkSticks using a filter.
* @param {Function} [filter] Filter function.
* @returns {Array} BlickStick objects.
*/
function findBlinkSticks (filter) {
    if (filter === undefined) filter = function () { return true; };

    var result = [], device, i;

    if (isWin) {
        var devices = usb.devices();

        for (i in devices) {
            device = devices[i];

            if (device.vendorId === VENDOR_ID &&
                device.productId === PRODUCT_ID &&
                    filter(device))
                {
                    result.push(new BlinkStick(device.path, device.serialNumber, device.manufacturer, device.product));
                }
        }

    } else {
        var devices = usb.getDeviceList();

        for (i in devices) {
            device = devices[i];
            if (device.deviceDescriptor.idVendor === VENDOR_ID &&
                device.deviceDescriptor.idProduct === PRODUCT_ID &&
                    filter(device))
                result.push(new BlinkStick(device));
        }
    }

    return result;
}


BlinkStick.prototype.setFeatureReport = function (reportId, data, callback) {
    if (isWin) {
        this.device.sendFeatureReport(data);
        if (callback) { callback(); };
    } else {
        this.device.controlTransfer(0x20, 0x9, reportId, 0, new Buffer(data), callback);
    }
}

BlinkStick.prototype.getFeatureReport = function (reportId, length, callback) {
    if (isWin) {
        var buffer = this.device.getFeatureReport(reportId, length);
        if (callback) callback(null, buffer);
    } else {
        this.device.controlTransfer(0x80 | 0x20, 0x1, reportId, 0, length, callback);
    }
}


module.exports = {

    /**
     * Find first attached BlinkStick.
     * @returns {BlinkStick|undefined} The first BlinkStick, if found.
     */
    findFirst: function () {
        if (isWin) {
            var devices = findBlinkSticks();

            return devices.length > 0 ? devices[0] : null;
        } else {
            var device = usb.findByIds(VENDOR_ID, PRODUCT_ID);
            if (device) return new BlinkStick(device);
        }
    },




    /**
     * Find all attached BlinkStick devices.
     * @returns {Array} BlinkSticks.
     */
    findAll: function () {
        return findBlinkSticks();
    },




    /**
     * Returns the serial numbers of all attached BlinkStick devices.
     * @returns {Array} Serial numbers.
     */
    findAllSerials: function () {
        var result = [];

        findBlinkSticks(function (device) {
            result.push(device.deviceDescriptor.iSerialNumber);
        });

        return result;
    },




    /**
     * Find BlinkStick device based on serial number.
     * @param {Number} serial Serial number.
     * @returns {BlinkStick|undefined}
     */
    findBySerial: function (serial) {
        var result = findBlinkSticks(function (device) {
            return device.deviceDescriptor.iSerialNumber === serial;
        });

        return result[0];
    }


};

