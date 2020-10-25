# Nested Data

Vue Hooks Form support deeply nested data out of box. The `path` you passed in `useField(path)` support both dot and bracket syntax, for example:

- `useField("user.friends[0].name")`
- `useField("user.friends.0.name")`

<demo path="nested-data.vue"/>