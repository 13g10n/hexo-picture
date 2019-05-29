const TAG_NAME = 'picture';

hexo.extend.tag.register(TAG_NAME, function(args){
    var imgPath = args[0];

    return ('<picture>' + 
    '<source srcset="' + imgPath + '">' +
    '<img src="' + imgPath + '">' +
    '</picture>')
});
