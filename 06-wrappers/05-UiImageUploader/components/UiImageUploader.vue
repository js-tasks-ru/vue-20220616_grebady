<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': status === 'loading' }"
      :style="labelStyle"
      @click="deletePreview"
    >
      <span class="image-uploader__text">{{ text }}</span>
      <input
        v-bind="$attrs"
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="updateImage"
        :disabled="status !== 'empty'"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },
  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      isUploading: false, // В процессе загрузки на сервер
      chosenImage: null, // Загруженная картинка с клиента
      hasFiles: false, // имеет ли input файлы
      remove: false, // если сработало событие remove - убираем preview
    };
  },

  computed: {
    status() {
      if ((!this.preview || (this.preview && this.remove)) && !this.hasFiles) return 'empty'; //Пустой (preview отсутствует, изображение не выбрано).
      if (this.hasFiles && this.isUploading) return 'loading'; // Загрузка (пользователь выбрал изображение и загружает его на сервер через uploader)
      if ((this.preview && !this.remove) || (this.hasFiles && !this.isUploading)) return 'filled'; // Заполненный (выбран и загружен файл, либо изначально присутствует preview)
      return 'error';
    },
    text() {
      switch (this.status) {
        case 'empty':
          return 'Загрузить изображение';
        case 'loading':
          return 'Загрузка...';
        case 'filled':
          return 'Удалить изображение';
        default:
          return 'Ошибка';
      }
    },
    labelStyle() {
      if (this.chosenImage) return `--bg-url: url('${this.chosenImage}')`;
      else if (this.preview && !this.remove) return `--bg-url: url('${this.preview}')`;
      return null;
    },
  },

  methods: {
    async updateImage(event) {
      this.hasFiles = !!this.$refs.input.files.length;
      this.$emit('select', this.$refs.input.files[0]);
      if (this.uploader) {
        try {
          this.isUploading = true;
          const savedImageObj = await this.uploader(this.$refs.input.files[0]);
          this.$emit('upload', savedImageObj);
          this.chosenImage = savedImageObj.image;
        } catch (e) {
          this.$emit('error', e);
          this.$refs.input.value = null;
          this.hasFiles = false;
        }
        this.isUploading = false;
      }
    },
    deletePreview(event) {
      if (event.target.tagName === 'LABEL' || event.target.tagName === 'SPAN' ) {
        if (this.status === 'filled') {
          event.preventDefault();
          this.chosenImage = null;
          this.$refs.input.value = null;
          this.hasFiles = false;
          this.remove = true;
          this.$emit('remove');
        }
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
