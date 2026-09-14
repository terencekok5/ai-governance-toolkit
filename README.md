# AI Governance Toolkit

Machine-readable versions of the AI governance frameworks published at [terencekok.com/frameworks](https://terencekok.com/frameworks/) and the control set from the [Governed Agentic RAG reference architecture](https://terencekok.com/research/reference-architectures/governed-agentic-rag/). The prose versions carry registered DOIs on Zenodo; this repository is the form you can drop into a governance register, a policy engine, a CI check or a procurement template.

Everything here is versioned in step with the reference pages. When a framework version changes on the site, the YAML here changes with it and the change is logged in `CHANGELOG.md`.

## What is in the box

| Path | What it is | Use it for |
|---|---|---|
| `frameworks/readiness/` | Five-Dimension AI Readiness Assessment: dimensions, 1 to 4 scale, min-score verdict rule, score descriptors; scoring template CSV | Pre-budget triage of an AI initiative |
| `frameworks/trace/` | TRACE criteria for agent task evaluation, risk tiers, decision rule; task inventory template CSV | Deciding which tasks an agent may take on, before vendor or architecture decisions |
| `frameworks/governance-baseline/` | The four governance questions with acceptable and unacceptable answers and required evidence; AI deployment register CSV | A board or audit-committee register of every AI deployment |
| `reference-architecture/governed-agentic-rag/` | 16 controls (A1 to E4) mapped to ISO/IEC 42001:2023 and MAS FEAT; task state machine; example policy rules; risk register; operating metrics; basis trace to NIST, OWASP, ISO, MAS, IMDA and CSA sources | Designing or auditing an agentic RAG deployment |
| `schemas/` | JSON Schema for the task envelope (control B2) with a validated example | Enforcing the envelope in code |

## Quick start

```bash
npm install
npm test          # parses every YAML file, validates the example envelope, cross-checks control ids
```

Load a framework in your own tooling:

```js
import { parse } from 'yaml';
import { readFileSync } from 'node:fs';
const trace = parse(readFileSync('frameworks/trace/trace-criteria.yaml', 'utf8'));
const failed = trace.criteria.filter(c => !myScores[c.id]);
if (failed.length >= 2) console.log('hold:', trace.decision_rule.hold);
```

## Provenance

| Artefact | Version | DOI |
|---|---|---|
| Five-Dimension AI Readiness Assessment | 1.1 | [10.5281/zenodo.22722215](https://doi.org/10.5281/zenodo.22722215) |
| TRACE Framework | 1.1 | [10.5281/zenodo.22722217](https://doi.org/10.5281/zenodo.22722217) |
| Four-Question AI Governance Baseline | 1.1 | [10.5281/zenodo.22722219](https://doi.org/10.5281/zenodo.22722219) |
| Governed Agentic RAG: Reference Architecture | 1.0 | [10.5281/zenodo.22727449](https://doi.org/10.5281/zenodo.22727449) |

The frameworks are the author's own; the reference architecture answers each design question from published best practice, and `basis.yaml` traces every rule to its source. Author identifiers: ORCID [0009-0000-9204-6943](https://orcid.org/0009-0000-9204-6943), Wikidata [Q141449389](https://www.wikidata.org/wiki/Q141449389).

## Citing

See `CITATION.cff`. For the frameworks themselves, cite the DOI of the deposited brief; for the machine-readable form, cite this repository and the commit.

## Licence

See `LICENSE.md`. The machine-readable framework and architecture content in this repository is **CC BY 4.0**, so it can be used in commercial governance programmes and products with attribution; the schema and scripts are Apache-2.0. The prose reference pages and Zenodo briefs keep their own licence (CC BY-NC 4.0).

## Contributing

Corrections, mappings to further standards (EU AI Act articles, NIST AI RMF subcategories, ISO/IEC 23894) and translations are welcome. See `CONTRIBUTING.md`. Changes to the substance of a framework are made on the reference page first and mirrored here, so open an issue for those rather than a pull request.

## Author

Terence Kok, Executive Director, AI Governance & Assurance Practice, Orion Five Engineering. [terencekok.com](https://terencekok.com) · [LinkedIn](https://www.linkedin.com/in/terence-kok-waichuen/)

The views and frameworks here are personal and do not speak for any employer or client.
