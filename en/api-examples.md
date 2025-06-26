---
outline: deep
---

# 运行时API示例

本页面展示了VitePress提供的部分运行时API的使用示例。

主要的`useData()` API可用于访问当前页面的站点、主题和页面数据。它可以在`.md`和`.vue`文件中使用：

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## 结果

### 主题数据
<pre>{{ theme }}</pre>

### 页面数据
<pre>{{ page }}</pre>

### 页面Frontmatter
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## 结果

### 主题数据
<pre>{{ theme }}</pre>

### 页面数据
<pre>{{ page }}</pre>

### 页面Frontmatter
<pre>{{ frontmatter }}</pre>

## 更多

查看文档获取 [完整的运行时API列表](https://vitepress.dev/reference/runtime-api#usedata)。
