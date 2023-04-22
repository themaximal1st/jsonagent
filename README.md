# JSON Agent

JSON Agent is a Node.js library that enables you to create an evolving JSON data structure using the power of OpenAI's GPT-4. With JSON Agent, your data structures can learn, adapt, and change on their own, making your applications smarter and more powerful. Get ready for the next level of intelligent data structures with JSON Agent!



## 🚀 Features

- **Evolving Data Structures**: JSON Agent allows your JSON data structures to learn and adapt on their own, giving you more flexible and intelligent solutions.
- **GPT-4 Integration**: Harness the power of OpenAI's GPT-4 model to supercharge your JSON data structures.
- **Easy-to-use API**: The intuitive JSON Agent API makes it simple to integrate this cutting-edge technology into your projects.



## 📚 Quick Start

To get started with JSON Agent, follow this simple example. Be sure to configure your `OPENAI_API_KEY`.

```javascript
const JSONAgent = require("@themaximalist/jsonagent.js");
const agent = new JSONAgent({ x: 0 });
console.log(agent.state);
await agent.transition("increment x"); // { x: 1 }
```

Or try an evolving task list:

```javascript
// evolving task list
const agent = new JSONAgent({
  tasks: [
      "Start a profitable business",
  ]
});

for (let i = 0; i < 5; i++) {
    console.log(agent.state);
    await agent.transition("Expand task list")
}
```



## ✅ Configuration

To use this module, you will need an API key from OpenAI. Set the`OPENAI_API_KEY` environment variable with your API key:

```bash
export OPENAI_API_KEY=<your-openai-api-key>
```



## 📖 API

### JSONAgent Class

The main interface to interact with JSON Agent is through the `JSONAgent` class. You can create a new instance by passing an initial state and optional parameters:

```javascript
const agent = new JSONAgent(initialState);
```

#### Methods

- `transition(input, history=false)`: Accepts an input string (and an optional `history` parameter to send entire history context), then performs a state transition based on the input and updates the JSON data structure.

#### Properties

- `state`: Retrieves the current state of the JSON data structure.



## ⁉️ Will this actually work?

Maybe, it seems to sometimes. Try it out and let me know what you find.



## TODO

* Rollback to `history=true` in case of failure, backoff



## 🌐 Author

- [The Maximalist](https://themaximalist.com/)
- [@themaximal1st](https://twitter.com/themaximal1st)



## ⚖️ License

MIT
