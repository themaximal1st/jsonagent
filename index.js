require("dotenv").config();
const { join } = require("path");

const { Chat } = require("@themaximalist/llm.js");

const prompt = require("@themaximalist/prompt.js");
prompt.configure({ promptDir: join(__dirname, "data", "prompts") });

class JSONAgent {
    constructor(state = {}, agent_prompt = "JSONAgent-v1", model = process.env.LLM_MODEL, api_key = process.env.OPENAI_API_KEY) {
        const system_prompt = prompt.load(agent_prompt)
        this.agent = Chat.fromSystemPrompt(system_prompt, model, api_key);
        this.states = [state];
    }

    get state() {
        return this.states[this.states.length - 1];
    }

    async transition(input, history = false, transition_prompt = "Transition-v1") {
        const user_prompt = prompt.load(transition_prompt, {
            "OLD_STATE": this.state,
            "TRANSITION": input,
        });

        let response;
        if (history) {
            response = await this.agent.chat(user_prompt);
        } else {
            response = await this.agent.twoshot(user_prompt);
        }

        // YOLO CODE: https://themaximalist.com/infinityarcade/
        const lines = response.split("\n");
        for (const line of lines) {
            try {
                const new_state = JSON.parse(line);
                this.states.push(new_state);
                return this.state;
            } catch (e) {
                console.log(`error parsing ${line}`);
            }
        }

        throw new Error(`Invalid response from chat history: '${response}'`);
    }
}

module.exports = JSONAgent;