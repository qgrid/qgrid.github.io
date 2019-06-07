---
title: Grouping
group: Features
order: 14
---

Use q-grid model to group rows by particular columns or implement own hierarchies.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
      `
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.group({
         by: ['bondingType', 'groupBlock'],
      });
   }
}
```

## Grouping Modes

Mode option controls how to group rows by default `nest` value is used.

* `nest` - all hierarchy levels are inside the group column.
* `flat` - all hierarch levels have own columns.
* `rowspan` - group column occupies all available height on expand.
* `subhead` - group column fills available space to display hierarchy.

## How to enable group summary template?

Use `group-summary` column type to setup template for summary rows.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
            <q-grid-column type="group-summary" aggregation="count">
               <ng-template for="body" let-$cell>
                  Count: {{$cell.value}}
               </ng-template>
            </q-grid-column>
         </q-grid-columns>
      </q-grid>
      `
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.group({         
         by: ['bondingType', 'groupBlock'],
         mode: 'subhead',
         summary: 'leaf'
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/group-row-summary/latest" %}

## How to implement custom hierarchy model?

Use data middleware to fit the requirements, use custom pipe to define own hierarchies.

```typescript
import { Grid, Node, Command } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>',
})
export class MyComponent implements AfterViewInit {   
   @ViewChild(GridComponent) myGrid: GridComponent;

   constructor(private qgrid: Grid) {
   }

   ngAfterViewInit(){ 
      const { qgrid } = this;
      const { model } = this.myGrid;

      const root = new Node('$root', 0);
      const tree = [root];
      const treePipe = (memo, context, next) => {
         memo.nodes = tree;
         next(memo);
      };

      this.gridModel
         .data({
            pipe: [
               qgrid.pipe.memo,
               treePipe,
               qgrid.pipe.column,
               qgrid.pipe.view
            ]
         })
         .group({
            toggle: new Command({
               execute: function execute(node) {
                  if(!node.children.length) {
                     const length = Math.floor(Math.random() * 9 + 1);
                     const level = node.level + 1;
                     node.children = Array.from(new Array(length), function (x, i) {
                        const type = Math.floor(Math.random() * 5) < 3 ? 'group' : 'value';
                        const title = type === 'group' ? 'folder' : 'file';
                        const child = new Node(title + ' [' + level + ',' + i + '] ', level, type);
                        return child;
                     });
                  }
               }
            })
         });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/hierarchy-browser-basic/latest" %}

## Suggested Links

* [Data Middleware](/reference/data-middleware.html)