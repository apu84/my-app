export default class FieldEditor {
  constructor() {
    this._fields = [];
  }

  getFields() {
    return this._fields;
  }

  addFields(fields) {
    this._fields = [...this._fields, ...fields.map((field, index) => ({...field, ...{id: field.id || field.name + "-" + index}}))];
  }

  setFieldValue(name, value) {
    this.#field(name).value = value;
  }

  #field = (name) => {
    return this._fields.filter(field => field.name === name);
  }

  initialize() {
    return this._fields.reduce((map, field) => {
      map[field.name] = field.defaultValue || '';
      return map;
    }, {});
  }
}