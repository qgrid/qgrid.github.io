---
title: Performance Tips
type: guide
group: Getting started
order: 6
---

## Interaction mode

The q-grid introduces 3 modes that allows to change performance strategy. 

```html
<q-grid interactionMode="detached"></q-grid>
```

* Use `full` mode to get all benefits of change detection, this is a default behavior. 
* Use `readonly` mode to enable help of internal cache to acquire cell values.
* Use `detached` mode to disable change detection after render occurs.

> Regardless of the detached setting, Angular will check the cells for changes whenever the component fires an event or an observable fires an event, and the async pipe is used in the view with that observable.

{% docEditor "github/qgrid/ng2-example/tree/interaction-mode-detached/latest" %}

## Invalidate q-grid explicitly
When interaction mode is equal to readonly or detached use `invalidate` method to refresh cell values or create a `new reference` of the data rows.

```typescript
import { Grid, GridComponent } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: `
        <q-grid [rows]="rows" 
                interactionMode="readonly">
        </q-grid>
        `
})
export class MyComponent {
   @ViewChild(GridComponent) myGrid: GridComponent;
   rows: [];

   constructor(private qgrid: Grid, dataService: MyDataService) {
        dataService
            .getRows()
            .subscribe(rows => this.rows = rows);
   }

   updateCellUsingInvalidate() {
        this.rows[0].gender = 'female';
    
        const service = this.qgrid.service(this.myGrid.model);
        service.invalidate();
   }

   updateCellUsingNewRowsRef() {
        const rows = Array.from(this.rows);
        rows[0].gender = 'female';

        this.myGrid.model.data({ rows });
   }
}

```

## Virtualization

> This is a beta version, don't use it in the production.
 
Virtual scroll can offer performance benefits when working with large collections. It does so by only rendering and processing a subset of the data which is visible to the user vs. processing the entire list of data. By creating only DOM elements for the visible items, this can greatly reduce the amount of work it has to do. q-grid provides `vscroll` module that is available not only for row and column virtualization but also for plugins. For instance, column filter plugin uses `vscroll` to virtualize value list. 


```html
<q-grid scrollMode="virtual"></q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/scroll-virtual-style/latest" %}