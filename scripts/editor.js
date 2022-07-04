const DEFAULT_FILE = 'app/app.component.ts';

const helper = args => {
  const name = args[0];
  const sbPath = name.indexOf('github') >= 0 ? name : `edit/${name}`
  const ghPath = name.replace('github/', '')

  const options = {
    embed: 1,
    file: args[1] || DEFAULT_FILE,
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
    <div class="editor">
      <span class="editor-frame">
        <iframe data-src="//stackblitz.com/${sbPath}?${query}">
        </iframe>
      </span>
      <div class="source-links">
      </div>
    </div>
`;
};

hexo.extend.tag.register('docEditor', helper);
hexo.extend.helper.register('docEditor', helper);
