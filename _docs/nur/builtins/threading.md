---
project: nur
title: threading
order: 18
section: Built-in modules
---

# The Threading Built-in Module

```
threading = import("threading")
```

## Functions

- spawn

Spawns a new thread managed by the operating system and returns handle to it

```
thread = threading.spawn(fn x, y {
    println(x, y)
}, [10, 49])
```

- join

Waits until the thread finishes

```
threading.join(thread)
```
