export function hasNullProperties(obj: Record<string, any>): boolean {
  return Object.values(obj).some((value) => value === null || !value);
}

export function getYearsArrayFrom1950(): number[] {
  const currentYear = new Date().getFullYear();
  const startYear = 1950;
  const yearsArray: number[] = [];

  for (let year = currentYear; year >= startYear; year--) {
    yearsArray.push(year);
  }

  return yearsArray;
}
