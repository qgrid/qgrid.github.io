---
title: Row Options
group: Column Types
order: 9
---

Row options column allows to populate list of actions for the appropriate row by using `[editorOptions]` input.

```typescript
@Component({
    template: `
       <q-grid [rows]="rows$ | async">
          <q-grid-columns>
            <q-grid-column key="rowOptions"
                           type="row-options"
                           [editorOptions]="{actions: rowActions}">
            </q-grid-column>
          </q-grid-columns>
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

## How to open row options menu on enter pressed?

Just focus row options column programmatically.

```typescript
@Component({
   template: `
      <q-grid [rows]="rows">
         <q-grid-columns>
            <q-grid-column key="rowOptions"
                           type="row-options"
                           [editorOptions]="rowOptions">
            </q-grid-column>
         </q-grid-columns>
         <q-grid-actions>
            <q-grid-action id="enterAction"
                           [command]="enterCommand">
            </q-grid-action>
         </q-grid-actions>
   </q-grid>
   `
})
export class MyComponent {
   rowOptions = {
      trigger: 'focus',
      actions: [
         new Action(new Command(), 'Hello'),
         new Action(new Command(), 'World')
      ]
   };

   enterCommand = new Command({
      execute: () => {
         const { rowIndex, columnIndex } = this.gridModel.navigation();
         const { columns } = this.gridModel.view();

         const rowOptionsColumnIndex = columns.findIndex(c => c.key === 'rowOptions');
         this.gridService.focus(rowIndex, rowOptionsColumnIndex);
    },
    shortcut: 'enter'
  });
}
```

## Suggested Links

* [Action plugin](/plugin/action.html)