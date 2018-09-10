---
title: Grouping & Pivoting
group: Features
order: 10
---

Use q-grid grouping model to group rows by particular columns or use own implementation.

## Basic Grouping

Use `groupBy` attribute to setup grouping columns.

```html
<q-grid [groupBy]="['bondingType', 'groupBlock']"></q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/group-row-basic/latest" %}

## Flat Grouping

Use `groupMode` attribute to specify how groups are rendered. `Flat` means

```html
<q-grid [groupBy]="['bondingType', 'groupBlock']" groupMode="flat"></q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/group-row-flat/latest" %}

## Rowspan Grouping

Use group model to get more control over grouping

{% docEditor "github/qgrid/ng2-example/tree/group-row-rowspan/latest" %}

## Subhead Grouping

{% docEditor "github/qgrid/ng2-example/tree/group-row-subhead/latest" %}

## Group Summary

{% docEditor "github/qgrid/ng2-example/tree/group-row-summary/latest" %}

## Custom Hierarchy

```typescript
import { Grid, Node, Command } from 'ng2-qgrid';

@Component({
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class MyComponent {
   gridModel: GridModel;

   constructor(qgrid: Grid) {
      this.gridModel = qgrid.model();

      const root = new Node('$root', 0);
      const tree = [root];
      const service = qgrid.service(this.gridModel);
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

## Pivoting

{% docEditor "github/qgrid/ng2-example/tree/pivot-column-basic/latest" %}
