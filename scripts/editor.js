const helper = args => {
  const name = args[0];
  const file = "app/app.component.html";
  console.log(name);
  return `
  <div class="editor">
    <ul class="show">
      <li class="active">Preview</li>
      <li>HTML</li>
      <li>TypeScript</li>
    </ul>
    <span class="preview">
      <iframe src="//stackblitz.com/edit/${name}?embed=1&file=${file}&hideExplorer=1&hideNavigation=1&view=preview"></iframe>
    </span>
    <span class="html">
    </span>
    <span class="ts">
`;
};

hexo.extend.tag.register('docEditor', helper);
hexo.extend.helper.register('docEditor', helper);
