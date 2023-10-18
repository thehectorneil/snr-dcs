<template>
<div class="col-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
  <div
    v-if="type === 'page'"
    class="row">
    <div
      v-for="(item, index) in row"
      :key="index"
      :class="`col-sm-${col} col-md-${col} col-lg-${col}`"
      class="col-12 q-pa-xs">
      <q-card flat>
        <q-item-section avatar>
          <q-skeleton
            :animation="animation"
            type="QAvatar" />
        </q-item-section>
        <q-card-section>
          <q-skeleton
            :animation="animation"
            type="text"
            class="q-ma-sm" />
          <q-skeleton
            :animation="animation"
            type="text"
            class="q-ma-sm" />
          <q-skeleton
            :animation="animation"
            type="text" />
        </q-card-section>
        <q-skeleton
          :animation="animation"
          height="50px"
          class="q-ma-sm"
          square />
        <q-card-section>
          <q-skeleton
            :animation="animation"
            type="text"
            class="q-ma-sm" />
          <q-skeleton
            :animation="animation"
            type="text"
            width="50%"
            class="q-ma-sm" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div
    v-if="type === 'card'"
    class="row">
    <div
      v-for="(item, index) in row"
      :key="index"
      :class="`col-sm-${col} col-md-${col} col-lg-${col}`"
      class="col-12 q-pa-xs">
      <q-card flat>
        <q-item>
          <q-item-section avatar>
            <q-skeleton
              type="QAvatar"
              :animation="animation" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-skeleton
                type="text"
                :animation="animation" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton
                type="text"
                :animation="animation" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-skeleton height="200px" square
        :animation="animation" />
        <q-card-section>
          <q-skeleton
            type="text"
            class="text-subtitle2"
            :animation="animation" />
          <q-skeleton
            type="text"
            width="50%"
            class="text-subtitle2"
            :animation="animation" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div v-if="type === 'table'">
    <q-markup-table flat>
      <thead>
        <tr>
          <th
            v-for="col in 6" :key="col"
            class="text-left">
            <q-skeleton
              :animation="animation"
              type="text" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in 6" :key="row">
          <td
            v-for="col in 6" :key="col"
            class="text-left">
            <q-skeleton
            :animation="animation"
            type="text"
            width="50px"/>
          </td>
        </tr>
        <tr v-for="row in 1" :key="row">
          <td
            v-for="col in 6" :key="col"
            class="text-right">
            <q-skeleton
              v-if="col > 4"
              :animation="animation"
              type="text"
              width="100px"/>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</div>
</template>
<script setup>
/**
 * Animations
 *  'wave', 'pulse', 'pulse-x', 'pulse-y', 'fade', 'blink', 'none'
 */
defineProps({
  row: {
    type: Number,
    default: 6
  },
  col: {
    type: Number,
    default: 4
  },
  animation: {
    type: String,
    default: 'blink'
  },
  type: {
    type: String,
    default: 'card'
  }
})
</script>
