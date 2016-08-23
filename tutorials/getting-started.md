Getting started with F#
=======================

 - description: Congratulations! You've decided to take your first step towards learning F#, a 
      powerful language that enables you to write simple, concise code to solve complicated 
      problems. In this course, you'll learn the basics that you need to feel comfortable 
      reading and writing F# programs.
 - image: tbd.png

Running code
------------

With Try F#, writing your first line of F# code is much easier than it is with many other languages. 
To get started, try typing the following code into the Script Window and pressing the run button or, 
ctrl+enter. If you don't feel like typing, you can also press the load and run button to execute the code.

```demo
// Welcome!
```

```solution 
let lucky = 3
```

```test
lucky = 3
```

Adding numbers
--------------

Now try adding some numbers

```solution
let unlucky = lucky + 6
```

```test
unlucky = 9
```

Mutation
--------

Type `let mutable evil = "foo"` and mutate the value using `evil <- 42`.

```solution
let mutable evil = 1
evil <- 32
```

```test
( evil <- evil; evil = 42 )
```

That's it
---------

Fin d tutorial
