// Economic nexus thresholds for remote sellers, by state, from the Streamlined Sales Tax Governing Board's
// "Remote Seller State Guidance" chart (streamlinedsalestax.org), read on 5 Nov 2026. `rule` is each state's
// current line in that chart, quoted word for word (scripts/check-sales-tax-quotes.mjs checks it against the saved
// text). `sales` and `orders` are the numbers in that line; `join` says whether a seller needs either or both.
// No imports, so the checker's browser code stays small.
//
// ponytail: one threshold per state, applied to one year's figures. States differ on which sales count (gross,
// retail or taxable) and which period (previous or current year, last 12 months); the quoted rule says which,
// and the checker shows it beside every answer instead of modelling each state's period.

export const NEXUS_CHECKED = "2026-11-07";

export type NexusState = {
  code: string;
  name: string;
  sales: number | null; // null: no statewide sales tax
  orders?: number;
  join?: "or" | "and";
  rule: string;
  // Where the chart is out of date, the rule quotes the state's own text instead: who says it, and the saved
  // text's key in scripts/check-sales-tax-quotes.mjs.
  source?: { label: string; doc: string };
};

export const NEXUS_STATES: NexusState[] = [
  { code: "AL", name: "Alabama", sales: 250000, rule: "Sales of TPP of more than $250,000 in prior calendar year; No transaction threshold" },
  { code: "AK", name: "Alaska", sales: 100000, rule: "Effective January 1, 2025, statewide gross remote sales meet or exceed $100,000 in the previous or current calendar year." },
  { code: "AZ", name: "Arizona", sales: 100000, rule: "Annual gross retail sales or income from online sales into Arizona is more than $200,000 in 2019 , $150,000 in 2020 and $100,000 in 2021 and thereafter." },
  { code: "AR", name: "Arkansas", sales: 100000, orders: 200, join: "or", rule: "Sales exceed $100,000 or 200 transactions during the current or preceding year." },
  { code: "CA", name: "California", sales: 500000, rule: "The total combined sales exceed $500,000 during the preceding or current calendar year" },
  { code: "CO", name: "Colorado", sales: 100000, rule: "than $100,000 in current and past calendar year" },
  { code: "CT", name: "Connecticut", sales: 100000, orders: 200, join: "and", rule: "7/1/2019 Threshold change: $100,000 or more in gross receipts and 200 or more retail transactions" },
  { code: "DE", name: "Delaware", sales: null, rule: "Delaware does not have sales or use taxes but does impose other business taxes." },
  { code: "DC", name: "District of Columbia", sales: 100000, orders: 200, join: "or", rule: "Had in the previous calendar year or will have in the current calendar year, more than $100,000 of gross receipts from retail sales or more than 200 separate retail sales" },
  { code: "FL", name: "Florida", sales: 100000, rule: "Taxable sales of tangible personal property in excess of $100,000 in the previous calendar year." },
  { code: "GA", name: "Georgia", sales: 100000, orders: 200, join: "or", rule: "Effective 1/1/2020: Gross Revenue exceeding $100,000 or 200 or more separate retail sales in the previous or current calendar year." },
  { code: "HI", name: "Hawaii", sales: 100000, orders: 200, join: "or", rule: "$100,000 or more in gross income or 200 or more transactions" },
  { code: "ID", name: "Idaho", sales: 100000, rule: "Sales that exceed $100,000 in the current or previous year." },
  { code: "IL", name: "Illinois", sales: 100000, rule: "Effective 1/1/2026 $100,000 or more in cumulative gross receipts from Illinois sales of tangible personal property" },
  { code: "IN", name: "Indiana", sales: 100000, rule: "Effective 1/1/24 Gross revenue from sales exceeding $100,000 in the previous or current calendar year." },
  { code: "IA", name: "Iowa", sales: 100000, rule: "Gross revenue from sales of $100,000 in previous or current calendar year" },
  { code: "KS", name: "Kansas", sales: 100000, rule: "Cumulative gross receipts in excess of $100,000 in current or preceding calendar year" },
  // HB 757 (2026) dropped Kentucky's 200-transaction test from August 1, 2026; the Board's chart still lists it.
  { code: "KY", name: "Kentucky", sales: 100000, rule: "provided to a purchaser in this state in the previous calendar year or current calendar year exceeds one hundred thousand dollars ($100,000).", source: { label: "Kentucky Acts 2026, ch. 161 (HB 757), in force August 1, 2026", doc: "ky-ch161" } },
  { code: "LA", name: "Louisiana", sales: 100000, rule: "Deliver more than $100,000 of goods or services into the state." },
  { code: "ME", name: "Maine", sales: 100000, orders: 200, join: "or", rule: "Gross revenues from Maine sales of tangible personal property, products transferred electronically, or taxable services exceeded $100,000 or at least 200 separate transactions during the current or previous calendar year" },
  { code: "MD", name: "Maryland", sales: 100000, orders: 200, join: "or", rule: "Gross revenue exceeds $100,000 or 200 or more separate transactions during the previous or current calendar year" },
  { code: "MA", name: "Massachusetts", sales: 100000, rule: "Massachusetts sales exceeding $100,000 during current or previous calendar year" },
  { code: "MI", name: "Michigan", sales: 100000, orders: 200, join: "or", rule: "Taxable and non-taxable sales exceeding $100,000 or 200 or more separate transactions in the previous calendar year" },
  { code: "MN", name: "Minnesota", sales: 100000, orders: 200, join: "or", rule: "October 1, 2019: Retail sales of more than $100,000 or 200 or more separate retail transactions in any 12 consecutive months." },
  { code: "MS", name: "Mississippi", sales: 250000, rule: "Sales exceed $250,000 for the prior 12 months" },
  { code: "MO", name: "Missouri", sales: 100000, rule: "Gross receipts from taxable sales in the previous or current calendar year exceeding $100,000 ." },
  { code: "MT", name: "Montana", sales: null, rule: "" },
  { code: "NE", name: "Nebraska", sales: 100000, orders: 200, join: "or", rule: "Exceeds $100,000 in Nebraska retail sales or 200 or more separate transactions for delivery into NE in the prior or current calendar year" },
  { code: "NV", name: "Nevada", sales: 100000, orders: 200, join: "or", rule: "Gross revenue from retail sales greater than $100,000 or 200 or more retail sales in the prior or current year" },
  { code: "NH", name: "New Hampshire", sales: null, rule: "" },
  { code: "NJ", name: "New Jersey", sales: 100000, orders: 200, join: "or", rule: "Gross revenue exceeds $100,000 or 200 or more separate transactions in prior or current calendar year" },
  { code: "NM", name: "New Mexico", sales: 100000, rule: "Have at least $100,000 of taxable gross receipts in the previous calendar year." },
  { code: "NY", name: "New York", sales: 500000, orders: 100, join: "and", rule: "Gross receipts exceed $500,000 and made more than 100 sales during preceding four sales tax quarters" },
  { code: "NC", name: "North Carolina", sales: 100000, rule: "Effective July 1, 2024, gross sales in excess of $100,000 in the previous or current calendar year." },
  { code: "ND", name: "North Dakota", sales: 100000, rule: "Taxable sales of $100,000 in previous or current calendar year." },
  { code: "OH", name: "Ohio", sales: 100000, orders: 200, join: "or", rule: "Gross receipts greater than $100,000 or 200 or more transactions in the current or preceding calendar year." },
  { code: "OK", name: "Oklahoma", sales: 100000, rule: "Effective January 1, 2023 : $100,000 or more in taxable sales of products during the previous or current calendar year." },
  { code: "OR", name: "Oregon", sales: null, rule: "" },
  { code: "PA", name: "Pennsylvania", sales: 100000, rule: "More than $100,000 in gross sales in the previous twelve months." },
  { code: "RI", name: "Rhode Island", sales: 100000, orders: 200, join: "or", rule: "Gross revenues of $100,000 or more or 200 or more separate transactions in the previous calendar year" },
  { code: "SC", name: "South Carolina", sales: 100000, rule: "Gross Revenue from sales exceeds $100,000 in South Carolina in the previous or current calendar year" },
  { code: "SD", name: "South Dakota", sales: 100000, rule: "Effective 7/1/2023 Gross revenue from sales exceeding $100,000 in the previous or current calendar year" },
  { code: "TN", name: "Tennessee", sales: 100000, rule: "Effective 10/1/2020 the retail sales threshold is reduced to $100,000 during the previous 12 months." },
  { code: "TX", name: "Texas", sales: 500000, rule: "Total Texas revenue of $500,000 or more in the preceding twelve calendar months" },
  { code: "UT", name: "Utah", sales: 100000, rule: "Effective 7/1/2025 Gross revenue of more than $100,000 in the previous or current calendar year" },
  { code: "VT", name: "Vermont", sales: 100000, orders: 200, join: "or", rule: "Sales of at least $100,000 or 200 individual transactions during any preceding 12 month period" },
  { code: "VA", name: "Virginia", sales: 100000, orders: 200, join: "or", rule: "In the previous or current calendar year, either receives greater than $100,000 in gross revenue from retail sales, or engages in 200 or more separate retail sales transactions" },
  { code: "WA", name: "Washington", sales: 100000, rule: "Effective January 1, 2020: Gross income of the business exceeding $100,000 in preceding or current year." },
  { code: "WV", name: "West Virginia", sales: 100000, orders: 200, join: "or", rule: "Sales equal to or exceeding $100,000 or makes West Virginia sales in 200 or more separate transactions for an immediately preceding calendar year or a current calendar year." },
  { code: "WI", name: "Wisconsin", sales: 100000, rule: "Gross sales exceed $100,000 in the previous or current calendar year." },
  { code: "WY", name: "Wyoming", sales: 100000, rule: "Effective 7/1/2024, gross revenue from sales of TPP, admissions or services of more than $100,000 in prior or current year." },
];

export type NexusStatus = "none" | "over" | "near" | "under";

/** Where one year's sales into a state stand against its threshold. "near" is 80% or more of a threshold. */
export function nexusStatus(code: string, sales: number, orders = 0): { status: NexusStatus; state: NexusState } {
  const state = NEXUS_STATES.find((s) => s.code === code);
  if (!state) throw new Error(`unknown state ${code}`);
  if (state.sales === null) return { status: "none", state };
  const bySales = sales >= state.sales;
  const byOrders = state.orders !== undefined && orders >= state.orders;
  const over = state.join === "and" ? bySales && byOrders : bySales || byOrders;
  if (over) return { status: "over", state };
  const nearSales = sales >= 0.8 * state.sales;
  const nearOrders = state.orders !== undefined && orders >= 0.8 * state.orders;
  const near = state.join === "and" ? nearSales && nearOrders : nearSales || nearOrders;
  return { status: near ? "near" : "under", state };
}
