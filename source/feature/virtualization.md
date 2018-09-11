---
title: Virtualization
group: Features
order: 14
---

> Don't use virtualization in the production code it has BETA status.

## Infinite Scroll

```typescript
@Component({
	template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
	@ViewChild(GridComponent) myGrid;

	constructor(private dataService: DataService, private qgrid: Grid) {
	}

	ngAfterViewInit() {
		const { model } = this.myGrid;

		model.data({
			pipe: [
				(rows, context, next) => {
					const { skip } = model.fetch();
					const { size } = model.pagination();

					this.dataService
						.getAtoms()
						.subscribe(atoms => {
							const newPage = atoms.slice(skip, skip + size);
							next(rows.concat(newPage));
						});

				}].concat(this.qgrid.pipeUnit.view)
		});
	}
}
```

{% docEditor "github/qgrid/ng2-example/tree/scroll-virtual-infinite/latest" %}
