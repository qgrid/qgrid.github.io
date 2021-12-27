---
title: Navigation
group: Features
order: 13
---
- [What shortcuts does navigation implement by default?](#what-shortcuts-does-navigation-implement-by-default)
- [How to override default navigation shortcuts?](#how-to-override-default-navigation-shortcuts)
- [Shortcut limitations for browsers](#shortcut-limitations-for-browsers)
- [Prevent default keyboard actions](#prevent-default-keyboard-actions)
- [Suggested Links](#suggested-links)

The q-grid navigation system supports various keyboard events to start keyboard navigation q-grid should be focused.

<a name="#what-shortcuts-does-navigation-implement-by-default">
   What shortcuts does navigation implement by default?
</a>

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

<a name="#how-to-override-default-navigation-shortcuts?">
   How to override default navigation shortcuts?
</a>

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
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
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
            downward: 'shift+pageDown'
         }
      });
   }
}
```

<a name="#shortcut-limitations-for-browsers">
   Shortcut limitations for browsers
</a>

Here's a number of `Ctrl` key combinations that browsers do not allow JavaScript to override for preventing malicious websites.

* `Ctrl+N`
* `Ctrl+Shift+N`
* `Ctrl+T`
* `Ctrl+Shift+T`
* `Ctrl+W`
  
> If you use q-grid in electron box, these shortcuts could be overwritten.

<a name="#prevent-default-keyboard-actions">
  Prevent default keyboard actions
</a>

q-grid prevents some default browser shortcuts actions when it's focused, like `home` and `end` key presses. Use `prevent` property from the `model.navigation()` state to manage it. 

<a name="#suggested-links">
  Suggested Links
</a>

* [Chromium issues](https://bugs.chromium.org/p/chromium/issues/detail?id=33056) 
* [Google code discussion](https://groups.google.com/a/chromium.org/forum/?fromgroups=#!topic/chromium-bugs/Ntc1byZXHfU)
* [Bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1291706)
