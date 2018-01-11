const helper = args => {
  const name = args[0];
  const file = "app/app.component.html";
  return `
    <span class="active tab-panel tab-preview">
      <iframe src="//stackblitz.com/edit/${name}?embed=1&file=${file}&hideExplorer=1&hideNavigation=1&view=preview"></iframe>
    </span>
`;
};

hexo.extend.tag.register('docEditor', helper);
hexo.extend.helper.register('docEditor', helper);
