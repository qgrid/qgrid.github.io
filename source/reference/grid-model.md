---
title: Grid Model
group: Reference
order: 1
---

The most of work could be configured in the HTML templates but sometimes it's required to have direct access to the `model` - a state container of the q-grid. All separate states in the model have `Changed` property to handle model modifications. To modify state each 

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent {
   ViewChild(GridComponent) grid: GridComponent;

   ngAfterViewInit() {
      const { model } = this.grid;
      const firstRow = model.data().rows[0];

      model.selectionChanged.on(e => console.log('selection changed')));
      model.selection({ 
         unit: 'row',
         items: [firstRow]
      });
   }
}
```
