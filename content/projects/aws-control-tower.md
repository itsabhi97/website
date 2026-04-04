---
title: "AWS Control Tower Implementation"
date: "2023-05-01"
desc: "Implementation of AWS Control Tower landing zone for centralised multi-account governance for an integration and digital transformations company."
tags: ["AWS", "Terraform", "DevOps", "Compliance"]
---

### Overview
For a company working in integration and digital transformations, I implemented an AWS Control Tower landing zone for centralised multi-account governance.

### Key Contributions
- Deployed scalable multi-account architecture with structured organisational units and governance frameworks.
- Executed staged enrollment of existing AWS accounts while preserving historical compliance data and resolving resource conflicts.
- Optimised CloudFormation templates and CDK scripts for Control Tower compatibility, replacing manual processes with Infrastructure as Code.
- Implemented compliance framework aligned with AWS CIS Benchmark using Control Tower guardrails and Config Conformance Packs.
- Developed custom Service Control Policies (SCPs) enforcing mandatory resource tagging for improved cost allocation and governance.
- Enhanced database security by integrating RDS deployments with AWS Secrets Manager, eliminating hardcoded credentials.
