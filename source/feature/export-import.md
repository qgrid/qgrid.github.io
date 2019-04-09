---
title: Export/Import
group: Features
order: 14
---

Use q-grid import plugin to fill in rows with data from files.

## Supported Formats

File types which are supported out of box for import into the q-grid:

* `csv`
* `json`
* `xlsx`
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

## Setup Export

Add `q-grid-export` component with required format type inside the q-grid body and set auto generation mode for the columns.

```html
<q-grid>
   <q-grid-columns generation="deep"></q-grid-columns>
   	<q-grid-export type="json">
   	</q-grid-export>
</q-grid>
```

Add file-saver library to the q-grid plugin model.

```typescript
import * as fileSaver from 'file-saver';

@Component({
  templateUrl: 'app.component.html',
})
export class MyComponent {
  @ViewChild(GridComponent) myGrid: GridComponent;

  ngAfterViewInit() {
    this.myGrid.model.plugin({
      imports: {
        'fileSaver': fileSaver
      }
    });
  }
}
```

## Custom template for the export trigger

Add own ng-template to override default launch export action.

```html
<q-grid-export type="csv">
	<ng-template for="trigger" let-$action>
		<button mat-button (click)="$action.execute()">Export to CSV</button>
	</ng-template>
</q-grid-export>
```

{% docEditor "doc-qgrid-ng2-export" %}


## Setup Import

Just add `q-grid-import` component inside the q-grid body and set auto generation mode for the columns.

```html
<q-grid>
   <q-grid-columns generation="deep"></q-grid-columns>
   <q-grid-import></q-grid-import>
</q-grid>
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

## Suggested Links

* [SheetJS](http://github.com/SheetJS/js-xlsx)
* [FileSaver](https://github.com/eligrey/FileSaver.js/)