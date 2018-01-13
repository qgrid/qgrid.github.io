---
title: StyleModel
type: api
group: API
order: 217
---
A class that allows to apply styles to rows and cells.

{% docTable "source/api/style-model.json" %}

## Usage

```javascript
   gridModel.style({
       row: (row, context) => {
           if (row.gender === 'female') {
               context.class(`female-row-${this.femaleColor}`, {background: '#' + this.femaleColor});
           }

           if (row.gender === 'male') {
               context.class(`male-row-${this.maleColor}`, {background: '#' + this.maleColor});
           }
       },
       cell: (row, column, context) => {
           if (column.key === 'birthday') {
               context.class('red-birthday', {background: '#f00', color: '#fff'});
           }

           if (column.key === 'name.last') {
               if (context.value(row, context.columns.map.gender) === 'female') {
                   context.class('female-name-last', {background: '#ff0', color: '#000'});
               }
           }

           if (column.key === 'name.first') {
               if (context.row % 2) {
                   context.class('first-name-even', {background: '#000', color: '#fff'});
               }
               else {
                   context.class('first-name-odd', {background: '#fff', color: '#000'});
               }
           }
       }
   });
```

