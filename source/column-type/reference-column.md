---
title: Reference
group: Column Types
order: 7
---

Use this column type when need to handle reference values, the `reference value` term describes data which can be defined using a key/value pair relationship.

```typescript
@Component({
    template: `
       <q-grid [rows]="rows">
          <q-grid-columns>
             <q-grid-column key="friends"
                            type="reference"                            
                            [editorOptions]="friends">
          </q-grid-columns>
       </q-grid>
    `
})
export class MyComponent {
   friends: EditorOptions = {
      modelFactory: ({ row, reference }) => {
         const model = this.qgrid.model();

         this.dataService
            .getFriends(row.myId)
            .subscribe(rows => model.data({ rows }));

        return model;
      }
   };

   constructor(private qgrid: Grid) {
   }
```

{% docEditor "github/qgrid/ng2-example/tree/column-reference-basic/latest" %}

## Default template and specific properties

* Use `[editorOptions]` to configure reference selection. The `modelFactory` callback from `[editorOptions]` returns model to expose another q-grid in a popup for user selection.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="reference">
         <ng-template for="body" let-$cell let-$view="$view">	
            <span>{{$cell.label}}</span>
            <button *ngIf="$view.edit.cell.canEdit($cell)"
                    (disabled)="!$view.edit.cell.enter.canExecute($cell)"
                    (click)="$view.edit.cell.enter.execute($cell)"             
                    type="button"
                    mat-icon-button
                    class="q-grid-reference-edit q-grid-edit-trigger"
                    tabindex="-1">
               <mat-icon matSuffix class="q-grid-icon">
                  search
               </mat-icon>
            </button>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```