---
title: Grouping
group: Features
order: 7
---

Use q-grid model to group rows by particular columns or implement own way.

## Basic Grouping

Use `groupBy` attribute to setup grouping columns and `groupMode` to change group representation. Mode equals to `nest`(by default) means that all hierarchy levels should be inside one group type column.

```html
<q-grid [groupBy]="['bondingType', 'groupBlock']"></q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/group-row-/latest" %}

## Flat Grouping

Use `flat` mode when all hierarch levels should have own columns.

```html
<q-grid [groupBy]="['bondingType', 'groupBlock']" groupMode="flat"></q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/group-row-flat/latest" %}

## Rowspan Grouping

Use `rowspan` mode when group column should occupy all available height on expand.

{% docEditor "github/qgrid/ng2-example/tree/group-row-rowspan/latest" %}

## Subhead Grouping

Use `subhead` mode when group column should fill available space to display hierarchy.

{% docEditor "github/qgrid/ng2-example/tree/group-row-subhead/latest" %}

## Group Summary

Use `group-summary` column type to setup template for grouping aggregation rows.

```html
<q-grid [groupBy]="['bondingType', 'groupBlock']" groupMode="subhead" groupSummary="leaf">
   <q-grid-columns>
      <q-grid-column type="group-summary" aggregation="count">
         <ng-template for="body" let-$cell>
            Count: {{$cell.value}}
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/group-row-summary/latest" %}

## How to implement custom hierarchy model?

By using pipe idea q-grid allows to transform any data processing to fit the requirements, grouping and pivoting is not exception, use custom pipe to define own hierarchies.

```typescript
import { Grid, Node, Command } from 'ng2-qgrid';

@Component({
   template: '<q-grid></q-grid>',
})
export class MyComponent {
   gridModel: GridModel;

   constructor(qgrid: Grid) {
      this.gridModel = qgrid.model();

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