---
title: Focusing
group: Features
order: 14
---

- [How to focus the last row?](#how-to-focus-the-last-row)
- [How to apply auto focus in q-grid?](#how-to-apply-auto-focus-in-q-grid)

Use q-grid service, focus and navigation states to get control over the focus.

<a name="how-to-focus-the-last-row" href="#how-to-focus-the-last-row">
   How to focus the last row?
</a>

Use focus method of q-grid service, it will automatically got to the necessary page if required.

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
      private qgrid: Grid,
      private dataService: MyDataService
   ) {
      const service = this.qgrid.service(this.gridModel);
      this.rows$.subscribe({
         next: rows => { service.focus(rows.length - 1, 0);
      });
   }
}
```

<a name="how-to-apply-auto-focus-in-q-grid" href="#how-to-apply-auto-focus-in-q-grid">
   How to apply auto focus in q-grid?
</a>

Add `q-grid-autofocus` directive on q-grid component?

```html
<q-grid [rows]="rows$ | async"
        q-grid-autofocus>
   <q-grid-columns generation="deep">
   </q-grid-columns>
</q-grid>
```