'use strict';

// eslint-disable-next-line node/no-unpublished-require
const HexoUtil = require('hexo-util');
const Sharp = require('sharp');
const Url = require('url');

const Const = require('./const');
const Utils = require('./utils');

// eslint-disable-next-line no-undef
const PostAsset = hexo.model(Const.HexoModels.PostAsset);

/**
 * Build src to asset on published site
 * @param {string} assetPath Asset path
 * @returns {string} Path to asset with base
 */
function buildPublishedAssetPath(assetPath) {
  // eslint-disable-next-line no-undef
  let path = hexo.config.root + Url.resolve('/', assetPath);
  return path.replace(/\/{2,}/g, '/');
}

/**
 * Get configurations for picture tag render
 * @param {Object} post Current processed post
 * @param {Array} args Arguments given to tag
 * @returns {Object} Picture tag config
 */
function getTagConfig(post, args) {
  let config = { post, classes: [], alt: [] };
  args.forEach((arg) => {
    if (!config.asset) {
      const asset = PostAsset.findOne({ post: post._id, slug: arg });
      if (asset) {
        config.asset = asset;
      } else {
        config.classes.push(arg);
      }
    } else {
      config.alt.push(arg);
    }
  });
  return config;
}

/**
 * Render picture tag with sized images
 * @param {string} config Render config
 * @returns {string} HTML
 */
function pictureTag(config) {
  const sourceImageExtention = Utils.getFileExtension(config.asset.slug);
  const sourceImageNameBase = Utils.getFileBase(config.asset.slug, sourceImageExtention);
  const sources = [];

  Object.keys(Const.ImageSizes).forEach((sizeName) => {
    const resizedImageName = `${sourceImageNameBase}_${sizeName}.${sourceImageExtention}`;

    // eslint-disable-next-line new-cap
    Sharp(config.asset.source)
      .resize(Const.ImageSizes[sizeName])
      .toFile(config.post.asset_dir + resizedImageName);

    sources.push(HexoUtil.htmlTag(Const.HtmlTags.source, {
      media: Utils.buildQuery(Const.Queries.minWidth, Const.ImageSizes[sizeName] + Const.Units.px),
      srcset: buildPublishedAssetPath(config.post.path + resizedImageName)
    }));
  });

  sources.push(HexoUtil.htmlTag(Const.HtmlTags.image, {
    class: config.classes.join(' '),
    src: buildPublishedAssetPath(config.asset.path),
    alt: config.alt.join(' ')
  }));

  return HexoUtil.htmlTag(Const.HtmlTags.picture, {}, sources.join(''));
}

// eslint-disable-next-line no-undef
hexo.extend.tag.register(Const.TagName, function(args) {
  const tagConfig = getTagConfig(this, args);
  return pictureTag(tagConfig);
});
