# ADR-0005: AI Prompt Construction

- Status: Proposed
- Current Version: v1.0

---

## Revision History

| Date | Version | Description |
|------|---------|-------------|
| 2026-07-21 | v1.0 | Initial proposal |

---

## Scope

This ADR defines how Prompt Preparation constructs prompts for AI Generation
within the CapyDB processing pipeline.

---

## Context

CapyDB uses a multi-stage processing pipeline where each workflow stage has a
single responsibility.

ADR-0004 defines the canonical data contract and assigns ownership of the
`prompt` section to the Prompt Preparation stage.

However, the canonical contract does not define how prompts should be
constructed before they are consumed by AI Generation.

Without a consistent prompt construction strategy:

- prompt generation may vary between implementations
- AI Generation may become responsible for prompt construction
- prompt behavior becomes difficult to reproduce
- testing and debugging become more difficult
- changing AI providers may require workflow modifications

To maintain a deterministic, testable, and provider-independent pipeline,
prompt construction requires an architectural decision.

---

## Decision

Prompt Preparation is responsible for constructing the complete prompt used by
AI Generation.

AI Generation consumes the prompt produced by Prompt Preparation without
modifying its semantic content.

Prompt construction must be:

- deterministic
- provider-independent
- reproducible
- immutable after construction

The prompt becomes part of the canonical data contract defined by ADR-0004 and
is stored in the `prompt` section.

This decision separates prompt construction from AI invocation, allowing prompt
generation and AI execution to evolve independently.

---

## Design Principles

### Single Responsibility

Prompt Preparation is solely responsible for constructing prompts.

AI Generation consumes the completed prompt and must not take responsibility
for constructing or restructuring it.

---

### Deterministic Construction

Given the same canonical input and prompt version, Prompt Preparation should
produce the same prompt structure and semantic content.

This enables predictable testing, debugging, and reproduction of AI interactions.

---

### Provider Independence

Prompt construction must remain independent from any specific AI provider or
model.

Changing the AI provider must not require changes to the responsibility or
contract of Prompt Preparation.

---

### Prompt Immutability

Once Prompt Preparation completes construction, downstream workflow stages must
not modify the semantic content of the prompt.

The constructed prompt represents the exact AI input prepared for the
corresponding processing request.

---

### Versioned Evolution

Prompt construction must be explicitly versioned.

Changes to prompt behavior should be identifiable through the prompt version so
that AI interactions can be reproduced and compared across prompt revisions.

---

## Prompt Structure

The prompt consists of two logical components:

- `system` — defines the role, behavioral constraints, and generation rules
- `user` — represents the user request enriched with the relevant canonical context

The prompt structure must remain independent from the message or request format
required by any specific AI provider.

Prompt Preparation derives prompt content from canonical sections produced by
previous workflow stages, including:

- request
- validation
- context

Prompt Preparation must not modify those source sections while constructing the
prompt.

---

## Example

The following example illustrates the logical structure of the prompt section
defined by this ADR.

```json
{
  "prompt": {
    "version": "v1",
    "system": "...",
    "user": "..."
  }
}
```

The example illustrates the logical structure of the canonical `prompt`
section and does not prescribe any provider-specific message format.

The content of each prompt component is implementation-specific and therefore
outside the scope of this ADR.

---

## Consequences

Adopting this decision results in the following architectural consequences:

- Prompt Preparation becomes independently testable.
- AI Generation is responsible only for consuming prompts and generating
  responses.
- Prompt construction can evolve independently from AI provider integration.
- Prompt versions enable reproducibility and comparison across prompt revisions.
- The separation of responsibilities improves maintainability and reduces
  coupling between workflow stages.

---

## Non-Goals

This ADR intentionally does not define:

- the wording of system or user prompts
- prompt engineering techniques
- provider-specific request or message formats
- AI model selection or configuration
- AI invocation mechanisms
- token optimization strategies

---

## References

This ADR builds upon the following architectural decisions:

- ADR-0003: Pipeline Architecture
- ADR-0004: Canonical Data Contract
