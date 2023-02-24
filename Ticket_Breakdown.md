# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

| <!-- --> | <!-- --> |
|---|---|
| **ID** | TSK-01 |
| **Title** | [BACKEND] Add a nullable `custom_id` field for the `Agents` model |
| **Description**  | Updates our API to store this optional value. Adding a new `string(255)` field to the `agents` table. |
| **Weight**  | 2 (fibonacci) |
| **Acceptance criteria**  | The model for the `agents` table allows setting a `custom_id` property, and the `getShiftsByFacility` function returns the new id. |

| <!-- --> | <!-- --> |
|---|---|
| **ID** | TSK-02 |
| **Title** | [BACKEND] Use `custom_id` field when generating agents reports |
| **Description**  | Follow up from #TSK-01. Using the new `custom_id` field for generating reports when available instead of the former `id` field. |
| **Weight**  | 3 |
| **Acceptance criteria**  | The `generateReport` function uses the `custom_id` field instead of `id` |
| **User stories**  | AS a user, I want to see custom IDs when generating agent reports to identify agents better. |

| <!-- --> | <!-- --> |
|---|---|
| **ID** | TSK-03 |
| **Title** | [FRONTEND] Add field to store an agent custom id |
| **Description**  | Follow up from #TSK-01. Send a `string(255)` value into the `custom_id` field for the agent details form. |
| **Weight**  | 3 |
| **Acceptance criteria**  | The agent details form has a new `Custom ID` field mapped to the `custom_id` property. |
| **User stories**  | AS a user, I want to save the custom id for an agent so the value is available throughout the application. |
