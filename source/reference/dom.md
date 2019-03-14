---
title: DOM Internals
group: Reference
order: 6
---

The q-grid internally uses basic DOM table elements, but there is no any component or service which works with core DOM directly. The q-grid populates an abstraction called `DOM Table` which encapsulates any low-level work with core DOM. The benefits:

* Simple access to the columns, rows and cells. Work with `DOM Table` just like using 2d array instead of complex selectors.
* Development transparency of the fixed header, footer, rows and columns.
* Much easier to handle row and column spans.
* Style API maintenance becomes easy and fast.
* Virtualization can be engaged without special code writing.