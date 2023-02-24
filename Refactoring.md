# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The main objective of the function is to get a partition key that can be either directly provided, generated from the event data, or a default value if no data is available. Another goal is to make sure to encrypt keys longer than supported. I created tests for this functionality first and then went and split the code into several appropriately named functions. This also made testing easier as I could mock the return value of the encrypt function, for example, instead of the library implementation, plus some hoisting. Besides that, I used best practices to update each function code, like early returns, ternary operators, and no nested conditionals. The main function then became a much more readable and straightforward entry point, and you can tell what it does at a glance without having to read through the complete implementation.