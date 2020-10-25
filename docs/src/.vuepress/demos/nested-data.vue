<template>
  <form @submit="onSubmit">
    <label>user.friends[0].name</label>
    <input v-model="name.value" :ref="name.ref" />
    <p v-if="name.error">{{ name.error.message }}</p>
    <label>user.friends.0.age</label>
    <input v-model="age.value" :ref="age.ref" type="age" />
    <p v-if="age.error">{{ age.error.message }}</p>
    <button type="submit">submit</button>
  </form>
</template>

<script>
import { useForm } from 'vue-hooks-form'

export default {
  setup() {
    const { useField, handleSubmit } = useForm({
      defaultValues: {},
    })
    const name = useField('user.friends[0].name', {
      rule: { required: true },
    })
    const age = useField('user.friends.0.age', {
      rule: { required: true },
    })
    const onSubmit = (data) => console.log(data)
    return {
      name,
      age,
      onSubmit: handleSubmit(onSubmit),
    }
  },
}
</script>
