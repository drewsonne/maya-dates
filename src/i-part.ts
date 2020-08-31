
export interface IPart {
  equal(other: any): boolean;
}

export function isPart(o: any): o is IPart {
  return ((o as IPart).equal !== undefined)
}
