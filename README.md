# My blog

I established a blog based on [Texture](https://thelehhman.com/texture) and added some new factors in my blog.
You can download jekyll themes on [website](http://jekyllthemes.org/) and custom it. If you are interested in this theme, you can fork this repo directly.

## Features

- Less is More
- Use tags to classify posts

## Install

- If you want to deploy your blog on Github Pages, you just need to git push your code to your blog repository.

- Well if you want to test the performance before committing, you need to install ruby, gem and bundle etc. And run below commands in your shell:

```shell
bundle exec jekyll serve --livereload
```

## Usage

There are several customed items in file `_config.yml`

<!-- **Comments (Disqus)**

Comments on posts can be enabled by specifying your disqus_shortname under texture in `_config.yml`. For example,
```yaml
texture:
  disqus_shortname: games
``` -->

<!-- **Google Analytics**

It can be enabled by specifying your analytics id under texture in `_config.yml`
```yaml
texture:
  analytics_id: '< YOUR ID >'
``` -->

**Toggle Excerpts**

Excerpts can be enabled by adding the following line

```yaml
show_excerpts: true
```

**Toggle Navbar**

```yaml
texture:
  showNav: true
```

## Future works

| # | TODO list | Status |
|---| ----- | -------- |
| 0 | Design a Logo | [&times;] |
| 1 | Add links for navbar | [&times;] |
| 2 | Add authenritation info in footer | [&times;] |
| 3 | Add functions to conditionally search posts | [&times;] |
| 4 | Add pagination for posts | [&times;] |
| 5 | Add category map in the right of home | [&times;] |
| 6 | Add recently or relative post in the right of post | [&times;] |
| 7 | Redesign the font style of markdown content (font / highlight.css) | [&times;] |
| 8 | Remove the blank line in the top of header and main section | [&times;] |
| 9 | Add return back button in the post layout | [&times;] |
| 10 | Add background and two-line-layout for home and post pages | [&times;] |
| 11 | Redesign and add about page | [&times;] |
| 12 | Redesign and add 404 page | [&times;] |
| 13 | Deal with errors and warnings about jekyll and etc | [&times;] |