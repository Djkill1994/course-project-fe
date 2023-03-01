export const incrementString = (str: string): string => {
  const count = str.match(/\d*$/);
  if (count) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return str.substr(0, count?.index) + ++(count[0] as string);
  }
  return str;
};
