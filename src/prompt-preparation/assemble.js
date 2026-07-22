/**
 * Assemble the Prompt into a new Canonical Document.
 *
 * @param {Object} canonicalDocument - Canonical document defined by ADR-0004.
 * @param {Object} prompt - Prompt object.
 * @returns {Object} Canonical document enriched with the prompt section.
 */
function assemblePrompt(canonicalDocument, prompt) {
    return {
        ...canonicalDocument,
        prompt
    };
}

module.exports = assemblePrompt;
