---
title: Row Options
group: Column Types
order: 9
---

Row options column allows to populate list of actions for the appropriate row by using `[editorOptions]` input.

```typescript
@Component({
    template: `
       <q-grid [rows]="rows">
          <q-grid-column key="rowOptions"
                         type="row-options"
                         [editorOptions]="{actions: rowActions}">
          </q-grid-column>
       </q-grid>
    `
})
export class MyComponent {
  rowActions = [
    new Action(
      new Command<{ row: Atom }>({
        execute: cell => window.open(cell.row.source, '_blank'),
        shortcut: 'alt+g'
      }),
      'Goto Wiki',
      'link'
    )
  ];
}
```

{% docEditor "github/qgrid/ng2-example/tree/column-row-options-basic/latest" %}

## Default template

Edit template is populated automatically when cell is clicked, because by default `row-options` column has `class` property equals to `control` and `canEdit` is `true`. So don't need to have any code regarding to `$view` service.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="row-options">
         <ng-template for="body">
            <mat-icon class="q-grid-icon">more_vert</mat-icon>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```
