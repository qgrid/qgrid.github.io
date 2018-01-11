const helper = args => {
  const name = args[0];
  const file = "app/app.component.html";
  console.log(name);
  return `
  <div class="editor tabs">
    <ul>
      <li class="active tab" data-tab="tab-preview"><button>Preview</button></li>
      <li class="tab" data-tab="tab-html"><button>HTML</button></li>
      <li class="tab" data-tab="tab-script"><button>Script</button></li>
    </ul>
    <span class="active tab-panel tab-preview">
      <iframe src="//stackblitz.com/edit/${name}?embed=1&file=${file}&hideExplorer=1&hideNavigation=1&view=preview"></iframe>
    </span>
    <span class="tab-panel tab-html">
      HTML
    </span>
    <span class="tab-panel tab-script">
      SCRIPT
    </span>
`;
};

hexo.extend.tag.register('docEditor', helper);
hexo.extend.helper.register('docEditor', helper);
