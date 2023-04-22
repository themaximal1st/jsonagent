require("dotenv").config();
const { join } = require("path");
const { ChatHistory } = require("@themaximalist/llm.js");
const prompt = require("@themaximalist/prompt.js");

// Agent.fromPrompt("JSONAgent-v1");

class JSONAgentError extends Error { }

class JSONAgent {
    constructor(state = {}) {
        this.chat = new ChatHistory();
        this.chat.system(prompt.load("JSONAgent-v1"));
        this.states = [state];
    }

    get state() {
        return this.states[this.states.length - 1];
    }

    async transition(input) {
        this.chat.user(`
OLD_STATE: ${JSON.stringify(this.state)}
TRANSITION: ${JSON.stringify(input)}
        `.trim());

        const response = await this.chat.send();
        if (response.indexOf("NEW_STATE: ") !== 0) {
            throw new JSONAgentError("Invalid response from chat history");
        }

        const json_str = response.replace("NEW_STATE: ", "");

        try {
            const new_state = JSON.parse(json_str);
            this.states.push(new_state);
            return this.state;
        } catch (e) {
            throw new JSONAgentError(`Invalid JSON response from chat history: '${json_str}'`);
        }
    }
}

(async function () {
    prompt.configure({
        promptDir: join(__dirname, "data", "prompts"),
    });

    const agent = new JSONAgent({ x: 0 });
    console.log(agent.state);
    await agent.transition("increment x")
    console.log(agent.state);

    await agent.transition("y = x")
    console.log(agent.state);

    await agent.transition("increment x")
    console.log(agent.state);
})();


