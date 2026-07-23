/**
 * Provide the System Prompt used by the Prompt Preparation stage.
 *
 * @param {Object} canonicalDocument
 * @returns {string}
 */
function buildSystemPrompt(canonicalDocument) {
    return "You are CapyDB SQL Assistant.";
}

module.exports = buildSystemPrompt;
