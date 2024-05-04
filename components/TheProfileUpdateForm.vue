<template>
  <div>
    <form class="update-profile-form" @submit.prevent="submitForm">
      <div class="img-input-wrapper">
        <label class="img-input-label" for="profilePic">
          <NuxtImg
            class="img-preview"
            :src="profilePicPreview"
            alt="Profile Picture Preview"
            width="300px"
          />
          <BaseButton
            text="Choose profile picture"
            size="md"
            type="button"
            btnStyle="outline"
            color="default"
            @btnClicked="openFileUpload()"
          />
        </label>
        <input
          ref="fileInput"
          class="img-input"
          type="file"
          id="profilePic"
          accept="image/*"
          @change="handleProfilePicChange"
        />
      </div>
      <div class="username-input-wrapper">
        <label class="username-label" for="username"
          ><p>Username:</p>
          <div class="username-label-details">
            <p
              :class="
                isUsernameCorrectLength
                  ? 'valid '
                  : 'invalid ' + 'username-detail username-length'
              "
            >
              <Icon
                :name="isUsernameCorrectLength ? 'ic:round-check' : 'ic:round-close'"
                size="15px"
              />
              must be 3 to 20 characters long.
            </p>
            <p
              :class="
                isUsernameValid
                  ? 'valid '
                  : 'invalid ' + 'username-detail allowed-characters'
              "
            >
              <Icon
                :name="isUsernameValid ? 'ic:round-check' : 'ic:round-close'"
                size="15px"
              />
              can contain numbers and letters.
            </p>
          </div></label
        >
        <input
          class="username-input"
          type="text"
          id="username"
          placeholder="Enter username here"
          required="true"
          minlength="3"
          maxlength="20"
          pattern="[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]+"
          v-model="username"
          @input="checkUsernameAvailability()"
        />
        <div v-if="checkingUsername" class="checking-message">
          <TheSpinner size="4px" /> Checking username
        </div>
        <div
          class="username-availability"
          v-if="!checkingUsername && isUsernameValid && isUsernameCorrectLength"
        >
          <p class="valid" v-if="isUsernameAvailable">
            <Icon name="ic:round-check" size="15px" />
            Username available!
          </p>
          <p class="invalid" v-else>
            <Icon name="ic:round-close" size="15px" /> Username unavailable!
          </p>
        </div>
      </div>
      <BaseButton
        :text="uploadingData ? 'Uploading...' : 'Submit'"
        size="md"
        type="submit"
        btnStyle="filled"
        color="accent"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { UserProfile } from "~/types/UserProfile";
import type { Database } from "~/types/supabase";

const user = useSupabaseUser();
const supabase: SupabaseClient<Database> = useSupabaseClient();
const authStore = useAuthStore();
const profilePic: Ref<File | null> = ref(null);
const profilePicPreview: Ref<string> = ref("/default-profile-pic.jpg");
const filePath = ref("default-profile-pic.jpg");
const username = ref("");
const isUsernameValid = computed(() => {
  return username.value.match(/^[a-zA-Z0-9]+$/) !== null;
});
const isUsernameCorrectLength = computed(() => {
  return username.value.length >= 3 && username.value.length <= 20;
});
const checkingUsername = ref(false);
const isUsernameAvailable: Ref<boolean | null> = ref(null);
const isFormValid = ref(false);
const fileInput: Ref<HTMLInputElement | null> = ref(null);
const uploadingData = ref(false);

watch(username, () => {
  if (isUsernameCorrectLength && isUsernameValid && isUsernameAvailable) {
    isFormValid.value = true;
  } else {
    isFormValid.value = false;
  }
});

const openFileUpload = () => {
  if (fileInput.value) {
    fileInput.value?.click();
  }
};

const handleProfilePicChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    profilePic.value = file;
    const reader = new FileReader();
    reader.onload = () => {
      const imgURL = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = 500;
        canvas.height = 500;

        // Calculate the scale to resize the image such that the smaller side is 500px
        const scale = 500 / Math.min(img.width, img.height);
        // Calculate the size of the image after scaling
        const scaledWidth = Math.ceil(img.width * scale);
        const scaledHeight = Math.ceil(img.height * scale);

        // Calculate the top-left corner of the cropped area to center the crop
        const dx = scaledWidth > 500 ? (scaledWidth - 500) / 2 : 0;
        const dy = scaledHeight > 500 ? (scaledHeight - 500) / 2 : 0;

        context?.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Draw the image on the canvas, scaled and centered
        context?.drawImage(
          img, // image source
          dx / scale, // source x (scaled back to original)
          dy / scale, // source y (scaled back to original)
          500 / scale, // source width (the crop width, scaled back)
          500 / scale, // source height (the crop height, scaled back)
          0, // destination x
          0, // destination y
          500, // destination width (output width)
          500 // destination height (output height)
        );
        profilePicPreview.value = canvas.toDataURL("image/jpeg", 0.6); // Update the cropped image preview
      };
      img.src = imgURL;
    };
    reader.readAsDataURL(file);
  }
};

const checkUsernameAvailability = async () => {
  if (username.value.length < 3) {
    return;
  }
  try {
    checkingUsername.value = true;
    const { data, error } = await supabase
      .from("Users")
      .select()
      .ilike("username", username.value);
    if (error) {
      throw error;
    }
    isUsernameAvailable.value = data?.length === 0;
  } catch (error) {
    console.error(error);
    return;
  } finally {
    checkingUsername.value = false;
  }
};

const submitForm = async () => {
  if (isFormValid.value) {
    uploadingData.value = true;
    try {
      if (!user.value) {
        throw new Error("User not logged in");
      }
      if (profilePic.value) {
        filePath.value = `${Math.random() * 10000}.jpeg`;
        const imageFile = profilePicPreview.value;
        const { error: uploadError } = await supabase.storage
          .from("profilePics")
          .upload(filePath.value, imageFile);
        if (uploadError) throw uploadError;
      }
      const userData: UserProfile = {
        auth_user_id: user.value.id,
        username: username.value,
        profilePic: filePath.value,
      };
      const { error: upsertError } = await supabase.from("Users").upsert(userData);

      authStore.setUser(user.value as User, userData);
    } catch (error) {
      console.error(error);
    } finally {
      uploadingData.value = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";

.update-profile-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

.img-input-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .img-preview {
    border: 3px solid $fontColor;
    border-radius: 50%;
  }
}

.img-input {
  display: none;
}

.username-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 300px;

  .username-label {
    p {
      margin: 0;
    }
    .username-label-details {
      font-size: $smallTextSize;
      font-weight: $bodyLight;
      margin-bottom: 5px;
    }
  }

  .valid {
    color: $validColor;
  }

  .invalid {
    color: $errorColor;
  }

  .username-input {
    padding: 0.5em;
    border: 1px solid $fontColor;
    border-radius: 2px;
    color: $bgColor;

    &::placeholder {
      color: $bgColorTransparent;
    }
  }
  .username-availability p {
    margin: 0;
    font-size: $smallTextSize;
    font-weight: $bodyLight;
  }
}
.checking-message {
  margin-top: 5px;
  display: flex;
  gap: 10px;
  font-size: $smallTextSize;
  font-weight: $bodyLight;
}
</style>
