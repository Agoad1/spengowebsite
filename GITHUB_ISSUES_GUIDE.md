# GitHub Issues & Milestone Management Guide for AI Agents

This document serves as the mandatory protocol for all AI development agents working on the **SPENGO** project. To maintain a high level of project discipline and transparency, agents must strictly follow these workflows when interacting with the GitHub repository.

---

## 1. Context Initialization (Before Coding)
Before starting any task, the AI agent MUST:
1.  **Search & List Issues**: Use `mcp_github-mcp-server_search_issues` to see if the current task or related bugs already exist.
2.  **Identify Milestones**: Check for active milestones using `mcp_github-mcp-server_list_issues` (filtering by milestone) to understand where the current work fits into the broader roadmap.
3.  **Sync Status**: If an issue exists, read its comments to understand the current state and any previous attempts or blockers.

## 2. Issue Lifecycle Management

### Phase A: Creation
If no tracking issue exists for the current task:
- **Requirement**: Create a new issue *before* writing any code.
- **Format**:
    - **Title**: `FEAT/FIX/CHORE: Short Description` (e.g., `FEAT: Implement Search Overlay UI`)
    - **Body**: Include a clear objective, a checklist of sub-tasks, and reference any relevant implementation files (e.g., `IMPLEMENTATIONS_UPGRADESV5.md`).
    - **Labels**: Apply relevant labels (e.g., `enhancement`, `bug`, `documentation`).
    - **Assignee**: Assign to the current user (e.g., `Agoad1`).

### Phase B: Execution (During Work)
- **Branching**: Specific branches should be created for the issue.
    - *Naming Convention*: `feat/issue-ID-short-description` or `fix/issue-ID-short-description`.
- **Commits**: All commit messages must reference the issue ID.
    - *Format*: `[#ISSUE_ID] Commit message` (e.g., `[#12] Add responsive styles to header`)
- **Progress Reporting**: For tasks taking more than 15 minutes or involving multiple files, the agent MUST add a comment to the issue summarizing progress (e.g., "Updated navbar styling; moving to search logic implementation").

### Phase C: Completion
- **Verification**: Once the task is complete and verified, the agent MUST update the issue.
- **Closing**: Use `mcp_github-mcp-server_issue_write` to set the state to `closed`.
- **Final Summary**: Leave a final comment with the outcome, including any new files created or URLs affected.

## 3. Milestone Discipline
- **Alignment**: Every issue created should be assigned to an active Milestone.
- **Progression**: If a task completes a criteria for a Milestone, the agent should report on the Milestone's progress in the final issue comment.
- **Health Check**: Periodically check if older issues in the milestone are still relevant; if not, suggest closure or movement to a "Backlog" milestone.

## 4. Summary of Commands
- **Check Issues**: `search_issues(query="repo:Agoad1/spengowebsite [KEYWORD]")`
- **Create Issue**: `issue_write(method="create", title="...", body="...", labels=["..."])`
- **Add Comment**: `add_issue_comment(issue_number=X, body="...")`
- **Update/Close**: `issue_write(method="update", issue_number=X, state="closed")`

---

**Note to Agent**: Discipline is key. Every task must be tracked with a clear ID and status on GitHub.
