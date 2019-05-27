const helper = args => {
  const options = {
    embed: 1,
    file: 'app/app.component.ts',
    hideExplorer: 1,
    hideNavigation: 1,
    hidedevtools: 1,
    view: 'preview'
  };

  const query = Object
    .keys(options)
    .map(key => `${key}=${options[key]}`)
    .join('&');

  return `<span class="preview">
            <iframe src="//stackblitz.com/github/qgrid/ng2-example/tree/details-row-start/latest?${query}"></iframe>
          </span>
        `;
};

hexo.extend.tag.register("docPreview", helper);
hexo.extend.helper.register("docPreview", helper);