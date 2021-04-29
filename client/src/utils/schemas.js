export const createInterface = {
  bankAccountSchema: ["belongsToPassportId"],
  clientSchema: ["name", "passportID"],
  transactionSchema: ["idFrom", "idTo", "transferAmount"],
};
//transaction is read-only, and cannot be changed.
export const updateInterface = {
  bankAccountSchema: ["balance", "credit", "isActive"],
  clientSchema: ["name"],
};
export const toCamelCase = (str) => {
  return str
    .split(" ")
    .map((word, indexWord) => {
      return word
        .split("")
        .map((letter, indexLetter) =>
          indexWord !== 0 && indexLetter === 0 ? letter.toUpperCase() : letter
        )
        .join("");
    })
    .join(" ");
};
export const chooseType = (str) => {
  if (str === "bankaccount") return "bankAccount";
  return str;
};
