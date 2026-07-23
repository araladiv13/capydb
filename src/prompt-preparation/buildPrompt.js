const assemblePrompt = require("./assemblePrompt");
const buildSystemPrompt = require("./buildSystemPrompt");
const buildUserPrompt = require("./buildUserPrompt");
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

module.exports = buildPrompt;
