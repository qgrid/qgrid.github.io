---
title: Performance Tips
type: guide
group: Getting started
order: 6
---

## Interaction Mode

q-grid introduces 3 modes that allows to change performance strategy. 

```html
<q-grid interactionMode="readonly"></q-grid>
```

* Use `full` mode to get all benefits of change detection, this is a default behavior. 
* Use `readonly` mode to enable help of internal cache to acquire cell values.
* Use `detached` mode to disable change detection after render occurs(angular events inside cell templates don't work in this case).

## Invalidate q-grid explicitly
When interaction mode is equal to `readonly` or `detached` use invalidate to refresh cell values or create a new reference of data rows.

```typescript
import { Grid, GridComponent } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: `
        <q-grid #myGrid
                [rows]="rows" 
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

> Under Construction
 
Virtual scroll can offer performance benefits when working with very large collections. It does so by only rendering and processing a subset of the data which is visible to the user vs. processing the entire list of data. By creating only DOM elements for the visible items, this can greatly reduce the amount of work it has to do. q-grid provides `vscroll` module that is available not only for row and column virtualization but also for plugins. For instance, column filter plugin uses `vscroll` to virtualize value list. 


```html
<q-grid scrollMode="virtual"></q-grid>
```

