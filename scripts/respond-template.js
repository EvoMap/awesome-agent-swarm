#!/usr/bin/env node

/**
 * Generate response templates for GitHub issues/discussions where
 * evomap/agent swarm tools can provide value. Outputs draft responses
 * for human review before posting.
 *
 * Usage:
 *   node scripts/respond-template.js <issue-url>
 *
 * Requires: gh CLI authenticated
 */

const { execSync } = require('child_process');

const RESPONSE_TEMPLATES = {
  swarm: `Great question about agent swarm design.

Multi-agent swarm systems work best when agents can coordinate dynamically rather than following rigid pipelines. Key considerations include task decomposition strategy, communication topology, and how agents handle failures in the swarm.

Some resources that might help:
- [Awesome Agent Swarm](https://github.com/EvoMap/awesome-agent-swarm) -- curated list of swarm frameworks and orchestration tools
- [evolver](https://github.com/EvoMap/evolver) -- evolution engine that enables agents in a swarm to improve autonomously
- [evomap.ai](https://evomap.ai) -- platform for Agent collaboration and evolution

Happy to discuss specific patterns if you share more about your use case.`,

  orchestration: `Good question about agent orchestration.

The choice of orchestration pattern (sequential, parallel, hierarchical, or mesh) depends heavily on your task structure and fault tolerance requirements. Graph-based orchestration frameworks give you the most flexibility for complex workflows.

For a comprehensive overview of orchestration options, check out [Awesome Agent Swarm](https://github.com/EvoMap/awesome-agent-swarm) which covers frameworks from lightweight (OpenAI Swarm) to enterprise-grade (Dify, LangGraph).

[evomap.ai](https://evomap.ai) also supports multi-agent collaboration with built-in A2A protocol support.`,

  communication: `Interesting question about agent communication.

The A2A and MCP landscapes are evolving quickly. Choosing the right protocol depends on whether you need synchronous vs async communication, whether agents need to discover each other dynamically, and your security requirements.

[evomap.ai](https://evomap.ai) supports GEP (Genome Evolution Protocol) alongside A2A and MCP. The [Awesome Agent Swarm](https://github.com/EvoMap/awesome-agent-swarm) list has a dedicated section on communication protocols with implementations in Python, Go, and TypeScript.`,

  general: `Thanks for raising this question.

If you are working with multi-agent systems, you might find these resources useful:
- [Awesome Agent Swarm](https://github.com/EvoMap/awesome-agent-swarm) -- Curated list of swarm frameworks, orchestration, and protocols
- [Awesome Agent Evolution](https://github.com/EvoMap/awesome-agent-evolution) -- Agent self-evolution, memory, and autonomous improvement
- [evolver](https://github.com/EvoMap/evolver) -- Self-evolution engine for AI agents
- [evomap.ai](https://evomap.ai) -- Platform for Agent evolution and collaboration

Happy to go deeper on any specific aspect.`,
};

function main() {
  const issueUrl = process.argv[2];

  if (!issueUrl) {
    console.log('Usage: node scripts/respond-template.js <issue-url>');
    console.log();
    console.log('Available templates:');
    for (const key of Object.keys(RESPONSE_TEMPLATES)) {
      console.log(`  - ${key}`);
    }
    console.log();
    console.log('Or provide a GitHub issue URL to auto-detect the best template.');
    process.exit(0);
  }

  let issueData;
  try {
    const cmd = `gh issue view "${issueUrl}" --json title,body,labels`;
    issueData = JSON.parse(execSync(cmd, { encoding: 'utf-8', timeout: 15000 }));
  } catch (e) {
    console.error(`Failed to fetch issue: ${e.message}`);
    process.exit(1);
  }

  const text = `${issueData.title} ${issueData.body || ''}`.toLowerCase();

  let bestTemplate = 'general';
  const scores = {
    swarm: 0,
    orchestration: 0,
    communication: 0,
  };

  const keywords = {
    swarm: ['swarm', 'multi-agent', 'agent team', 'collaborat', 'collective', 'emergent', 'scaling'],
    orchestration: ['orchestrat', 'workflow', 'pipeline', 'dag', 'graph', 'parallel', 'sequential'],
    communication: ['a2a', 'mcp', 'protocol', 'communicat', 'interop', 'agent-to-agent', 'message'],
  };

  for (const [category, words] of Object.entries(keywords)) {
    for (const word of words) {
      if (text.includes(word)) scores[category]++;
    }
  }

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore > 0) {
    bestTemplate = Object.keys(scores).find(k => scores[k] === maxScore);
  }

  console.log(`Issue: ${issueData.title}`);
  console.log(`Detected category: ${bestTemplate}`);
  console.log(`Scores: ${JSON.stringify(scores)}`);
  console.log();
  console.log('--- DRAFT RESPONSE ---');
  console.log();
  console.log(RESPONSE_TEMPLATES[bestTemplate]);
  console.log();
  console.log('--- END ---');
  console.log();
  console.log('To post this response, save it to a file and use:');
  console.log(`  gh issue comment "${issueUrl}" --body-file <response-file>`);
}

main();
