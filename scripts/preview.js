const helper = args => {
  return `<span class="preview">
            <iframe src="//stackblitz.com/edit/qgrid-ng-5-01-02-simple?embed=1&file=app/app.component.ts&hideExplorer=1&hideNavigation=1&view=preview"></iframe>
          </span>
        `;
};

hexo.extend.tag.register("docPreview", helper);
hexo.extend.helper.register("docPreview", helper);