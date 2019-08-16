---
title: Live
group: Plugins
order: 14
---

Use live plugin to animate cells and rows when they will be changed.


{% docEditor "github/qgrid/ng2-example/tree/live-data-basic/latest" %}

## Installation

Use `q-grid-live-cell` inside cell template to animate cell's content and `q-grid-live-row` for rows animation.

```typescript
@Component({
   selector: 'my-component',
   template: `
        <q-grid [rows]="rows$ | async">
	        <q-grid-columns generation="deep">
				<q-grid-column key="last" type="currency">

			        <ng-template for="change" let-$cell>
						<q-grid-live-cell [cell]="$cell"></q-grid-live-cell>
					</ng-template>

		        </q-grid-column>
			</q-grid-columns>
			
			<q-grid-live-rows></q-grid-live-rows>

         </q-grid>
    `
})
export class MyComponent implements AfterViewInit {
	@ViewChild(GridComponent) myGrid: GridComponent;
	rows$: Observable<[]>;

	constructor(private dataService: MyDataService) {
		 this.rows$ = dataService.getRows();
	}

	ngAfterViewInit() {
		const { model } = this.myGrid;
		this.dataService
			.getRows()
			.subscribe(rows => model.data({ rows }));
	}
}
```

## How to setup animation period?

Use `duration` attribute of `live-cell` or `live-rows` component.

```html
<q-grid-live-rows [duration]="1000"></q-grid-live-rows>
```

> Duration property receives milliseconds, default is 200ms
