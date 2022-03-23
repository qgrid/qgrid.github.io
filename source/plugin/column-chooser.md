---
title: Column chooser
group: Plugins
order: 15
---
- [Installation](#installation)
- [How To](#howto)

Column chooser plugin

{% docEditor "github/qgrid/ng2-example/tree/action-bar-basic/latest" %}

<a name="installation" href="#installation">
   Installation
</a>

This plugin is pre-installed in qgrid and will be rendered by default.

To remove the column chooser, empty the actions array.

<a name="howto" href="#howto">
   How to
</a>

To remove the column chooser, empty the actions array.

```typescript
@Component({
	selector: 'example',
	template: `
		<q-grid [rows]="rows | async" [model]="gridModel">
			<q-grid-columns generation="deep">
			</q-grid-columns>
		</q-grid>
	`,
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
	rows = this.dataService.getRows();
	gridModel = this.qgrid.model().action({items: []});

	constructor(
      dataService: DataService,
      qgrid: Grid
   ) {
	}
}
```