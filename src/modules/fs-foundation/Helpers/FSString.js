export default {
  
  plural: (text, count, pluralSuffix = 's', singularSuffix) => {
    if (count > 1) {
      return text + pluralSuffix;
    } else if (singularSuffix != null) {
      return text + singularSuffix;
    }
    return text;
  }
  
}
