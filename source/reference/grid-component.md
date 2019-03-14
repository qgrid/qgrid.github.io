---
title: Grid Component
group: Reference
order: 0
---

The most of work could be configured in the HTML templates but sometimes it's required to have direct access to the q-grid model. In this case `GridComponent` could be used.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid"></q-grid>'
})
export class MyComponent {
   ViewChild(GridComponent) grid: GridComponent;

   ngAfterViewInit() {
      const { model } = this.grid;
   }
}
```
