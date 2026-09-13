# Contributing

Thank you for looking. Three kinds of contribution are useful here.

**Corrections.** A wrong clause number, a broken link, a YAML key that does not match the reference page. Open a pull request; `npm test` must pass.

**Mappings.** Additional columns mapping controls or criteria to another instrument: EU AI Act articles, NIST AI RMF subcategories, ISO/IEC 23894, national frameworks. Add the mapping as a new key on each item (for example `eu_ai_act: ["Art. 14"]`) and cite the instrument's edition in a comment at the top of the file. Please do not change the existing ISO/IEC 42001 or MAS FEAT mappings without opening an issue first; they mirror the deposited reference architecture.

**Translations.** Machine-readable files stay in English so keys match across forks; translations of the human-readable strings are welcome as a sibling file (`four-questions.ms.yaml`, `four-questions.ar.yaml`) with a `translated_by` and `reviewed_by` field at the top. Please only submit a translation that a native speaker has reviewed.

**What not to send.** Changes to the substance of a framework (a new dimension, a reworded criterion, a different verdict rule). Those happen on the reference page first, get a new version and a new Zenodo deposit, and are then mirrored here. Open an issue describing the change and why; it will be considered for the next version.

By contributing you agree that your contribution is licensed under the licence covering the file you changed (see `LICENSE.md`).
