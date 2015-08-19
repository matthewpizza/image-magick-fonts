var fs       = require('fs')
var path     = require('path')
var _        = require('underscore')
var builder  = require('xmlbuilder')
var util     = require('./util')
var home     = util.getHome()
var magick   = home + '/.magick'
var fontList = magick + '/type.xml'

function createMagickDir() {
  if (fs.existsSync(magick)) {
    return;
  }

  fs.mkdir(magick, function (err) {
    console.log(err);
  });
}

function buildFontList(fontFiles) {
  var typemap = builder.create('typemap');

  _.each(fontFiles, function (font) {
    var format = path.extname(font),
      name = path.basename(font, format);

    typemap.ele('type')
      .att('format', format.toLowerCase().replace('.', ''))
      .att('name', name)
      .att('glyphs', font)
    .up();
  });

  return typemap.end({pretty: true});
}

function writeFontList(fontFiles) {
  fs.writeFile(fontList, buildFontList(fontFiles), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Saved font list: ' + fontList);
  });
}

module.exports = {
  createMagickDir: createMagickDir,
  writeFontList  : writeFontList
}
