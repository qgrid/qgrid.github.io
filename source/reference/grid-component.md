---
title: Grid Component
group: Reference
order: 0
---

The most of work could be configured in the HTML templates under the `q-grid` component. Sometimes it's required to have direct access to the q-grid model, in this case `GridComponent` could be used. Be aware that grid component instance will be available only after view init.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid"></q-grid>'
})
export class MyComponent {
   @ViewChild(GridComponent) grid: GridComponent;

   ngAfterViewInit() {
      const { model } = this.grid;
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