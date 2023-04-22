export type FilterBy = {
  field: string,
  value: string,
  operator: 'eq' | 'gte' | 'lte' | 'within' | 'in'
}