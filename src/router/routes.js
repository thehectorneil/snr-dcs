
/* eslint-disable */
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      //{ path: '', component: () => import('pages/dcs/login.vue') },
      { path: 'scanner', component: () => import('pages/dcs/ScannerHome.vue') },
      { path: 'ocr', component: () => import('pages/dcs/OcrScanner.vue') },
      { path: 'manual', component: () => import('pages/dcs/ManualInput.vue') },
      { path: 'dcs/login', component: () => import('pages/dcs/login.vue') },
      { path: 'user-details', component: () => import('pages/dcs/UserDetails.vue') }
    ]
  }, 
  { 
    path: '/admin',
    component: () => import('layouts/AdminLayout'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/admin-panel/login')
      },
      {
        path: 'linked-members',
        name: 'Linked Members',
        component: () => import('pages/admin-panel/vmc-management/linked-members')
      },
      {
        path: 'linked-members/details/:id/:status',
        name: 'Linked Member Details',
        component: () => import('pages/admin-panel/vmc-management/linked-members/details')
      },
      {
        path: 'member-details',
        name: 'Member Details',
        component: () => import('pages/admin-panel/vmc-management/member-details')
      },
      {
        path: 'door-greeter',
        name: 'Door Greeter',
        component: () => import('pages/admin-panel/dcs-management/DoorGreeters')
      },
      {
        path: 'door-count',
        name: 'Door Count',
        component: () => import('pages/admin-panel/dcs-management/DoorCount')
      },
      {
        path: 'renewal-capture-rate',
        name: 'Renewal Capture Rate',
        component: () => import('pages/admin-panel/dcs-management/RenewalCaptureRate.vue')
      },
      {
        path: 'door-greeters/add',
        name: 'Door Greeters Add',
        component: () => import('pages/admin-panel/dcs-management/DoorGreetersAdding')
      },

      {
        path: 'store-list',
        name: 'Stores',
        component: () => import('pages/admin-panel/store-management/StoreListing')
      },
      {
        path: 'store-list/add',
        name: 'Store Add',
        component: () => import('pages/admin-panel/store-management/StoreAdding')
      },

      {
        path: 'birthday-greetings',
        name: 'Birthday Greetings',
        component: () => import('pages/admin-panel/notifications/BirthdayGreetings')
      },
      {
        path: 'card-expiry',
        name: 'Card Expiry',
        component: () => import('pages/admin-panel/notifications/CardExpiry')
      },
      
      {
        path: 'featured',
        name: 'Featured',
        component: () => import('pages/admin-panel/content/FeaturedList')
      },
      {
        path: 'add-featured',
        name: 'Feature Add',
        component: () => import('pages/admin-panel/content/AddFeatured')
      },

      {
        path: 'users',
        name: 'Users',
        component: () => import('pages/admin-panel/user-and-roles/UserList')
      },
      {
        path: 'add-user',
        name: 'User Add',
        component: () => import('pages/admin-panel/user-and-roles/AddUser')
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('pages/admin-panel/user-and-roles/RolesList')
      },
      {
        path: 'roles/add-role',
        name: 'Add Role',
        component: () => import('pages/admin-panel/user-and-roles/AddRoles')
      },

      {
        path: 'setup-settings',
        name: 'Setup',
        component: () => import('pages/admin-panel/settings/SetUp')
      },
      {
        path: 'other-settings',
        name: 'Other Settings',
        component: () => import('pages/admin-panel/settings/OtherSettings')
      },
      { path: 'carousel', name: 'Carousel', component: () => import('pages/admin_panel/Carousel/CarouselPage') },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/errors/page-not-found')
  }
]

export default routes
