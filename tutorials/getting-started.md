Getting started with Try F#
===========================

 - description: Congratulations! You've decided to take your first step towards learning F#, a 
      powerful language that enables you to write simple, concise code to solve complex 
      problems. In this course, we'll explore how Try F# works and you'll learn the basics - 
      working with variables, printing and we'll even do some <em>HTML</em> formatting.
 - image: tbd.png

Hello world in Try F#
---------------------

Running your first F# snippet in Try F# is super easy! To get started, type the following code 
into the editor, select the code and hit <kbd>Alt</kbd>+<kbd>Enter</kbd> to run it.
You do not even need a mouse - just select the code using <kbd>Shift</kbd> and arrow keys!

    printfn "Hello world"

Once you run the code, you should see the output inline. You can leave them around and just hit
<kbd>Enter</kbd> to move to the next line, but you can hide the outputs at any time using 
<kbd>Alt</kbd>+<kbd>Backspace</kbd>. 

When you are ready, type code that prints "Hello F#" in the editor, run it and we'll automatically
move to the next section!

```demo
// Welcome to Try F# and let's get started writing some F# code!
// (use Alt+Enter to run code and Alt+Backspace to hide outputs)
```

```test
output.ToLower().Contains("f#")
```

Simulating a dice
-----------------

Congratulations, you completed Hello World! Now, let's do something more interesting. In F#, 
you can define variables using the `let` keyword. For example:

    let sides = 6
    let rnd = System.Random()

The first line defines an integer variable, but the second one is more interesting. We are creating 
an instance of the `Random` class from standard libraries, so that we can generate some random 
numbers! Type `System.Random` in the editor - this will be easy thanks to auto-completion support!

F# uses type inference, so all variables are typed, but you do not need to write the type explicitly.
To simulate a dice, type `rnd.Next(1, sides + 1)`. When you type `rnd.` the editor gives you auto-completion 
based on the inferred type of the variable. 

The parameters specify that the results should be between `1` (inclusive) and `7` (exclusive),
so we just made a dice. Roll the dice using <kbd>Alt</kbd>+<kbd>Enter</kbd>. When you get 6, 
we'll go to the next step! :-)

> <i class="fa fa-lightbulb-o"></i> If you get an error saying "The namespace or module 
> 'rnd' is not defined", it is because Try F# does not automatically run your code. Select
> the part that defines `rnd` and run it before running your dice!

```demo
// Now, let's try simulating a dice!
let sides = 6
let rnd = ...
```

```test
unbox it = 6
```

Generating random colors
------------------------

Congratulations, I hope it did not take too long! (We did not track that.)

To end the tutorial with something fun, let's generate random colors. Given the following variable:

    let letters = "0123456789ABCDEF"

You can use `letters.Substring(10, 1)` to get a one-letter substring starting at offset 10 
(which is `"A"` in our example). Replace `10` with `rnd.Next(0, 16)` in this expression 
to get a random hexadecimal value from `0` to `A`!

Now you just need to concatenate `"#"` and six random letters from our alphabet to get a random
color. For now, just copy & paste the code 6 times (we'll look at better ways later!) and
concatenat strings using `+`. You can use multiple lines, like in the following sample:

    "#" + "This " + 
    "is not a " +
    "valid color!"

Now, write the code to generate a random color! When you produce a valid color, we'll move
to the next step.

> <i class="fa fa-lightbulb-o"></i> Do not forget to include the `#` symbol as the first 
> character of your string and make sure that you have 6 characters between 0 and F after it!
 
```demo
// We'll need hexadecimal letters & random numbers
let letters = "0123456789ABCDEF"
let rnd = System.Random()
```

```test
let strclr = unbox<string> it
let allHex = 
  strclr.ToLower().Substring(1)
  |> Seq.forall (fun c -> (c >= '0' && c <= '9') || (c >= 'a' && c <= 'f'))
strclr.[0] = '#' && strclr.Length = 7 && allHex
```

Adding HTML formatting
----------------------

Awesome! Now that you can generate random colors, let's finish the tutorial with some inline 
HTML. One more thing before we do that: _functions_!

In F#, we define functions just like variables using `let`. Functions take arguments, and those
are written right after the name of the function. The following function rolls a 6-sided dice:

    let rnd = System.Random()
    let roll () = 
        rnd.Next(1, 7)

The parameter `()` is called the _unit value_ and it specifies that `roll` is a function, but it
does not take any useful inputs. You can call it using `roll ()` and you'll get a random number
back. In the same way, you can now call `randomColor ()`, that we added for you, to get a random color!

> <i class="fa fa-magic"></i> And now, a little secret! If you produce a string starting with 
> "html: " we will render it as an inline HTML, so you can do some funky stuff...

You can append strings and call functions all at the same time, so try for example something like 
this (or, you can add the `<marquee>` tag for even more fun...):

    "html: <h1 style='color:" + 
    randomColor() + 
    "'>Hello Try F#</h1>"
        
And that's all! Feel free to play around, or [go back and choose a more advanced tutorial](/)!        

```demo
// We've got random color, so let's do some HTML!
let letters = "0123456789ABCDEF"
let rnd = System.Random()

let randomColor () = 
    "#" + letters.Substring(rnd.Next(0, 16), 1) +
    letters.Substring(rnd.Next(0, 16), 1) +
    letters.Substring(rnd.Next(0, 16), 1) +
    letters.Substring(rnd.Next(0, 16), 1) +
    letters.Substring(rnd.Next(0, 16), 1) +
    letters.Substring(rnd.Next(0, 16), 1)
```
