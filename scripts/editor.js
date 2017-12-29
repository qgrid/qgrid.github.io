const helper = args => {
  return `<div class="jsfiddle-embed">
            <script async src="//jsfiddle.net/qgrid/cv4ohzpw/embed/result,html,js/"></script>
          <div>`;
};

hexo.extend.tag.register("docEditor", helper);
hexo.extend.helper.register("docEditor", helper);
