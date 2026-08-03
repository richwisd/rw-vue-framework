<script setup>
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

// Mock data store
let todos = [
  { id: 1, title: 'Learn Vue 3' },
  { id: 2, title: 'Master Vue Query' },
  { id: 3, title: 'Build awesome apps' },
]

async function getTodos() {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch todos')
  }

  return [...todos]
}

async function postTodo(newTodo) {
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (Math.random() < 0.5) {
    throw new Error('Failed to create todo')
  }

  const todo = { ...newTodo, id: newTodo.id || Date.now() }
  todos.push(todo)

  return todo
}

const queryClient = useQueryClient()

const { isPending, isError, data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos,
})

// Mutation
const mutation = useMutation({
  mutationFn: postTodo,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})

function onButtonClick() {
  mutation.mutate({
    id: Date.now(),
    title: 'Do Laundry' + Date.now(),
  })
}
</script>

<template>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <!-- We can assume by this point that `isSuccess === true` -->
  <ul v-else>
    <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
  </ul>
  <button @click="onButtonClick">Add Todo</button>
  <VueQueryDevtools />
</template>
