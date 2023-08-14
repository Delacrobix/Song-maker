export function transformToHTMLBugReport(form) {
  return `<h2>Bug Report</h2>
    <table>
        <tr>
            <th>Field</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>Bug Severity</td>
            <td>${form.bugSeverity}</td>
        </tr>
        <tr>
            <td>Occurrence</td>
            <td>${form.occurrence}</td>
        </tr>
        <tr>
            <td>Debug Info</td>
            <td>${form.debugInfo}</td>
        </tr>
        <tr>
            <td>Details</td>
            <td>${form.details}</td>
        </tr>
        <tr>
            <td>Sender</td>
            <td>${form.email}</td>
        </tr>
    </table>`;
}

export function transformToHTMLSuggestion(form) {
  return `<h2>Suggestions</h2>
    <table>
        <tr>
            <th>Field</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>Bug Severity</td>
            <td>${form.email}</td>
        </tr>
        <tr>
            <td>Occurrence</td>
            <td>${form.details}</td>
        </tr>
    </table>`;
}
