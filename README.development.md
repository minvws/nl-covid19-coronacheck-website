Development
---------------------

## Branching strategy

We use the git flow way of working with one addition:

- `production` branch has been added. Once the version on the master has been previewed and OK'ed, it can be merged to the production branch which is used for internal acceptance testing. This way content editors can easily preview their changes on master (as set by GitHub pages) without (unintentionally) affecting an acceptance test.

## Jekyll

GitHub Pages support the static site generator [Jekyll](https://jekyllrb.com/).
Jekyll supports [Markdown](https://daringfireball.net/projects/markdown/), [Liquid](https://github.com/Shopify/liquid/wiki), HTML and CSS to create a complete static website.
By using the Liquid templating language, content can be stored in Markdown.

### How to test Jekyll locally

To build Jekyll, you could [follow the Jekyll quickstart until step 4](https://jekyllrb.com/docs/).
When you're at step 5, you can choose to either run Jekyll with the default config, or load with a custom config.
Because of the nature of this project we've made three config files which each represent a version of the website for the current usage of CoronaCheck (0g: CoronaCheck is not used in the Netherlands; 1g: A negative covid test is required under certain conditions; or 3g, users need to have a negative covid test, proof of recovery or proof of vaccination). This, so we can switch and adapt quickly.

```bash
# choose one:
bundle exec jekyll serve --config ._config-0g.yml
bundle exec jekyll serve --config ._config-1g.yml
bundle exec jekyll serve --config ._config-3g.yml
```

If you don't want to install Jekyll locally, you can use Docker.
You will need to copy the contents of the configuration you want to use to `_config.yml` in the root of the project, or go with the default.
To use this Docker option you should have Docker engine installed, see [how to install Docker engine](https://docs.docker.com/engine/install/). You can then run [`starefossen/github-pages`](https://hub.docker.com/r/starefossen/github-pages), a small Alpine Docker image for running GitHub Pages / Jekyll projects locally.
You only need to mount the pages in a volume under `/usr/src/app` like this:
```bash
docker run -it --rm -v "$PWD":/usr/src/app -p "4000:4000" starefossen/github-pages
```
*Note: for Windows users we advise Powershell or another shell that supports `$PWD`, for `cmd` you can replace `$PWD` with `%cd%`.*

The Jekyll page will be available on [`http://localhost:4000`](http://localhost:4000/).

To test locally with htmlproofer (to test validity of html-code):
```bash
bundle exec htmlproofer ./_site --checks-to-ignore=LinkCheck
```

## Vendors

Note: rather than rely on a third party CDN or dependencies that are not part of this repository we choose to include all assets and dependencies. Please go to [the vendor licenses directory](./vendor-licenses) for the vendor licenses.
