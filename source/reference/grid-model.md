---
title: Grid Model
group: Reference
order: 1
---

The most of work could be configured in the HTML templates but sometimes it's required to have direct access to the `model` - a state container of the q-grid.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class MyComponent implements AfterViewInit {
   gridModel: GridModel;

   constructor(qgrid: Grid) {
      this.gridModel = qgrid.model();
   }

   ngAfterViewInit() {
      const firstRow = this.gridModel.data().rows[0];

      this.gridModel.selection({
         unit: 'row',
         items: [firstRow]
      });
   }
}
```

> q-grid state implements immutable pattern so to change the state new value or reference should be created in other case nothing will happen.

## How to detect if something was changed in the model?

All separate states in the model have `<name-of-state>Changed` property to handle model modifications. There are two methods for changes subscription.

* `on` is used to get change notifications.
* `watch` is used to get first notification if something was changed before subscription and then get change notifications.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>'
})
export class MyComponent implements AfterViewInit {
   gridModel: GridModel;

   constructor(qgrid: Grid) {
      this.gridModel = qgrid.model();
   }

   ngAfterViewInit() {
      this.gridModel.selectionChanged.on(e => console.log('selection changed')));
   }
}
```

> q-grid uses own event system that not guarantee that event is triggered in angular zone, so there can be situations that change detection should be triggered manually inside a subscription.
