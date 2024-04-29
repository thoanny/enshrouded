<script setup>
const email = ref("");
const password = ref("");
const { status, data, signIn, signOut, refresh, refreshToken } = useAuth();

async function signInWithCredentials() {
  const credentials = {
    username: email.value,
    password: password.value,
  };
  try {
    await signIn(credentials);
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  if (refreshToken.value) {
    await refresh();
  }
});
</script>

<template>
  <div class="container mx-auto max-w-sm">
    <div v-if="status !== 'authenticated'">
      <form
        @submit.prevent="signInWithCredentials()"
        class="flex flex-col gap-4"
      >
        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
            />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
            />
          </svg>
          <input
            type="email"
            class="grow"
            placeholder="Email"
            v-model="email"
          />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input type="password" class="grow" v-model="password" />
        </label>
        <button
          type="submit"
          class="btn btn-primary btn-block"
          :disabled="status === 'loading'"
        >
          <span
            class="loading loading-spinner"
            v-if="status === 'loading'"
          ></span>
          Se connecter
        </button>
      </form>
    </div>
    <div v-else>
      <button @click="signOut" class="btn btn-error btn-block">
        <img
          :src="data.avatar"
          alt=""
          class="rounded-full aspect-square object-cover w-8 h-8"
        />
        {{ data.nickname }}, se déconnecter
      </button>
    </div>
  </div>
</template>
