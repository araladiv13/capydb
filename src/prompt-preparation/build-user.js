/**
 * Provide the User Prompt used by the Prompt Preparation stage.
 *
 * @param {Object} canonicalDocument - Canonical document defined by ADR-0004.
 * @returns {string} User prompt.
 */
function buildUserPrompt(canonicalDocument) {
    return canonicalDocument.request.question;
}

module.exports = buildUserPrompt;
