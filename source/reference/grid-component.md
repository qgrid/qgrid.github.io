---
title: Grid Component
group: Reference
order: 0
---

The most of work could be configured in the HTML templates under the `q-grid` component. Sometimes it's required to have direct access to the q-grid model, in this case `Grid.model()` could be used.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class MyComponent {
   gridModel: GridModel;

   constructor(private qgrid: Grid) {
      this.gridModel = qgrid.model();
   }
}
```

## What about id in the q-grid?

Be carful by setting up id in the q-grid it should be unique across whole html page, because q-grid internally use it for the style sheet generation and default state persistence.

```html
<q-grid id="my-grid"></q-grid>
```

## How to setup title of the grid?

```html
<q-grid caption="My Example of Caption"></q-grid>
```
