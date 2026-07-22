const getPromptVersion = require("../../src/prompt-preparation/version");

describe("getPromptVersion", () => {
    test("returns a string", () => {
        expect(typeof getPromptVersion()).toBe("string");
    });

    test("returns version v1", () => {
        expect(getPromptVersion()).toBe("v1");
    });
});
