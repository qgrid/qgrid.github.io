const helper = args => {
  return `<script async src="//jsfiddle.net/qgrid/cv4ohzpw/embed/result,html,js/"></script>`;
};

hexo.extend.tag.register("docEditor", helper);
hexo.extend.helper.register("docEditor", helper);
