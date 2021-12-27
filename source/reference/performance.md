---
title: Performance Tips
type: guide
group: Reference
order: 7
---
- [Invalidate q-grid explicitly?](#invalidate-q-grid-explicitly)
- [Virtualization](#virtualization)
- [The OnPush Host](#the-onPush-host)

The q-grid introduces 3 modes that allows to change performance strategy.

```html
<q-grid interactionMode="detached"></q-grid>
```

* Use `full` mode to get all benefits of change detection, this is a default behavior. 
* Use `readonly` mode to enable help of internal cache to acquire cell values.
* Use `detached` mode to disable change detection after render occurs.

> Regardless of the detached setting, Angular will check the cells for changes whenever the component fires an event or an observable fires an event, and the async pipe is used in the view with that observable.

{% docEditor "github/qgrid/ng2-example/tree/interaction-mode-detached/latest" %}

<a name="invalidate-q-grid-explicitly" href="#invalidate-q-grid-explicitly">
   Invalidate q-grid explicitly
</a>

When interaction mode is equal to readonly or detached use `invalidate` method to refresh cell values or create a `new reference` of the data rows.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: ` <q-grid [rows]="rows" interactionMode="readonly"> </q-grid> `,
})
export class MyComponent {
   rows: [];
   gridModel = this.qgrid.model();

   constructor(
      private qgrid: Grid, 
      dataService: MyDataService
   ) {
      dataService.getRows().subscribe((rows) => (this.rows = rows));
   }

   updateCellUsingInvalidate() {
      this.rows[0].gender = 'female';

      const service = this.qgrid.service(this.gridModel);
      service.invalidate();
   }

   updateCellUsingNewRowsRef() {
      const rows = Array.from(this.rows);
      rows[0].gender = 'female';

      this.gridModel.data({ rows });
   }
}
```

<a name="virtualization" href="#virtualization">
   Virtualization
</a>

> This is a beta version, don't use it in the production.
 
Virtual scroll can offer performance benefits when working with large collections. It does so by only rendering and processing a subset of the data which is visible to the user vs. processing the entire list of data. By creating only DOM elements for the visible items, this can greatly reduce the amount of work it has to do. q-grid provides `vscroll` module that is available not only for row and column virtualization but also for plugins. For instance, column filter plugin uses `vscroll` to virtualize value list. 


```html
<q-grid scrollMode="virtual"></q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/scroll-virtual-style/latest" %}

<a name="the-onPush-host" href="#the-onPush-host">
   The OnPush Host
</a>

If component which hosted q-grid implements `onPush` change detection strategy, the q-grid body behaves similar as interaction mode was set to `detached`.
