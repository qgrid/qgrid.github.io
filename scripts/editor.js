const helper = args => {
	const name = args[ 0 ];
	const file = "app/app.component.html";
	const path = name.indexOf('github') >= 0 ? name : `edit/${name}`;
	return `
    <span class="editor">
      <iframe data-src="//stackblitz.com/${path}?embed=1&file=${file}&hideNavigation=1&view=preview"></iframe>
    </span>
`;
};

hexo.extend.tag.register('docEditor', helper);
hexo.extend.helper.register('docEditor', helper);
