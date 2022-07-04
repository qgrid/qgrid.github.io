---
title: Grid Component
group: Reference
order: 0
---
- [What about id in the q-grid?](#what-about-id-in-the-q-grid)
- [How to setup title of the grid?](#how-to-setup-title-of-the-grid)

The most of work could be configured in the HTML templates under the `q-grid` component. Sometimes it's required to have direct access to the q-grid model, in this case `GridModel` could be used.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class MyComponent {
   gridModel = this.qgrid.model();

   constructor(private qgrid: Grid) {}
}
```

<a name="what-about-id-in-the-q-grid" href="#what-about-id-in-the-q-grid">
   What about id in the q-grid?
</a>

Be carful by setting up id in the q-grid it should be unique across whole html page, because q-grid internally use it for the style sheet generation and default state persistence.

```html
<q-grid id="my-grid"></q-grid>
```

<a name="how-to-setup-title-of-the-grid" href="#how-to-setup-title-of-the-grid">
   How to setup title of the grid?
</a>

```html
<q-grid caption="My Example of Caption"></q-grid>
```
