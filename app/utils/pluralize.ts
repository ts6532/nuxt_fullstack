export function pluralize(count: number, forms: [string, string, string]) {
  const cases = [2, 0, 1, 1, 1, 2];
  const remainder = count % 10;
  const caseIndex = remainder >= 0 && remainder < cases.length ? remainder : 0;
  const index = count % 100 > 4 && count % 100 < 20 ? 2 : cases[caseIndex];
  const finalIndex =
    typeof index === "number" && index >= 0 && index < forms.length ? index : 0;
  return `${count} ${forms[finalIndex]}`;
}
