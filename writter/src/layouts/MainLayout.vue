<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title
          class="text-weight-bold"
        >
          <span class="gt-sm">{{ $route.name }}</span>
          <!-- Main icon show on mobile-->
          <q-icon
            name="fas fa-kiwi-bird"
            size="sm"
            color="primary"
            class="q-pa-md lt-md header-icon">
          </q-icon>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <!-- Left sidebar -->
   <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="283"
    >
      <!-- Main icon -->
      <q-icon
        name="fas fa-kiwi-bird"
        size="lg"
        color="primary"
        class="q-pa-md">
      </q-icon>

      <!-- List left -->
      <q-list>
        <!-- Home item -->
        <q-item
          to="/"
          exact
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon
              size="md"
              name="home"
            />
          </q-item-section>

          <q-item-section
            class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>
        <!-- About item -->
        <q-item
          to="/about"
          exact
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon
              size="md"
              name="help"
            />
          </q-item-section>

          <q-item-section
            class="text-h6 text-weight-bold">About</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Right sidebar -->
    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      bordered
    >
      <!-- Search input -->
      <q-input
        placeholder="Search WritteR"
        class="q-ma-md"
        rounded
        dense
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <!-- List with news feed -->
      <q-list
        padding
        separator
      >
      <!-- News Feed -->
        <!-- Single item -->
        <q-item
          class="q-pa-md"
        >
          <q-item-section>
            <q-item-label
              class="text-grey"
              overline
            >Education</q-item-label>
            <q-item-label
              class="text-weight-bold"
            >              
            Something Amazing happend</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>      

        <!-- Single item -->
        <q-item
          class="q-pa-md"
        >
          <q-item-section>
            <q-item-label
              class="text-grey"
              overline
            >Education</q-item-label>
            <q-item-label
              class="text-weight-bold"
            >              
            Something Amazing happend</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item> 

        <!-- Single item -->
        <q-item
          class="q-pa-md"
        >
          <q-item-section>
            <q-item-label
              class="text-grey"
              overline
            >Education</q-item-label>
            <q-item-label
              class="text-weight-bold"
            >              
            Something Amazing happend</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>    
             
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style lang="scss">
.header-icon {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>