/*
 * Change underscore bind calls to function prototype bind
 * E.g. from:
 * _.bind(this.mapWithSearchView.show, this.mapWithSearchView)
 * to:
 * this.mapWithSearchView.show.bind(this.mapWithsearchView)
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const {expression, statement, statements} = j.template;
  const DEFINE_CALL = {
      callee: {
          object: {name: '_'},
          property: {name: 'bind'}
      }
  }

  return j(file.source)
    .find(j.CallExpression, DEFINE_CALL)
    .replaceWith(
      p => j.callExpression(j.memberExpression(p.value.arguments[0],
                            j.identifier('bind'), false),
                            p.value.arguments.slice(1))
    )
    .toSource();
};
