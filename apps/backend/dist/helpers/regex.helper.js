"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexHelper = void 0;
const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{6,}$/;
exports.RegexHelper = {
    password,
    cnpj: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
};
//# sourceMappingURL=regex.helper.js.map