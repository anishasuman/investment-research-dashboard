export function analysisPrompt(data) {
  return `
You are a CFA Level III Equity Research Analyst.

Analyze the company using ONLY the information provided.

Company Name:
${data.company}

Financial Data:
${JSON.stringify(data.finance, null, 2)}

Latest News:
${JSON.stringify(data.news, null, 2)}

Return ONLY valid JSON.

Do not use markdown.

Do not use triple backticks.

Do not explain anything.

JSON Format:

{
  "company":"",
  "recommendation":"Buy | Hold | Sell",
  "confidence":85,
  "summary":"",
  "riskLevel":"Low | Medium | High",
  "targetPrice":"",
  "expectedReturn":"",
  "timeHorizon":"",
  "pros":[
    "",
    "",
    "",
    ""
  ],
  "cons":[
    "",
    "",
    ""
  ]
}
`;
}