# Contributing

We welcome contributions from the community. Here's how you can help:

## Suggest a Project

The easiest way to suggest a project is to [open an issue](https://github.com/EvoMap/awesome-agent-swarm/issues/new?template=project-submission.yml) using the project submission template.

## Criteria for Inclusion

Projects should meet the following criteria:

- **Relevant**: Directly related to multi-agent swarm systems, swarm orchestration, agent communication protocols, swarm intelligence, task decomposition, role-based agent teams, or swarm safety
- **Active**: Has received commits within the last 6 months
- **Open source**: Source code is publicly available
- **Documented**: Has a README with clear description and usage instructions
- **Minimum traction**: At least 50 GitHub stars (exceptions for novel/unique projects)

## Submit a Pull Request

1. Fork this repository
2. Add the project to `data/projects.json` following the schema below
3. Run `node scripts/generate-readme.js` to regenerate the README
4. Run `node scripts/validate.js` and `node scripts/check-links.js`
5. Submit a pull request with a brief description of the project and why it belongs in this list

## Scope and Cross-List Entries

This list focuses on multi-agent coordination, swarm execution, orchestration, communication, collective intelligence, role-based teams, task decomposition, and swarm safety. Self-evolution and persistent memory systems without a meaningful multi-agent coordination focus should normally be submitted to [awesome-agent-evolution](https://github.com/EvoMap/awesome-agent-evolution).

A project may appear in both lists only when it makes a substantial, independently relevant contribution to both scopes. Explain that contribution in the pull request; popularity alone is not a reason for duplicate inclusion.

## Curation Standard

Meeting the minimum checks does not guarantee inclusion. Maintainers also review technical relevance, evidence for claims, maintenance quality, licensing, documentation, distinctiveness, and whether the description is objective. Discovery scripts produce candidates for human review and never imply endorsement.


Each entry in `data/projects.json` should follow this format:

```json
{
  "name": "Project Name",
  "repo": "owner/repo",
  "description": "One-line description of the project",
  "category": "frameworks|orchestration|communication|intelligence|role-teams|task-decomposition|swarm-coding|safety|community",
  "maintainer": "github-username",
  "tags": ["tag1", "tag2", "tag3"],
  "stars": 0,
  "paper": "https://arxiv.org/abs/... (optional)"
}
```

### Categories

| Category | Description |
|----------|-------------|
| `frameworks` | Core frameworks for building and managing agent swarms |
| `orchestration` | Orchestration engines, workflow builders, and pipeline systems |
| `communication` | Agent-to-Agent protocols, MCP, and inter-agent messaging standards |
| `intelligence` | Swarm intelligence, emergent behavior, and collective reasoning |
| `role-teams` | Frameworks organizing agents into specialized roles |
| `task-decomposition` | Systems for breaking complex tasks into swarm-executable subtasks |
| `swarm-coding` | Agent swarms applied to software engineering |
| `safety` | Guardrails, governance, and policy engines for agent swarms |
| `community` | Community resources, learning materials, and surveys |

### Tags

Use 2-3 descriptive tags per project. Reuse existing tags where possible:

`multi-agent` `orchestration` `swarm` `a2a` `mcp` `role-playing` `collaborative`
`production-ready` `enterprise` `lightweight` `research` `open-source`

## Research Papers

To suggest a research paper, either:
1. Open an issue describing the paper and its contribution
2. Submit a PR adding the paper to the appropriate table in README.md

Papers should be:
- Published in a recognized venue (top conferences, journals, or notable arXiv preprints)
- Directly related to multi-agent systems, swarm intelligence, agent communication, or collaborative AI
- Accompanied by a one-line description of the key contribution

## Scripts

| Script | Purpose |
|--------|---------|
| `node scripts/generate-readme.js` | Regenerate README.md from projects.json |
| `node scripts/update-stars.js` | Fetch latest star counts from GitHub |
| `node scripts/check-links.js` | Validate all repository links |
| `bash scripts/search-repos.sh [query]` | Search GitHub for relevant projects |

## Code of Conduct

Be respectful. Provide constructive feedback. Help build a useful resource for the AI Agent community.
