# Security policy

## Supported versions

The latest `main` branch and the latest tagged release receive security fixes.

## Reporting a vulnerability

Please do not publish exploitable details in a public issue. Use the private security reporting flow on the [GitHub repository](https://github.com/llmpolska/llm-design-engine/security/advisories/new). Include affected package/version, reproduction steps, impact, and a safe contact path.

Never include API keys, personal data, or proprietary project artifacts in a report. Remove secrets from logs before sharing them.

## Provider safety

Keep `LDE_REASONING_API_KEY` and image-provider credentials in environment variables. The local mock/disabled modes are the recommended default for tests and CI. Generated prompts and artifacts may contain product-sensitive content; review `.design/` before publishing it.
