# Hexo Picture

![](https://img.shields.io/npm/v/hexo-picture.svg)
![](https://img.shields.io/npm/dm/hexo-picture)
![](https://img.shields.io/npm/l/hexo-picture.svg)

`hexo-picture` is a plugin for [Hexo](https://hexo.io) static site generator that adds new `picture` tag for responsive images that allows you to save user's traffic and speed up page loading.

## Installation
```bash
$ npm install --save hexo-picture
```

## Usage
```html
{% picture [classes] slug [alt] %}
```

## Examples
```html
{% picture mountains.jpg "Stunning mountains picture" %}
```

```html
{% picture rounded float-left "Stunning mountains.jpg" %}
```

## License
MIT
