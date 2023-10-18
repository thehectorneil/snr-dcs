<template>
<q-list
  class="menus"
      v-for="(parent, index) in data"
      :key="index">
      <div class="q-pa-md module-name">{{ parent.module }}</div>
        <q-expansion-item
          v-for="(child, key) in parent.submodule"
          :key="key"
          :content-inset-level="0"
          :icon="child.sub_module_icon"
          :label="child.sub_module_name"
          :header-class="$route.name === child.sub_module_name ? 'bg-grey-4 text-blue-grey-9 text-bold' : ''"
          expand-icon-class="text-blue-grey-9"
          @click="$router.push(child.sub_module_path)"
        >
        <template v-slot:header>
          <div class="row q-ml-sm">
            <q-icon :name="child.sub_module_icon" size="sm"/>
            <div class="sub-module-label">{{child.sub_module_name}}</div>
          </div>
        </template>
          <q-expansion-item
            v-for="(grandChild, i) in child.module"
            :key="i"
            :content-inset-level="0.5"
            :label="grandChild.sub_module_name"
            :header-inset-level="0.5"
            :default-opened="true"
            :header-class="$route.name === grandChild.sub_module_name ? 'bg-grey-4 text-blue-grey-9 text-bold' : ''"
            xpand-icon-class="text-blue-grey-9"
            @click="$router.push(grandChild.sub_module_path)">
          </q-expansion-item>
        </q-expansion-item>
    </q-list>
</template>
<script setup>
defineProps({
	data: Array
})
</script>
<style scoped>
.menus >>> .q-expansion-item__toggle-icon {
  display: none;
}
.menus >>> .q-item__section--avatar {
  min-width: 0 !important;
}
.sub-module-label {
  margin-top: 2px;
  margin-left: 10px;
}
.expand-more {
  right: 12px;
  position: absolute;
}
.module-name {
  text-transform: uppercase;
}
</style>
