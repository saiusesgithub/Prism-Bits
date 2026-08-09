# Security Policy

The Prism-Bits team and community take security seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

## Supported Versions

Please ensure you are testing against the latest version. We currently provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Scope

The scope of this security policy covers:
- Core UI components within `src/` and `registry/`.
- The infrastructure tooling within `scripts/` and configuration files.
- Vulnerabilities leading to XSS, CSRF, or sensitive data exposure on the documentation site.

*Out of scope:*
- Issues related to third-party dependencies (unless Prism-Bits is misconfiguring them in a documented way).
- Volumetric Denial of Service (DoS) attacks against the documentation site.

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not disclose it publicly**.
Instead, we ask you to report it privately to the maintainers through GitHub:

1. Navigate to the [Security Advisories tab](https://github.com/saiusesgithub/Prism-Bits/security/advisories).
2. Click **Report a vulnerability**.
3. Provide a detailed description of the issue, steps to reproduce, and a potential fix if known.

### Response Timeline

- **Acknowledgment:** We aim to acknowledge receipt of your vulnerability report within **48 hours**.
- **Triage & Fix:** We will keep you updated as we triage the issue and develop a patch.
- **Disclosure:** We will publicly disclose the vulnerability (and credit you) once a patch has been rolled out to the community.

Thank you for helping keep Prism-Bits safe!
