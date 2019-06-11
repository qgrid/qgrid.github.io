const helper = args => {
  const name = args[0];
  const path = name.indexOf('github') >= 0 ? name : `edit/${name}`

  const options = {
    embed: 1,
    file: args[1] || 'app/app.component.ts',
    hideExplorer: 1,
    hideNavigation: 1,
    hidedevtools: 1,
    view: 'preview'
  };

  const query = Object
    .keys(options)
    .map(key => `${key}=${options[key]}`)
    .join('&');

  return `
    <span class="editor">
      <iframe data-src="//stackblitz.com/${path}?${query}"></iframe>
    </span>
`;
};

hexo.extend.tag.register('docEditor', helper);
hexo.extend.helper.register('docEditor', helper);
