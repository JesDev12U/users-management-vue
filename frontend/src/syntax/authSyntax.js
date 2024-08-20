export default {
  email: (str) =>
    /^[a-zA-Z0-9]+[\w.-]*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,7}$/.test(str),
  cellphone: (str) => /^[0-9]{10}$/.test(str),
  curp: (str) =>
    /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/.test(
      str
    ),
  bornDate: (str) => {
    const date = new Date(str);
    return date.getFullYear() >= 1900 && date.getFullYear() <= 2006;
  },
  password: (str) => str.length >= 6,
};
