<script setup lang="ts">
import type { AuthError } from "@supabase/supabase-js";

const config = useRuntimeConfig();
const supabase = useSupabaseClient();
const email = ref("");
const loading = ref(false);
const errorMessage: Ref<string | null> = ref(null);
const successMessage: Ref<string | null> = ref(null);

const signInWithOtp = async () => {
  errorMessage.value = null;
  successMessage.value = null;
  loading.value = true;
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: `${config.public.appURL}/confirm`,
        shouldCreateUser: true,
      },
    });
    if (error) {
      throw error as AuthError;
    }
  } catch (error: AuthError | any) {
    const { message, code } = error;
    console.error(error);
    errorMessage.value = message;
  } finally {
    loading.value = false;
    successMessage.value = "We just sent you a login link, please check your email!";
  }
};
</script>
<template>
  <div class="content">
    <div class="form-wrapper">
      <div class="title-wrapper">
        <h1>Welcome to StreamList!</h1>
        <p class="subtitle">Please login to use the app.</p>
      </div>
      <form @submit.prevent="signInWithOtp" class="sign-in">
        <div class="fields">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Enter your email here"
          />
        </div>
        <BaseButton
          class="login-btn"
          :text="loading ? 'Loading...' : 'Sign In with E-Mail'"
          :disabled="loading"
          type="submit"
          size="sm"
          btnStyle="outline"
          color="accent"
        />
      </form>
      <div class="error" v-if="errorMessage">Error: {{ errorMessage }}</div>
      <div class="success-message" v-if="successMessage">{{ successMessage }}</div>
    </div>
    <div class="image-wrapper">
      <NuxtImg src="/watching-tv.png" alt="family watching TV" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";
.content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 60px;
  padding-inline: 100px;

  .form-wrapper {
    flex-shrink: 1;

    .title-wrapper {
      margin-bottom: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .fields {
        display: flex;
        flex-direction: column;
        gap: 5px;

        #email {
          padding: 0.5em;
          border: 1px solid $fontColor;
          border-radius: 2px;
          color: $bgColor;
          max-width: max(60%, 200px);

          &::placeholder {
            color: $bgColorTransparent;
          }
        }
      }
      .login-btn {
        max-width: max(40%, 160px);
      }
    }
    .error {
      margin-top: 10px;
      font-size: $smallTextSize;
      color: $errorColor;
    }
    .success-message {
      margin-top: 10px;
      font-size: $smallTextSize;
    }
  }

  .image-wrapper {
    flex-shrink: 2;
    max-width: 50%;

    img {
      width: 100%;
    }
  }
}

@media screen and (max-width: 768px) {
  .content {
    flex-direction: column;
    justify-content: flex-start;
    gap: 30px;
    margin-block: 15px;
    padding-inline: 20px;

    .form-wrapper {
      .title-wrapper {
        text-align: center;
      }
      form {
        margin-inline: 5%;
        .fields {
          #email {
            max-width: 100%;
          }
        }
        .login-btn {
          max-width: 60%;
          align-self: center;
        }
      }
      .error,
      .success-message {
        text-align: center;
      }
    }
    .image-wrapper {
      max-width: 100%;
    }
  }
}
</style>
