const os = require('os');
const semver = require('semver');

module.exports = function usb() {
  if (os.platform() === 'win32') {
    //v0.11.13 of Node.js introduced changes to the API which require
    //a new version of precompiled HID.node for Windows platforms
    if (semver.eq(process.version, '0.11.13')) {
      return require('./platform/windows/HID_0.3.2-patched.node');
    }

    return require('./platform/windows/HID.node');
  }

  return require('usb');
};
