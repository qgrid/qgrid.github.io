const helper = args => {
  return `<span class="preview">
            <iframe src="//stackblitz.com/edit/angular-qgrid-example?embed=1&file=app/app.component.html&hideExplorer=1&hideNavigation=1&view=preview"></iframe>
          </span>
        `;
};

hexo.extend.tag.register("docPreview", helper);
hexo.extend.helper.register("docPreview", helper);