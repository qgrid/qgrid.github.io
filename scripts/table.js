const helper = args => {
  console.log(args[0]);
  //const unit = JSON.parse(args[0]);

  console.log("PARSED!!!!");

  const path = '';
  const name = '';
  const template = `
  <table>
    <thead>
      <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description<a class="github-link2" target="_blank" href="${path}"><span>${name}}</span></a></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>columns</td>
        <td><code>ColumnModel[]</code></td>
        <td>Set of columns to display.<br>Usually data columns can be setup from 3 places: - Columns binding property. - Columns component. - Grid model data columns property.  We can have 3 sources of columns because each column has <em>key</em> property, that allows to make a merge. If you have defined columns in javascript and in template with the same key, algorithm will try persist settings from both sources but javascript will have top priority. </td>
      </tr>
    </tbody>
  </table>`;

  return template
};

hexo.extend.tag.register("docTable", helper);
hexo.extend.helper.register("docTable", helper);
