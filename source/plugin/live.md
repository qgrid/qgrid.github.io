---
title: Live
group: Plugins
order: 14
---

Use live plugin to animate cells and rows when they will be changed.


{% docEditor "github/qgrid/ng2-example/tree/live-data-basic/latest" %}

## Installation

- For cell animation: Add `ng-template` inside `q-grid-column` with `change` input and add live-cell component inside your `ng-template`.

- For row animation: Add `q-grid-live-rows` inside of q-grid component.

```typescript
@Component({
   selector: 'my-component',
   template: `
        <q-grid [rows]="rows">
	        <q-grid-columns generation="deep">
		        <q-grid-column key="last" type="currency">
			        <ng-template for="change" let-$cell>
				        <q-grid-live-cell
					        [cell]="$cell">
				        </q-grid-live-cell>
		        	</ng-template>
		        </q-grid-column>
            </q-grid-columns>
			<q-grid-live-rows></q-grid-live-rows>
         </q-grid>
    `
})
export class MyComponent {
	rows: Quote[];

	constructor(private dataService: DataService) {
		this.dataService
        	.getQuotes()
        	.subscribe(quotes => this.rows = quotes);
	}
}
```
## How to set a duration for animation?

Use `duration` attribute of `live-cell` or `live-rows` component.

```html
<q-grid-live-rows
    [duration]="1000">
</q-grid-live-rows>
```

> Note that the duration is set in milliseconds and default is 200 ms
