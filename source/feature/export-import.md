---
title: Export/Import
group: Features
order: 8
---

Use q-grid import plugin to fill in rows with data from files.

## Setup

Just add `q-grid-import` component inside the q-grid body and set auto generation mode for the columns.

```html
<q-grid>
   <q-grid-columns generation="deep"></q-grid-columns>
   <q-grid-import></q-grid-import>
</q-grid>
```

## Supported formats

File types which are supported out of box for import into the q-grid:

* `csv`
* `json`
* `xml`

## XLSX 

If xlsx format is required, add SheetJs library to the q-grid plugin model.

```typescript
import * as XLSX from 'xlsx';

@Component({
  templateUrl: 'app.component.html',
})
export class MyComponent {
  @ViewChild(GridComponent) myGrid: GridComponent;

  ngAfterViewInit() {
    this.myGrid.model.plugin({
      imports: {
        'xlsx': XLSX
      }
    });
  }
}
```

## Custom template for the import trigger

Add own ng-template to override default launch import action.

```html
<q-grid-import>
   <ng-template for="trigger" let-$action>
      <button (click)="$action.execute()">Open</button>
   </ng-template>
</q-grid-import>
```

{% docEditor "doc-qgrid-ng2-import" %}

## Suggested links

* [SheetJS](http://github.com/SheetJS/js-xlsx)