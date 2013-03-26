### Callbacks as a poor replacement for return/throw

  * Functions can do 2 things: return and throw
  * Can't do either from within a callback
  * Callbacks (node-style) are the bare minimum replacement
  * Caveats:
    * No guarantees or consistency between implementations
    * APIs for handling callbacks can get very large, hard to remember
    * Errors don't unwind the stack, require manual propagation
    * Everything needs to be done in the callback, code quickly shifts to the right

### 

  
