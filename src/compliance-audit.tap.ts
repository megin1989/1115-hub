#!/usr/bin/env -S deno run

import * as c from "./compliance.ts";

const gcb = new c.GovernedComplianceBuilder();
const { builders } = gcb;

await builders["Outcomes Management"].compliance(async function* (c) {
  yield c.ok("SCF Control ID: SYS.01 - Requirement #1234 completed");
  yield c.ok("SCF Control ID: SYS.02 - Requirement #1235 completed");
  yield c.notOk("SCF Control ID: SYS.03 - Requirement #1236 incomplete", {
    diagnostics: {
      "Audit Note":
        "Pending minor revisions. See comments in Jira ticket ABC-123",
      "Jira Ticket": "ABC-123",
    },
  });
});

await builders["Design and Development"].compliance(async function* (c) {
  yield c.ok("SCF Control ID: SYS.01 - Requirement #1234 completed");
  yield c.ok("SCF Control ID: SYS.02 - Requirement #1235 completed");
  yield c.notOk("SCF Control ID: SYS.03 - Requirement #1236 incomplete", {
    diagnostics: {
      "Audit Note":
        "Pending minor revisions. See comments in Jira ticket ABC-123",
      "Jira Ticket": "ABC-123",
      "Pull Request": new URL("https://github.com/repo/pull/789")
        .toString(),
    },
  });
});

console.log(gcb.tapContentText());
