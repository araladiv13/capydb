# ADR-0004: Canonical Data Contract

- Status: Proposed
- Current Version: v1.1

---


## Revision History

| Date | Version | Description |
|------|---------|-------------|
| 2026-07-20 | v1 | Initial proposal |
| 2026-07-20 | v1.1 | Added `prompt` section to the canonical document and assigned ownership to Prompt Preparation |

---

## Scope

This ADR defines the canonical data contract shared by all workflow stages in
the CapyDB processing pipeline.

---

## Context

CapyDB is implemented as a pipeline of independent workflow stages.

Each workflow stage has a single responsibility and communicates with downstream
stages by enriching a shared canonical JSON document.

Without a well-defined canonical data contract:

- stages become tightly coupled
- downstream nodes depend on implementation details
- introducing new databases or AI providers becomes difficult
- maintenance cost increases over time

To support scalability, maintainability, and extensibility, every workflow stage
must enrich the canonical JSON document rather than replace or recreate it.

---

## Decision

CapyDB adopts a canonical JSON document that flows through every workflow stage.

Each stage has a single responsibility and owns exactly one section of the document.

Workflow stages may enrich their own section only and must preserve data produced
by previous stages.

This contract is independent from:

- transport protocol
- database platform
- query language
- AI provider

This decision enables CapyDB to support multiple database platforms, query
languages, and AI providers without changing the overall pipeline architecture.

---

## Canonical Structure

```json
{
  "metadata": {
    "traceId": "...",
    "receivedAt": "..."
  },

  "request": {},

  "validation": {},

  "context": {},

  "prompt": {},

  "generation": {},

  "execution": {},

  "response": {}
}
```

---

## Section Ownership

Each section of the canonical document has a single owner.

A workflow stage may read any section created by previous stages, but it may only
write to the section it owns.

| Workflow Stage | Owns |
|----------------|------|
| Receive | metadata, request |
| Input Validation | validation |
| Context Preparation | context |
| Prompt Preparation | prompt |
| AI Generation | generation |
| Execution Decision | execution |
| Response | response |


---

## Design Principles

### Single Ownership

Every section has exactly one owner.

Ownership must never overlap between workflow stages.

---

### Append-only Flow

Workflow stages enrich the canonical document.

They must not remove or overwrite information produced by previous stages.

---

### Transport Independence

The canonical document must remain independent from transport protocols.

Only the Receive stage understands transport-specific payloads.

---

### AI Independence

The canonical document must not depend on any specific AI provider.

Changing AI providers must not require changing the document structure.

---

## Example

Example document after Prompt Preparation.

```json
{
  "metadata": {
    "traceId": "25",
    "receivedAt": "2026-07-20T14:21:32+07:00"
  },

  "request": {
    "question": "Show active accounts"
  },

  "validation": {
    "valid": true,
    "errors": []
  },

  "context": {
    "target": {
      "platform": "postgresql",
      "language": "sql",
      "schemaVersion": "v1"
    },
    "capabilities": {
      "allowRead": true,
      "allowWrite": false,
      "allowDDL": false
    }
  },
  
  "prompt": {
    "version": "v1",
    "system": "You are an SQL generation assistant.",
    "user": "Generate a read-only PostgreSQL SQL query for: Show active accounts."
  },

  "generation": {},

  "execution": {},

  "response": {}
}
```

---

## Consequences

Benefits

- consistent workflow contracts
- simpler debugging
- easier testing
- independent workflow stages
- easier support for multiple database platforms
- easier support for multiple AI providers

Trade-offs

- larger JSON document
- additional implementation discipline
- every new workflow stage must follow the ownership rules

---

## Future Extensions

The canonical document is intentionally extensible.

Future workflow stages may introduce additional sections without modifying
existing ownership rules.

Examples include:

- retrieval
- audit
- observability
- metrics
- cache

New sections must define:

- owner
- responsibility
- data schema
- downstream consumers

before implementation.

---

## Change Control

Changes to the canonical data contract must be introduced through a new ADR
or an update to this ADR.

Workflow implementations must follow the approved contract.

The canonical contract must not evolve implicitly through implementation changes.

Implementation changes that require contract modifications must be preceded by
an architectural decision.

---

## Non-Goals

This ADR does not define:

- prompt engineering
- AI model selection
- execution strategy
- response formatting

These concerns are addressed by separate ADRs.
