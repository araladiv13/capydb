# Architecture Decision Records (ADR)

## Purpose

Architecture Decision Records (ADRs) document important architectural decisions
made during the development of CapyDB.

Each ADR explains:

- the problem being addressed
- the architectural decision
- the rationale behind the decision
- the expected consequences

ADRs provide historical context and help future contributors understand why a
decision was made.

---

## ADR Lifecycle

An ADR may have one of the following statuses:

| Status | Description |
|---------|-------------|
| Proposed | Decision is under discussion or implementation. |
| Accepted | Decision has been validated and adopted. |
| Superseded | Replaced by another ADR. |
| Deprecated | No longer recommended for new implementations. |

---

## Naming Convention

ADR files use sequential numbering.

Example:

```text
0001-project-vision.md
0002-roadmap.md
0003-pipeline-architecture.md
0004-canonical-data-contract.md
```

---

## Writing Guidelines

Each ADR should describe one architectural decision.

Recommended structure:

- Status
- Scope
- Context
- Decision
- Design Principles (optional)
- Example (optional)
- Consequences
- Revision History (optional)
- Non-Goals (optional)

---

## Implementation Rule

Implementation must follow accepted architectural decisions.

Architectural decisions should not emerge implicitly from implementation.

When implementation requires a new architectural decision, create a new ADR or
amend an existing ADR before changing the implementation.

---

## Amendment Rule

Existing ADRs may be amended when:

- the architectural scope remains unchanged
- the decision evolves without being replaced

Significant architectural changes should be documented in a new ADR instead of
rewriting an existing one.

---

## Review Process

Every ADR should be reviewed before implementation.

Implementation should follow the approved architectural decision.

When an implementation reveals the need for architectural changes,
the ADR should be amended or a new ADR should be created before
continuing implementation.

---

## Repository

Current ADRs:

| ADR | Title | Status |
|-----|-------|--------|
| ADR-0003 | Pipeline Architecture | Proposed |
| ADR-0004 | Canonical Data Contract | Proposed |

---

## Guiding Principle

Architecture first.

Documentation second.

Implementation third.

Testing always.

Continuous improvement forever.
