const helper = args => {
  const name = args[0];
  const path = name.indexOf('github') >= 0 ? name : `edit/${name}`
  const gitpath = name.replace('github/', '')

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
      <div class="source-links">
        <a class="source-github" target="_blank" title="GitHub" href="https://github.com/${gitpath}/src/app">
          <span>GitHub</span>
        </a>
        <a class="source-stackblitz" target="_blank" title="StackBlitz" href="https://stackblitz.com/${path}">
          <span>StackBlitz</span>
        </a>
      </div>
    </span>
`;
};

hexo.extend.tag.register('docEditor', helper);
hexo.extend.helper.register('docEditor', helper);
