# My blog

I established a blog based on [Texture](https://thelehhman.com/texture)
and I added some new factors in my blog.

## Features
- Less is More
- Use tags to classify posts

## Usage
- You can download jekyll themes on [website](http://jekyllthemes.org/) and custom it.
- If you are interested in my blog, you can fork this repo directly. 

**Color Picker**

showPicker: [false|true] # show the texture selector(development purposes)

**Comments (Disqus)**

Comments on posts can be enabled by specifying your disqus_shortname under texture in `_config.yml`. For example,
```yaml
texture:
  disqus_shortname: games
```

**Google Analytics**

It can be enabled by specifying your analytics id under texture in `_config.yml`
```yaml
texture:
  analytics_id: '< YOUR ID >'
```

**Excerpts**

Excerpts can be enabled by adding the following line to your `_config.yml`
```yaml
show_excerpts: true
```

**Toggle Navbar**

```yaml
texture:
  showNav: true
```

## Layouts

- Home
- Page
- Post

## Future works

- Custom the footer
- Make a more functional Navbar
- Add functions to search post in terms of tags