# GitHub Issues & Milestone Management Guide for AI Agents

This document serves as the mandatory protocol for all AI development agents working on the **SPENGO** project. To maintain a high level of project discipline and transparency, agents must strictly follow these workflows when interacting with the GitHub repository.

---

## 1. Context Initialization (Before Coding)
Before starting any task, the AI agent MUST:
1.  **Search & List Issues**: Use `mcp_github-mcp-server_search_issues` to see if the current task or related bugs already exist.
2.  **Identify Milestones**: Check for active milestones using `mcp_github-mcp-server_list_issues` (filtering by milestone) to understand where the current work fits into the broader roadmap.
3.  **Sync Status**: If an issue exists, read its comments to understand the current state and any previous attempts or blockers.

## 2. Issue Lifecycle & Hierarchical Management

### Phase A: Creation & Hierarchy
If no tracking issues exist for the current project:
- **Master Issue**: Create a high-level master parent issue for the entire project or objective.
- **Phase Issues**: Create parent tracking issues that group major milestones or phases together (e.g., `Phase 3`, `Phase 4`).
- **Granular Sub-Issues**: Break down tasks into *as many granular sub-issues as possible*. Create individual issues for each tiny step within a Phase.
- **Link Sub-Issues**: Use the `mcp_github-mcp-server_sub_issue_write` tool to officially link the granular sub-issues as children of their respective Phase Parent Issue.
- **Format**:
    - **Title**: `FEAT/FIX/CHORE: [Phase X] Short Description`
    - **Body**: Include a clear objective, a Markdown checklist (`- [ ]`) of what needs to be done, and reference the local `.md` implementation plan.
    - **Labels & Assignee**: Apply relevant labels and assign to the user (`Agoad1`).

### Phase B: Execution & The Hard Sync Rule
- **The Hard Sync Rule**: For *any* completed step or code change, the agent MUST simultaneously update multiple lists before moving forward:
    1. Check off the checklist item inside the GitHub Sub-Issue (by pulling the issue body, replacing `[ ]` with `[x]`, and calling `mcp_github-mcp-server_issue_write` with method `update`).
    2. Check off the checklist item inside the GitHub Parent/Phase Issue (by pulling the issue body, replacing `[ ]` with `[x]`, and calling `mcp_github-mcp-server_issue_write` with method `update`).
    3. Check off the checklist item inside the local markdown implementation plan `IMPLEMENTATION_[NAME].md`.
- **Branching/Commits**: If branching, use `feat/issue-ID-description`. Commits should reference `[#ISSUE_ID]`.

### Phase C: Completion
- **Auto-Commenting**: Upon completing a sub-issue, the agent MUST immediately leave a comment on the sub-issue detailing exactly what code changes were made to verify its completion.
- **Closing**: Immediately set the state of the completed issue to `closed` using `issue_write` (method update).
- **Phase/Master Roll-Up**: When all sub-issues in a Phase are closed, comment on and close the Phase Parent Issue. When all Phases are complete, proudly comment on and close the overall Master Issue.

## 3. Milestone Discipline
- **Alignment**: Every issue created should be assigned to an active Milestone.
- **Progression**: If a task completes a criteria for a Milestone, the agent should report on the Milestone's progress in the final issue comment.
- **Health Check**: Periodically check if older issues in the milestone are still relevant; if not, suggest closure or movement to a "Backlog" milestone.

## 4. Summary of Commands
- **Check Issues**: `search_issues(query="repo:Agoad1/spengowebsite [KEYWORD]")`
- **Create Issue**: `issue_write(method="create", title="...", body="...", labels=["..."])`
- **Link Sub-Issue**: `sub_issue_write(method="add", issue_number=PARENT_ID, sub_issue_id=CHILD_ID)`
- **Add Comment**: `add_issue_comment(issue_number=X, body="...")`
- **Update/Close**: `issue_write(method="update", issue_number=X, state="closed")`

---

**Note to Agent**: Discipline is key. Every task must be tracked with a clear ID and status on GitHub.
