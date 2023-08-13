// vite.config.ts
import { defineConfig } from "file:///D:/GitHub-code/xy-blog/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/GitHub-code/xy-blog/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Unocss from "file:///D:/GitHub-code/xy-blog/node_modules/unocss/dist/vite.mjs";
import Pages from "file:///D:/GitHub-code/xy-blog/node_modules/vite-plugin-pages/dist/index.mjs";
import Layouts from "file:///D:/GitHub-code/xy-blog/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import AutoImport from "file:///D:/GitHub-code/xy-blog/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/GitHub-code/xy-blog/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ViteAliases } from "file:///D:/GitHub-code/xy-blog/node_modules/vite-aliases/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Unocss(),
    ViteAliases(),
    Pages({
      extensions: ["vue", "md"]
    }),
    Layouts(),
    AutoImport({
      imports: [
        "vue",
        "pinia",
        "vue-router",
        "@vueuse/head",
        "@vueuse/core"
      ],
      dts: "./src/auto-imports.d.ts",
      dirs: [
        "src/store/*",
        "src/composables"
      ],
      vueTemplate: true
    }),
    Components({
      dts: "./src/components.d.ts",
      extensions: ["vue"]
    })
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:1212",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHaXRIdWItY29kZVxcXFx4eS1ibG9nXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxHaXRIdWItY29kZVxcXFx4eS1ibG9nXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9HaXRIdWItY29kZS94eS1ibG9nL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuXG5pbXBvcnQgVW5vY3NzIGZyb20gXCJ1bm9jc3Mvdml0ZVwiO1xuXG5pbXBvcnQgUGFnZXMgZnJvbSBcInZpdGUtcGx1Z2luLXBhZ2VzXCJcblxuaW1wb3J0IExheW91dHMgZnJvbSBcInZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzXCJcblxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5cbmltcG9ydCB7IFZpdGVBbGlhc2VzIH0gZnJvbSBcInZpdGUtYWxpYXNlc1wiXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgVW5vY3NzKCksXG4gICAgVml0ZUFsaWFzZXMoKSxcbiAgICBQYWdlcyh7XG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuICAgIH0pLFxuICAgIExheW91dHMoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgXCJ2dWVcIiwgXG4gICAgICAgIFwicGluaWFcIixcbiAgICAgICAgXCJ2dWUtcm91dGVyXCIsIFxuICAgICAgICAnQHZ1ZXVzZS9oZWFkJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICBdLFxuICAgICAgZHRzOicuL3NyYy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgICBkaXJzOiBbXG4gICAgICAgIFwic3JjL3N0b3JlLypcIixcbiAgICAgICAgJ3NyYy9jb21wb3NhYmxlcydcbiAgICAgIF0sXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGR0czogXCIuL3NyYy9jb21wb25lbnRzLmQudHNcIixcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJ10sXG4gICAgfSksXG4gIF0sXG4gIHNlcnZlcjp7XG4gICAgcHJveHk6e1xuICAgICAgJy9hcGknOntcbiAgICAgICAgdGFyZ2V0OlwiaHR0cDovL2xvY2FsaG9zdDoxMjEyXCIsXG4gICAgICAgIGNoYW5nZU9yaWdpbjp0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFAsU0FBUyxvQkFBb0I7QUFDdlIsT0FBTyxTQUFTO0FBRWhCLE9BQU8sWUFBWTtBQUVuQixPQUFPLFdBQVc7QUFFbEIsT0FBTyxhQUFhO0FBRXBCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBRXZCLFNBQVMsbUJBQW1CO0FBRzVCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQSxNQUNKLFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQSxJQUMxQixDQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxLQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsUUFDSjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxLQUFLO0FBQUEsTUFDTCxZQUFZLENBQUMsS0FBSztBQUFBLElBQ3BCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFPO0FBQUEsSUFDTCxPQUFNO0FBQUEsTUFDSixRQUFPO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxjQUFhO0FBQUEsUUFDYixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
