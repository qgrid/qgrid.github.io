---
title: Grouping
group: Features
order: 12
---

- [Grouping Modes](#grouping-modes)
- [How to enable group summary template?](#how-to-enable-group-summary-template)
- [How to implement custom hierarchy model?](#how-to-implement-custom-hierarchy-model)
- [Suggested Links](#suggested-links)

Use q-grid model to group rows by particular columns or implement own hierarchies.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
      `
})
export class MyComponent implements AfterViewInit {
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.group({
         by: ['bondingType', 'groupBlock']
      });
   }
}
```

<a name="grouping-modes">
   Grouping Modes
</a>

Mode option controls how to group rows by default `nest` value is used.

* `nest` - all hierarchy levels are inside the group column.
* `flat` - all hierarch levels have own columns.
* `rowspan` - group column occupies all available height on expand.
* `subhead` - group column fills available space to display hierarchy.

<a name="#how-to-enable-group-summary-template">
   How to enable group summary template?
</a>

Use `group-summary` column type to setup template for summary rows.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep">
            <q-grid-column type="group-summary" aggregation="count">
               <ng-template for="body" let-$cell>
                  Count: {{ $cell.value }}
               </ng-template>
            </q-grid-column>
         </q-grid-columns>
      </q-grid>
      `
})
export class MyComponent implements AfterViewInit {
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.group({
         by: ['bondingType', 'groupBlock'],
         mode: 'subhead',
         summary: 'leaf'
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/group-row-summary/latest" %}

<a name="#how-to-implement-custom-hierarchy-model">
   How to implement custom hierarchy model?
</a>

Use data middleware to fit the requirements, use custom pipe to define own hierarchies.

```typescript
import { Grid, GridModel, Node, Command } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: `
      <q-grid [model]="gridModel">
         <q-grid-columns>
            <q-grid-column type="group"
                           offset="40"
                           width="80%"
                           widthMode="relative">
               <ng-template for="body"
                            let-$cell
                            let-$view="$view">
                  <div *ngIf="$view.group.isVisible($cell.row, $cell.column)"
                       [ngStyle]="{'padding-left': $view.group.offset($cell.row, $cell.column) + 'px'}">
               
                     <button *ngIf="$view.group.toggleStatus.canExecute($cell.row, $cell.column)"
                             (click)="$view.group.toggleStatus.execute($cell.row, $cell.column)">
                        <mat-icon class="q-grid-icon">
                           {{$view.group.status($cell.row, $cell.column) === 'expand' ? 'folder_open' : 'folder'}}
                        </mat-icon>
                     </button>
                     
                     <mat-icon *ngIf="($view.group.value($cell.row, $cell.column)).startsWith('file')"
                              class="q-grid-icon">
                        insert_drive_file
                     </mat-icon>
            </div>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
`
})
export class MyComponent implements AfterViewInit {
   gridModel = this.grid.model();

   constructor(private qgrid: Grid) {}

   ngAfterViewInit() {
      const { qgrid } = this;
      const root = new Node('$root', 0);
      const tree = [root];
      const myHierarchyPipe = (memo, context, next) => {
         memo.nodes = tree;
         next(memo);
      };

      this.gridModel
         .data({
            pipe: [
               qgrid.pipe.memo,
               myHierarchyPipe,
               qgrid.pipe.column,
               qgrid.pipe.view
            ]
         })
         .group({
            toggle: new Command({
               execute: function execute(node) {
                  if (!node.children.length) {
                     const length = Math.floor(Math.random() * 9 + 1);
                     const level = node.level + 1;
                     node.children = Array.from(new Array(length), function (x, i) {
                        const type = Math.floor(Math.random() * 5) < 3 ? 'group' : 'value';
                        const title = type === 'group' ? 'folder' : 'file';
                        return new Node(`${title}[${level}, ${i}]`, level, type);
                     });
                  }
               }
            })
         });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/hierarchy-browser-basic/latest" %}

<a name="#suggested-links">
   Suggested Links
</a>

* [Data Middleware](/reference/data-middleware.html)
