const helper = args => {
  return `<span class="preview">
            <iframe src="//stackblitz.com/github/qgrid/ng2-example/tree/details-row-start/latest?embed=1&file=app/app.component.ts&hideExplorer=1&hideNavigation=1&view=preview"></iframe>
          </span>
        `;
};

hexo.extend.tag.register("docPreview", helper);
hexo.extend.helper.register("docPreview", helper);