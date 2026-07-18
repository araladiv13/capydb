# ADR-0003: AI Processing Pipeline

**Status**: Proposed

**Date**: 2026-07-18

## Related Decisions

This decision builds upon:

- ADR-0001: Project Vision
- ADR-0002: Observable and Traceable Processing Pipeline

## Context

CapyDB aims to transform natural language questions into structured queries such as SQL and JQL.

Large Language Models (LLMs) provide powerful capabilities for interpreting natural language and generating structured outputs. However, AI should not become the central controller of the application.

Without clear architectural boundaries, AI components can become tightly coupled with workflow logic, making the system difficult to understand, test, maintain, and evolve.

CapyDB requires an architecture where AI participates as one processing stage within a larger observable processing pipeline.

The architecture should clearly define:

- What information is provided to AI.
- What AI is responsible for.
- What AI is not responsible for.
- How AI outputs are validated.
- How AI interactions participate in system observability.

This decision builds upon the observable processing pipeline established in ADR-0002 and defines how AI integrates into that pipeline while preserving clear architectural boundaries.

## Decision

CapyDB will treat AI Generation as one processing stage within the overall application pipeline rather than the central controller of the application.

The processing flow is:

```text
Receive
    │
    ▼
Input Validation
    │
    ▼
Context Preparation
    │
    ▼
AI Generation
    │
    ▼
Output Validation
    │
    ▼
Execution Decision
    │
    ▼
Response
```

Each processing stage has a clearly defined responsibility and communicates with the next stage through structured data contracts.

AI Generation is responsible for producing candidate structured outputs based on prepared context. Final execution decisions remain under system control rather than AI control.

This architecture promotes clear separation of responsibilities, predictable system behavior, and independent evolution of processing stages.

## Responsibilities

### Receive

Responsible for:

- Receiving incoming requests
- Creating a Trace ID
- Recording request metadata

Not responsible for:

- Understanding business intent
- Generating SQL or JQL

Input

- HTTP request

Output

- Request metadata with Trace ID

---

### Input Validation

Responsible for:

- Validating required fields
- Validating request structure
- Performing basic security validation

Not responsible for:

- Loading database schema
- Constructing AI prompts
- Generating structured queries

Input

- Request metadata

Output

- Validated request

---

### Context Preparation

Responsible for:

- Preparing AI context
- Loading prompt templates
- Loading database metadata
- Loading policies
- Building structured AI input

Not responsible for:

- Executing AI
- Executing database queries
- Making execution decisions

Input

- Validated request

Output

- Prepared AI context

---

### AI Generation

Responsible for:

- Producing candidate SQL
- Producing candidate JQL
- Providing explanations
- Returning structured outputs

Not responsible for:

- Executing database queries
- Authorizing requests
- Bypassing system policies

Input

- Prepared AI context

Output

- Candidate structured output

---

### Output Validation

Responsible for:

- Validating output schema
- Validating policies
- Validating safety rules
- Rejecting invalid outputs

Not responsible for:

- Regenerating AI outputs
- Executing queries

Input

- Candidate structured output

Output

- Approved or rejected output

---

### Execution Decision

Responsible for:

- Approving execution
- Rejecting execution
- Selecting execution mode

Not responsible for:

- Generating SQL
- Modifying AI responses

Input

- Validated output

Output

- Execution decision

## Data Contracts

Communication between processing stages should use structured JSON objects rather than unstructured text.

### Context Preparation Output

```json
{
  "traceId": "CAPY-20260718-00001",
  "database": "PostgreSQL",
  "schemaVersion": "v1",
  "question": "Show active accounts",
  "policies": [
    "SELECT only"
  ]
}
```

### AI Generation Output

```json
{
  "traceId": "CAPY-20260718-00001",
  "language": "SQL",
  "query": "SELECT * FROM ACCOUNT;",
  "confidence": 0.94,
  "warnings": [],
  "explanation": "Retrieve all active accounts."
}
```

### Output Validation Result

```json
{
  "traceId": "CAPY-20260718-00001",
  "approved": true,
  "reason": "",
  "executionMode": "RETURN_ONLY"
}
```

The examples illustrate the logical structure of the data exchanged between stages. Additional operational metadata may be included without changing the contract.

Structured data contracts reduce coupling between processing stages and allow each stage to evolve independently while maintaining a stable interface.

## Prompt Strategy

Prompt construction is the responsibility of the Context Preparation stage.

Rather than embedding prompts directly within workflow definitions, CapyDB should assemble prompts from reusable and version-controlled components.

Typical prompt components include:

- System instructions
- Safety policies
- Database-specific guidance
- Output format requirements
- User question

A conceptual prompt structure is:

```text
System Prompt
        +
Safety Policy
        +
Database Prompt
        +
Output Format
        +
User Question
```

Prompt templates should be maintained alongside the application source code and version-controlled using Git.

Separating prompt management from workflow logic improves maintainability, consistency, testing, and future evolution of AI behavior.

## AI Independence

CapyDB should remain independent of any specific AI provider or model.

The AI Generation stage should expose a stable interface to the rest of the processing pipeline regardless of whether the implementation uses:

- OpenAI
- Anthropic
- Google Gemini
- Local LLMs
- Future AI providers

Replacing the underlying AI implementation should not require changes to the surrounding processing stages, provided the data contracts remain consistent.

This architectural separation reduces vendor lock-in and supports future evolution of the platform.

## Observability

AI Generation participates in the observable processing pipeline defined in ADR-0002.

Each AI interaction should generate observable execution events including:

- Trace ID
- Event ID
- Processing stage
- Model identifier
- Prompt version
- Processing duration
- Execution status
- Validation outcome

Sensitive prompt content and generated artifacts must follow the protection principles defined in ADR-0002.

CapyDB records observable execution artifacts rather than private internal AI reasoning.

## Consequences

Benefits of this decision include:

- Clear architectural boundaries
- Independent evolution of processing stages
- Reduced vendor lock-in
- Better maintainability
- Improved observability
- Easier testing and validation

Trade-offs include:

- Additional processing stages
- More explicit data contracts
- Increased architectural documentation
- Additional validation responsibilities

The additional complexity is accepted because predictable, observable, and maintainable AI behavior is considered a fundamental capability of CapyDB.

## Future Considerations

Future enhancements may include:

- Multiple AI providers
- AI routing strategies
- Prompt version management
- Confidence-based execution policies
- Human approval workflows
- Retrieval-Augmented Generation (RAG)
- Semantic caching
- Domain-specific AI agents
- Model evaluation and benchmarking

These capabilities should be introduced incrementally while preserving the architectural principles established in this decision.
