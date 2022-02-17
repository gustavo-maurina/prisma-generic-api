export const objectHasProperty = (
  object: unknown,
  property: string
): boolean => {
  return !!Object.getOwnPropertyDescriptor(object, property);
};
