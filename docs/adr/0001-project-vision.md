# ADR 0001 — Why CapyDB Exists

> Establish the vision and engineering direction of CapyDB.

---

**Status** : Accepted

**Date** : 2026-07-15

**Author** : Ikhwan Puji Indratno

---

# Context

Engineers working with database systems often rely on multiple disconnected tools to investigate issues, generate queries, analyze logs, and troubleshoot operational problems.

As systems become more complex, understanding what happened, why it happened, and how to resolve it becomes increasingly difficult.

Although AI can assist in generating SQL or other technical artifacts, accurate output alone is not sufficient. Engineers also need confidence in the execution process through transparency, traceability, and explainability.

CapyDB is initiated to address these challenges by combining AI, automation, and engineering best practices into a unified platform.

---

# Decision

CapyDB will be developed as an AI-powered engineering platform focused on database operations.

The platform will emphasize not only automation, but also engineering principles that make every execution understandable, traceable, explainable, and security-aware.

The long-term direction of CapyDB extends beyond SQL generation toward operational intelligence and engineering assistance.

---

# Rationale

This decision aligns with the project's engineering philosophy.

CapyDB is designed around the following principles:

- Explainability
- Traceability
- Observability
- Security Awareness
- Engineering Simplicity

These principles provide a consistent foundation for future architectural and implementation decisions.

---

# Consequences

## Positive

- Establishes a clear long-term vision.
- Provides a foundation for future architecture decisions.
- Aligns documentation and implementation under a common engineering philosophy.
- Encourages explainable and secure automation.

## Negative

- Broadens the project scope beyond SQL generation.
- Requires additional architectural planning before implementation.
- May increase development time as the platform evolves.

---

# Related Documents

- README.md
- engineering-principles.md
- architecture.md
- roadmap.md

---

# Engineering Statement

CapyDB is guided by four engineering beliefs:

- Every request leaves a trace.
- Every event must be explainable.
- Every execution tells a story.
- Every automation respects security.
