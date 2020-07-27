interface ICoefficient extends IComponent {
  validate(): boolean;

  isIn(validCoeffs: number[]): Boolean;

  equal(coefficient: ICoefficient): Boolean;

  match(coefficient: ICoefficient): Boolean;
}
