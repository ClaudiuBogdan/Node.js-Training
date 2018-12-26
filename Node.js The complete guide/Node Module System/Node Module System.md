# Node Module System

## Main Ideas:
- Different type of variables: <strong>Global</strong> and <strong>Local</strong>
- One of the global object is: <i>global</i>
- Every file in a node application is considered a <i>module</i>.
- The module is a variable. Use module.exports.something = something to exports components from the model.
- Also is possible to export a function with module.exports = myfunction
- To load a module, use required('./mymodule');
