---
title: Navigation
group: Features
order: 13
---

The q-grid navigation system supports various keyboard events to start keyboard navigation q-grid should be focused.

## What shortcuts does navigation implement by default?

* `up` - up.
* `down` - down.
* `left` - left.
* `right` - right.
* `tab` - next.
* `shift+tab` - previous.
* `home` - home.
* `end` - end.
* `pageUp` - pageUp.
* `pageDown` - pageDown.
* `shift+pageUp` - upward.
* `shift+pageDown`- downward.

## How to override default navigation shortcuts?

Use `shortcut` property in the navigation model.

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
   rows$: Observable<[]>;
   gridModel: GridModel;

   constructor(dataService: MyDataService, qgrid: Grid) {
      this.rows$ = dataService.getRows();
      this.gridModel = qgrid.model();
   }

   ngAfterViewInit() {
      this.gridModel.navigation({
         shortcut: {
            up: 'up',
            down: 'down',
            left: 'left',
            right: 'right',
            next: 'tab',
            previous: 'shift+tab',
            home: 'home',
            end: 'end',
            pageUp: 'pageUp',
            pageDown: 'pageDown',
            upward: 'shift+pageUp',
            downward: 'shift+pageDown',
         }
      });
   }
}
```

## Shortcut limitations for browsers

Here's a number of `Ctrl` key combinations that browsers do not allow JavaScript to override for preventing malicious websites.

* `Ctrl+N`
* `Ctrl+Shift+N`
* `Ctrl+T`
* `Ctrl+Shift+T`
* `Ctrl+W`
  
> If you use q-grid in electron box, these shortcuts could be overwritten.

## Suggested Links

* [Chromium issues](https://bugs.chromium.org/p/chromium/issues/detail?id=33056) 
* [Google code discussion](https://groups.google.com/a/chromium.org/forum/?fromgroups=#!topic/chromium-bugs/Ntc1byZXHfU)
* [Bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1291706)
