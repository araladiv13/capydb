# CapyDB Architecture

> High-level architecture of the CapyDB platform.

---

**Version** : 0.1.0

**Last Updated** : 2026-07-15

**Author** : Ikhwan Puji Indratno

---

# Overview

CapyDB is an AI-powered automation platform designed to help engineers understand, generate, and troubleshoot database operations.

The platform emphasizes transparency, traceability, and explainability throughout every execution.

This document describes the current architecture and the long-term architectural vision.

---

# Design Goals

The architecture is designed with the following objectives:

- Simple to understand
- Easy to extend
- Observable
- Explainable
- Production-oriented

---

# Current Architecture

At the current stage, CapyDB consists of a minimal development environment.

```text
                +----------------+
                |     User       |
                +--------+-------+
                         |
                         |
                         ▼
                 +---------------+
                 |      n8n      |
                 | Workflow      |
                 +-------+-------+
                         |
                         |
                         ▼
                    AI Services
                  (Future Integration)
```

Current components:

| Component | Purpose |
|----------|----------|
| Docker Compose | Local development environment |
| n8n | Workflow orchestration |
| Git | Source control |
| GitHub | Remote repository |
| Documentation | Project knowledge base |

---

# Future Architecture

The long-term vision expands the platform into multiple layers.

```text
                +----------------------+
                |      Engineers       |
                +----------+-----------+
                           |
                           ▼
                    Webhook / API
                           |
                           ▼
                  +----------------+
                  |      n8n        |
                  | Workflow Engine |
                  +--------+--------+
                           |
          +----------------+----------------+
          |                |                |
          ▼                ▼                ▼
     OpenAI API      PostgreSQL       File Storage
          |                |
          +--------+-------+
                   |
                   ▼
             Execution History
                   |
                   ▼
              Monitoring & Audit
```

---

# Core Components

## Workflow Engine

Responsible for orchestrating automation workflows.

Current implementation:

- n8n

Future:

- Multiple workflows
- Scheduling
- Retry mechanism
- Error handling

---

## AI Layer

Responsible for generating:

- SQL
- JQL
- Troubleshooting suggestions
- Documentation assistance

---

## Database Layer

Stores:

- Metadata
- Execution history
- Audit information
- Logs

---

## Observability

Every execution should produce:

- Request log
- Response log
- Execution duration
- Error details
- Workflow trace

This follows the Engineering Principles:

> Every Request Leaves a Trace.

> Every Event Must Be Explainable.

---

# Scalability

The architecture is designed to evolve incrementally.

Current Phase

Docker → n8n

↓

Future

Docker
→ n8n
→ PostgreSQL
→ OpenAI
→ Monitoring
→ Multi-database Support

---

# Related Documents

- engineering-principles.md
- roadmap.md
- adr/

---

# Summary

CapyDB starts with a simple architecture focused on learning and rapid iteration.

As the platform evolves, additional capabilities will be introduced while preserving simplicity, observability, and explainability.
