const helper = args => {
  return `<span class="sb-embed">
            <iframe src="//stackblitz.com/edit/angular-qgrid-example?embed=1&file=app/app.component.html&hideExplorer=1&hideNavigation=1&view=preview"></iframe>
          </span>
        `;
};

hexo.extend.tag.register("docEditor", helper);
hexo.extend.helper.register("docEditor", helper);
