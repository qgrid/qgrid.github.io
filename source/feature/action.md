---
title: Actions
group: Features
order: 16
---

Action is just a representation of the command that is utilized by q-grid. Use `<ng-template for="trigger">` component to customize action.

```html
<q-grid>
   <q-grid-actions>

      <q-grid-action icon="refresh" title="Load Data" [command]="loadCommand">
      </q-grid-action>

      <q-grid-action id="sort-by-symbol-desc">
         <ng-template for="trigger" let-$action>
            <button (click)="sort($action.model)">Sort By Desc</button>
         </ng-template>
      </q-grid-action>

   </q-grid-actions>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/action-bar-template/latest" %}