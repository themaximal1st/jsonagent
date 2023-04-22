const JSONAgent = require("./index");

(async function () {

    // state increment example
    const state = new JSONAgent({ x: 0 });

    for (let i = 0; i < 5; i++) {
        console.log(state.state);
        await state.transition("increment x")
    }

    // task list example
    const agent = new JSONAgent({
        tasks: [
            "Start a profitable business",
        ]
    });

    for (let i = 0; i < 5; i++) {
        console.log(agent.state);
        await agent.transition("Expand task list based on OLD_STATE")
    }
})();