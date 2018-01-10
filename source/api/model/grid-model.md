---
title: GridModel
type: api
group: API
order: 13
---
A class contains basic grid options like id and title.

Property|Type|Description<a class="github-link2" target="_blank" href="https://github.com/qgrid/ng2/tree/master/core/grid/grid.model.js"><span>grid.model.js</span></a>
---|---|---
id|`string`|Grid identifier that is in sync with element id.<br />Mostly this id is used in a style generation routine to link concrete grid with appropriate style.<br />Also is used in data manipulation plugin to identify correct list of pressets.
status|`string`|Indicates a state of the model:<br />1. `unbound` - model is not connected to a grid element.<br />2. `bound` - model connected to a grid element. Current version of the grid doesn't allow to use one model on several grids,<br />so if user will try to do that exception will be thrown.<br />
title|`string`|Text that is used by grid title plugin to show header inside top toolbar.
