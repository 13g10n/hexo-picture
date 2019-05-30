const path = require("path");
const sharp = require('sharp');

const TAG_NAME = 'picture';

const SIZES = {
    'Huge': 1281,
    'Large': 1025, 
    'Medium': 768,
    'Small': 481,
    'Thumbnail': 320
}

function makeFullPath(imagePath) {
    return path.join(hexo.source_dir, imagePath);
}

function makeSizedImage(image, size) {
    var imageExtention = image.substr(image.lastIndexOf('.') + 1);
    var imageBase = image.substr(0, image.length - imageExtention.length - 1);

    var resultImagePath = `${imageBase}_${size}.${imageExtention}`;

    sharp(makeFullPath(image))
        .resize(SIZES[size])
        .toFile(makeFullPath(resultImagePath));

    return resultImagePath;
}

hexo.extend.tag.register(TAG_NAME, function(args){
    var imgPath = args[0];
    var altText = args[1];

    var resultHTML = '<picture>';

    for (var size in SIZES) {
        var sizedImagePath = makeSizedImage(imgPath, size);
        resultHTML += `<source media="(min-width: ${SIZES[size]}px)" srcset="${sizedImagePath}">`;
    }

    resultHTML += `<img src="${imgPath}" ${altText ? `alt="${altText}"` : ''}>`;
    resultHTML += '</picture>';

    return resultHTML;
});
