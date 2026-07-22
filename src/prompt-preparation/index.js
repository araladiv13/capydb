const assemblePrompt = require("./assemble");
const buildSystemPrompt = require("./build-system");
const buildUserPrompt = require("./build-user");
const getPromptVersion = require("./version");

function buildPrompt(canonicalDocument) {
    const system = buildSystemPrompt(canonicalDocument);
    const user = buildUserPrompt(canonicalDocument);
    const version = getPromptVersion();

    const prompt = {
        version,
        system,
        user
    };

    return assemblePrompt(canonicalDocument, prompt);
}

module.exports = {
    buildPrompt
};
