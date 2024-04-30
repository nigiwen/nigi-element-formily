<script setup lang='ts'>
import { CaretTop } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { codeToHtml } from 'shiki'
import { useData } from 'vitepress'

const props = defineProps<{
  path: string
  source: string
  description: string
}>()

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.source),
  read: false,
})
const { isDark } = useData()
const [sourceVisible, toggleSourceVisible] = useToggle()
const sourceCodeRef = ref<HTMLButtonElement>()
const code = ref()

const Demo = computed(() => {
  try {
    const modules = import.meta.glob<any>('../../../examples/*/*.vue', { eager: true })

    const key = Object.keys(modules).find(item => item.includes(props.path))

    if (!key)
      return null

    return modules[key].default
  }
  catch (error) {
    return null
  }
})

const decodedDescription = computed(() =>
  decodeURIComponent(props.description!),
)

watch(isDark, (val) => {
  decoded(val)
}, { immediate: true })

async function decoded(isDark: boolean) {
  const html = await codeToHtml(
    decodeURIComponent(props.source),
    {
      lang: 'vue',
      theme: isDark ? 'github-dark' : 'github-light',
    },
  )
  code.value = html
}

async function copyCode() {
  if (!isSupported)
    ElMessage.error('复制失败，请手动复制')

  try {
    await copy()
    ElMessage.success('复制成功')
  }
  catch (e: any) {
    ElMessage.error(e.message)
  }
}

function onSourceVisibleKeydown(e: KeyboardEvent) {
  if (['Enter', 'Space'].includes(e.code)) {
    e.preventDefault()
    toggleSourceVisible(false)
    sourceCodeRef.value?.focus()
  }
}
</script>

<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />

    <div class="example">
      <div class="example-showcase">
        <component :is="Demo" v-if="Demo" v-bind="$attrs" />
      </div>

      <ElDivider class="!m-0" />

      <div class="op-btns">
        <ElTooltip
          content="复制代码"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]"
        >
          <ElIcon
            :size="16"
            aria-label="复制代码"
            class="op-btn"
            tabindex="0"
            role="button"
            @click="copyCode"
            @keydown.prevent.enter="copyCode"
            @keydown.prevent.space="copyCode"
          >
            <div i-ri-file-copy-line />
          </ElIcon>
        </ElTooltip>
        <ElTooltip
          content="查看源代码"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]"
        >
          <button
            ref="sourceCodeRef"
            :aria-label="
              sourceVisible ? '隐藏源代码' : '查看源代码'
            "
            class="reset-btn el-icon op-btn"
            @click="toggleSourceVisible()"
          >
            <ElIcon :size="16">
              <div i-ri-code-line />
            </ElIcon>
          </button>
        </ElTooltip>
      </div>

      <ElCollapseTransition>
        <div v-show="sourceVisible" class="example-source-wrapper">
          <div class="example-source language-vue" v-html="code" />
        </div>
      </ElCollapseTransition>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
          @keydown="onSourceVisibleKeydown"
        >
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>{{ '隐藏源代码' }}</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<style scoped lang='scss'>
.example {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--el-text-color-primary);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--el-text-color-secondary);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--el-text-color-secondary);

        &:hover {
          color: var(--el-text-color-primary);
        }
      }
    }
  }

  .language-vue {
    margin: 0;
    border-radius: 0;
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--el-border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--el-bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }

  &-showcase {
    padding: 1.5rem;
    margin: 0.5px;
    background-color: var(--el-bg-color);
  }
}
</style>
