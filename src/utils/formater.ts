//export const fromatText = <>(T extends string): T => {};

export function formatText<T extends string>(text: T): string {
  let temp = text.slice(0, 45);
  if (temp[temp.length - 1] === " " || temp[temp.length - 1] === ".") {
    let arr = temp.split("");
    arr.pop();
    temp = arr.join("");
  }
  let newText: string = temp.concat("...");

  return newText;
}
