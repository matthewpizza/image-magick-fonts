var find      = require('./lib/find')
var generate  = require('./lib/generate')
var fontFiles = find.getFileList()

generate.createMagickDir();
generate.writeFontList(fontFiles);
