/*
Copyright (C) 2012 by Matt Kotsenas -- MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var swatch = (function (document, window) {
    var swatch = window.swatch || {};

    // Lookup of the named colors specified in CSS3 (http://www.w3.org/TR/css3-color/#svg-color)
    var NAMED_COLORS = {
        "aliceblue": { "r": 240, "g": 248, "b": 255, "a": 1 },
        "antiquewhite": { "r": 250, "g": 235, "b": 215, "a": 1 },
        "aqua": { "r": 0, "g": 255, "b": 255, "a": 1 },
        "aquamarine": { "r": 127, "g": 255, "b": 212, "a": 1 },
        "azure": { "r": 240, "g": 255, "b": 255, "a": 1 },
        "beige": { "r": 245, "g": 245, "b": 220, "a": 1 },
        "bisque": { "r": 255, "g": 228, "b": 196, "a": 1 },
        "black": { "r": 0, "g": 0, "b": 0, "a": 1 },
        "blanchedalmond": { "r": 255, "g": 235, "b": 205, "a": 1 },
        "blue": { "r": 0, "g": 0, "b": 255, "a": 1 },
        "blueviolet": { "r": 138, "g": 43, "b": 226, "a": 1 },
        "brown": { "r": 165, "g": 42, "b": 42, "a": 1 },
        "burlywood": { "r": 222, "g": 184, "b": 135, "a": 1 },
        "cadetblue": { "r": 95, "g": 158, "b": 160, "a": 1 },
        "chartreuse": { "r": 127, "g": 255, "b": 0, "a": 1 },
        "chocolate": { "r": 210, "g": 105, "b": 30, "a": 1 },
        "coral": { "r": 255, "g": 127, "b": 80, "a": 1 },
        "cornflowerblue": { "r": 100, "g": 149, "b": 237, "a": 1 },
        "cornsilk": { "r": 255, "g": 248, "b": 220, "a": 1 },
        "crimson": { "r": 220, "g": 20, "b": 60, "a": 1 },
        "cyan": { "r": 0, "g": 255, "b": 255, "a": 1 },
        "darkblue": { "r": 0, "g": 0, "b": 139, "a": 1 },
        "darkcyan": { "r": 0, "g": 139, "b": 139, "a": 1 },
        "darkgoldenrod": { "r": 184, "g": 134, "b": 11, "a": 1 },
        "darkgray": { "r": 169, "g": 169, "b": 169, "a": 1 },
        "darkgreen": { "r": 0, "g": 100, "b": 0, "a": 1 },
        "darkgrey": { "r": 169, "g": 169, "b": 169, "a": 1 },
        "darkkhaki": { "r": 189, "g": 183, "b": 107, "a": 1 },
        "darkmagenta": { "r": 139, "g": 0, "b": 139, "a": 1 },
        "darkolivegreen": { "r": 85, "g": 107, "b": 47, "a": 1 },
        "darkorange": { "r": 255, "g": 140, "b": 0, "a": 1 },
        "darkorchid": { "r": 153, "g": 50, "b": 204, "a": 1 },
        "darkred": { "r": 139, "g": 0, "b": 0, "a": 1 },
        "darksalmon": { "r": 233, "g": 150, "b": 122, "a": 1 },
        "darkseagreen": { "r": 143, "g": 188, "b": 143, "a": 1 },
        "darkslateblue": { "r": 72, "g": 61, "b": 139, "a": 1 },
        "darkslategray": { "r": 47, "g": 79, "b": 79, "a": 1 },
        "darkslategrey": { "r": 47, "g": 79, "b": 79, "a": 1 },
        "darkturquoise": { "r": 0, "g": 206, "b": 209, "a": 1 },
        "darkviolet": { "r": 148, "g": 0, "b": 211, "a": 1 },
        "deeppink": { "r": 255, "g": 20, "b": 147, "a": 1 },
        "deepskyblue": { "r": 0, "g": 191, "b": 255, "a": 1 },
        "dimgray": { "r": 105, "g": 105, "b": 105, "a": 1 },
        "dimgrey": { "r": 105, "g": 105, "b": 105, "a": 1 },
        "dodgerblue": { "r": 30, "g": 144, "b": 255, "a": 1 },
        "firebrick": { "r": 178, "g": 34, "b": 34, "a": 1 },
        "floralwhite": { "r": 255, "g": 250, "b": 240, "a": 1 },
        "forestgreen": { "r": 34, "g": 139, "b": 34, "a": 1 },
        "fuchsia": { "r": 255, "g": 0, "b": 255, "a": 1 },
        "gainsboro": { "r": 220, "g": 220, "b": 220, "a": 1 },
        "ghostwhite": { "r": 248, "g": 248, "b": 255, "a": 1 },
        "gold": { "r": 255, "g": 215, "b": 0, "a": 1 },
        "goldenrod": { "r": 218, "g": 165, "b": 32, "a": 1 },
        "gray": { "r": 128, "g": 128, "b": 128, "a": 1 },
        "green": { "r": 0, "g": 128, "b": 0, "a": 1 },
        "greenyellow": { "r": 173, "g": 255, "b": 47, "a": 1 },
        "grey": { "r": 128, "g": 128, "b": 128, "a": 1 },
        "honeydew": { "r": 240, "g": 255, "b": 240, "a": 1 },
        "hotpink": { "r": 255, "g": 105, "b": 180, "a": 1 },
        "indianred": { "r": 205, "g": 92, "b": 92, "a": 1 },
        "indigo": { "r": 75, "g": 0, "b": 130, "a": 1 },
        "ivory": { "r": 255, "g": 255, "b": 240, "a": 1 },
        "khaki": { "r": 240, "g": 230, "b": 140, "a": 1 },
        "lavender": { "r": 230, "g": 230, "b": 250, "a": 1 },
        "lavenderblush": { "r": 255, "g": 240, "b": 245, "a": 1 },
        "lawngreen": { "r": 124, "g": 252, "b": 0, "a": 1 },
        "lemonchiffon": { "r": 255, "g": 250, "b": 205, "a": 1 },
        "lightblue": { "r": 173, "g": 216, "b": 230, "a": 1 },
        "lightcoral": { "r": 240, "g": 128, "b": 128, "a": 1 },
        "lightcyan": { "r": 224, "g": 255, "b": 255, "a": 1 },
        "lightgoldenrodyellow": { "r": 250, "g": 250, "b": 210, "a": 1 },
        "lightgray": { "r": 211, "g": 211, "b": 211, "a": 1 },
        "lightgreen": { "r": 144, "g": 238, "b": 144, "a": 1 },
        "lightgrey": { "r": 211, "g": 211, "b": 211, "a": 1 },
        "lightpink": { "r": 255, "g": 182, "b": 193, "a": 1 },
        "lightsalmon": { "r": 255, "g": 160, "b": 122, "a": 1 },
        "lightseagreen": { "r": 32, "g": 178, "b": 170, "a": 1 },
        "lightskyblue": { "r": 135, "g": 206, "b": 250, "a": 1 },
        "lightslategray": { "r": 119, "g": 136, "b": 153, "a": 1 },
        "lightslategrey": { "r": 119, "g": 136, "b": 153, "a": 1 },
        "lightsteelblue": { "r": 176, "g": 196, "b": 222, "a": 1 },
        "lightyellow": { "r": 255, "g": 255, "b": 224, "a": 1 },
        "lime": { "r": 0, "g": 255, "b": 0, "a": 1 },
        "limegreen": { "r": 50, "g": 205, "b": 50, "a": 1 },
        "linen": { "r": 250, "g": 240, "b": 230, "a": 1 },
        "magenta": { "r": 255, "g": 0, "b": 255, "a": 1 },
        "maroon": { "r": 128, "g": 0, "b": 0, "a": 1 },
        "mediumaquamarine": { "r": 102, "g": 205, "b": 170, "a": 1 },
        "mediumblue": { "r": 0, "g": 0, "b": 205, "a": 1 },
        "mediumorchid": { "r": 186, "g": 85, "b": 211, "a": 1 },
        "mediumpurple": { "r": 147, "g": 112, "b": 219, "a": 1 },
        "mediumseagreen": { "r": 60, "g": 179, "b": 113, "a": 1 },
        "mediumslateblue": { "r": 123, "g": 104, "b": 238, "a": 1 },
        "mediumspringgreen": { "r": 0, "g": 250, "b": 154, "a": 1 },
        "mediumturquoise": { "r": 72, "g": 209, "b": 204, "a": 1 },
        "mediumvioletred": { "r": 199, "g": 21, "b": 133, "a": 1 },
        "midnightblue": { "r": 25, "g": 25, "b": 112, "a": 1 },
        "mintcream": { "r": 245, "g": 255, "b": 250, "a": 1 },
        "mistyrose": { "r": 255, "g": 228, "b": 225, "a": 1 },
        "moccasin": { "r": 255, "g": 228, "b": 181, "a": 1 },
        "navajowhite": { "r": 255, "g": 222, "b": 173, "a": 1 },
        "navy": { "r": 0, "g": 0, "b": 128, "a": 1 },
        "oldlace": { "r": 253, "g": 245, "b": 230, "a": 1 },
        "olive": { "r": 128, "g": 128, "b": 0, "a": 1 },
        "olivedrab": { "r": 107, "g": 142, "b": 35, "a": 1 },
        "orange": { "r": 255, "g": 165, "b": 0, "a": 1 },
        "orangered": { "r": 255, "g": 69, "b": 0, "a": 1 },
        "orchid": { "r": 218, "g": 112, "b": 214, "a": 1 },
        "palegoldenrod": { "r": 238, "g": 232, "b": 170, "a": 1 },
        "palegreen": { "r": 152, "g": 251, "b": 152, "a": 1 },
        "paleturquoise": { "r": 175, "g": 238, "b": 238, "a": 1 },
        "palevioletred": { "r": 219, "g": 112, "b": 147, "a": 1 },
        "papayawhip": { "r": 255, "g": 239, "b": 213, "a": 1 },
        "peachpuff": { "r": 255, "g": 218, "b": 185, "a": 1 },
        "peru": { "r": 205, "g": 133, "b": 63, "a": 1 },
        "pink": { "r": 255, "g": 192, "b": 203, "a": 1 },
        "plum": { "r": 221, "g": 160, "b": 221, "a": 1 },
        "powderblue": { "r": 176, "g": 224, "b": 230, "a": 1 },
        "purple": { "r": 128, "g": 0, "b": 128, "a": 1 },
        "red": { "r": 255, "g": 0, "b": 0, "a": 1 },
        "rosybrown": { "r": 188, "g": 143, "b": 143, "a": 1 },
        "royalblue": { "r": 65, "g": 105, "b": 225, "a": 1 },
        "saddlebrown": { "r": 139, "g": 69, "b": 19, "a": 1 },
        "salmon": { "r": 250, "g": 128, "b": 114, "a": 1 },
        "sandybrown": { "r": 244, "g": 164, "b": 96, "a": 1 },
        "seagreen": { "r": 46, "g": 139, "b": 87, "a": 1 },
        "seashell": { "r": 255, "g": 245, "b": 238, "a": 1 },
        "sienna": { "r": 160, "g": 82, "b": 45, "a": 1 },
        "silver": { "r": 192, "g": 192, "b": 192, "a": 1 },
        "skyblue": { "r": 135, "g": 206, "b": 235, "a": 1 },
        "slateblue": { "r": 106, "g": 90, "b": 205, "a": 1 },
        "slategray": { "r": 112, "g": 128, "b": 144, "a": 1 },
        "slategrey": { "r": 112, "g": 128, "b": 144, "a": 1 },
        "snow": { "r": 255, "g": 250, "b": 250, "a": 1 },
        "springgreen": { "r": 0, "g": 255, "b": 127, "a": 1 },
        "steelblue": { "r": 70, "g": 130, "b": 180, "a": 1 },
        "tan": { "r": 210, "g": 180, "b": 140, "a": 1 },
        "teal": { "r": 0, "g": 128, "b": 128, "a": 1 },
        "thistle": { "r": 216, "g": 191, "b": 216, "a": 1 },
        "tomato": { "r": 255, "g": 99, "b": 71, "a": 1 },
        "turquoise": { "r": 64, "g": 224, "b": 208, "a": 1 },
        "violet": { "r": 238, "g": 130, "b": 238, "a": 1 },
        "wheat": { "r": 245, "g": 222, "b": 179, "a": 1 },
        "white": { "r": 255, "g": 255, "b": 255, "a": 1 },
        "whitesmoke": { "r": 245, "g": 245, "b": 245, "a": 1 },
        "yellow": { "r": 255, "g": 255, "b": 0, "a": 1 },
        "yellowgreen": { "r": 154, "g": 205, "b": 50, "a": 1 }
    };

    /*
    * Clamp a value to the nearest unsigned byte (0 - 255). 
    */
    var clampToUByte = function (val) {
        // ParseInt returns an int even if val was already an int, so there is no harm in re-parsing.
        val = parseInt(val, 10);

        if (isNaN(val)) { val = 0; }
        val = (val > 255) ? 255 : val;
        val = (val < 0) ? 0 : val;

        return val;
    };

    /*
    * Clamp a value to the nearest float between 0 and 1 (inclusive). 
    */
    var clampFloatTo1 = function (val) {
        // parseFloat returns an float even if val was already a flot, so there is no harm in re-parsing.
        val = parseFloat(val);

        if (isNaN(val)) { val = 0; }
        val = (val > 1) ? 1 : val;
        val = (val < 0) ? 0 : val;

        return val;
    };

    /*
    * Takes an int value and converts to a base-16 hex value. Prepends zeros if needed to ensure that all values are two-digits.
    */
    var intToHex = function (int) {
        var retVal = int.toString(16);

        if (retVal.length === 1) { retVal = "0" + retVal; }

        return retVal;
    };

    /*
    * Creates the resulting data-object that the library user will see. This object should hold the raw colors in all easily consumable formats,
    * so redundancy is traded for ease-of-use.
    *
    * If the environment supports ES5 .defineProperty, then we'll use it to prevent the user from overwriting values. Since we want to keep the Swatch objects
    * light, updating one value of the object won't update other representations. Non-ES5 environments will get plain object literals.
    */
    var createSwatch = function (r, g, b, a) {
        var PROPERTIES_LIST = ["r", "g", "b", "a", "rgb", "rgba", "hex"];
        var data = {};

        data.r = r;
        data.g = g;
        data.b = b;
        data.a = a;

        data.rgb = "rgb(" + r + "," + g + "," + b + ")";
        data.rgba = "rgba(" + r + "," + g + "," + b + "," + a + ")";

        data.hex = "#" + intToHex(r) + intToHex(g) + intToHex(b);

        // Check for ES5 .defineProperty: see Section 15.2.3.5 of http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
        // and http://stackoverflow.com/questions/4819693/working-around-ie8s-broken-object-defineproperty-implementation
        var canDefine = (!!Object.defineProperty && Object.defineProperty({}, "x", { get: function () { return true } }).x);
        if (canDefine) {
            for (var i = 0; i < PROPERTIES_LIST.length; i++) {
                Object.defineProperty(data, PROPERTIES_LIST[i], { writable: false, enumerable: true, configurable: false });
            }
        }

        return data;
    };

    var parseRGB = function (arg) {
        var regex = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;

        arg.match(regex);

        var r = clampToUByte(RegExp.$1);
        var g = clampToUByte(RegExp.$2);
        var b = clampToUByte(RegExp.$3);

        return { "r": r, "g": g, "b": b, "a": 1 };
    };

    var parseRGBA = function () {
        var regex = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)S/;

        arg.match(regex);

        var r = clampToUByte(RegExp.$1);
        var g = clampToUByte(RegExp.$2);
        var b = clampToUByte(RegExp.$3);

        var a = clampFloatTo1(RegExp.$4);

        return { "r": r, "g": g, "b": b, "a": a };
    };

    // The format of an RGB value in hexadecimal notation is a '#' immediately followed by either three or six hexadecimal characters. http://www.w3.org/TR/CSS2/syndata.html#color-units
    var parseHex = function (arg) {
        // The three-digit RGB notation (#rgb) is converted into six-digit form (#rrggbb) by replicating digits, not by adding zeros.
        // For example, #fb0 expands to #ffbb00.
        var hex3ToHex6 = function (hex3) {
            var hex6 = "";

            hex6 += hex3[0];
            hex6 += hex3[0];

            hex6 += hex3[1];
            hex6 += hex3[1];

            hex6 += hex3[2];
            hex6 += hex3[2];

            return hex6;
        };

        var hex6ToRgba = function (hex6) {
            var r = hex6.substring(0, 2);
            var g = hex6.substring(2, 4);
            var b = hex6.substring(4);

            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);

            return { "r": r, "g": g, "b": b, "a": 1 };
        };

        var regex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

        if (!regex.test(arg)) { throw "Invalid syntax for hex color: " + arg + "."; }
        arg.match(regex);
        var hex = RegExp.$1;

        if (hex.length === 3) { hex = hex3ToHex6(hex); }

        return hex6ToRgba(hex);
    };

    /*
    * Convert HSLA to RGBA. Algorithm from http://en.wikipedia.org/wiki/HSL_color_space#From_HSL
    */
    var HSLAToRGBA = function (h, s, l, a) {
        // Given an HSL color with hue H ∈ [0°, 360°), saturation SHSL ∈ [0, 1], and lightness L ∈ [0, 1]. First, we find chroma:
        var c = (1 - Math.abs(2 * l - 1)) * s;

        // Then we can, again, find a point (R1, G1, B1) along the bottom three faces of the RGB cube, with the same hue and chroma
        // as our color (using the intermediate value X for the second largest component of this color):
        var hPrime = h / 60;
        var x = c * (1 - Math.abs((hPrime % 2) - 1))

        var rPrime = 0;
        var gPrime = 0;
        var bPrime = 0;

        if ((hPrime >= 0) && (hPrime < 1)) {
            rPrime = c;
            gPrime = x;
            bPrime = 0;
        }
        if ((hPrime >= 1) && (hPrime < 2)) {
            rPrime = x;
            gPrime = c;
            bPrime = 0;
        }
        if ((hPrime >= 2) && (hPrime < 3)) {
            rPrime = 0;
            gPrime = c;
            bPrime = x;
        }
        if ((hPrime >= 3) && (hPrime < 4)) {
            rPrime = 0;
            gPrime = x;
            bPrime = c;
        }
        if ((hPrime >= 4) && (hPrime < 5)) {
            rPrime = x;
            gPrime = 0;
            bPrime = c;
        }
        if ((hPrime >= 5) && (hPrime < 6)) {
            rPrime = c;
            gPrime = 0;
            bPrime = x;
        }

        // Finally, we can find R, G, and B by adding the same amount to each component, to match lightness:
        var m = l - (1 / 2) * c;

        var r = rPrime + m;
        var g = gPrime + m;
        var b = bPrime + m;

        return { "r": r, "g": g, "b": b, "a": a };
    };

    var parseHSL = function () { };
    var parseHSLA = function () { };

    /*
    * Remove leading and trailing whitespace from a string.
    */
    var trim = function (text) {
        return text.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/, "$1")
    };

    // This function takes a color string and applies heuristics to determine what the input format is, then applies one of the other transform functions.
    var parse = function (color) {
        var regexRGB = /rgb\(/;
        var regexRGBA = /rgba\(/;
        var regexHex = /#/;

        var color = trim(color);

        var retVal;

        if (NAMED_COLORS[color] !== undefined) { retVal = NAMED_COLORS[color]; }
        else if (regexRGB.test(color)) { retVal = parseRGB(color); }
        else if (regexRGBA.test(color)) { retVal = parseRGBA(color); }
        else if (regexHex.test(color)) { retVal = parseHex(color); }
        else { throw "Could not parse color: " + color + "."; }

        return createSwatch(retVal.r, retVal.g, retVal.b, retVal.a);
    };


    swatch.parse = parse;

    return swatch;
})(document, window);