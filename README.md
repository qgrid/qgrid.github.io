# documentation
[Documentation for qgrid](https://qgrid.github.io/)


## Developing

``` bash
$ npm install
$ npm install hexo-cli -g
```

Start server dev server at http://localhost:4000

``` bash
$ hexo server
```

Generate public folder and watch for changes in sources

``` bash
$ hexo generate --watch
```

Delete public folder

``` bash
$ hexo clean
```

## Deploying

The site is deployed using GitHub pages:

``` bash
$ hexo clean && hexo deploy -g
```
