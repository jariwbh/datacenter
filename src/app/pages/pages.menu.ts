export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Main Menu',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 100,
          },
        },
        children: [
          {
            path: 'dashboard',
            data: {
              menu: {
                title: 'general.menu.dashboard',
              },
            },
          },
        ],
      },
      {
        path: 'users',
        data: {
          menu: {
            title: 'Admin',
            icon: 'ion-person',
            selected: false,
            expanded: false,
            order: 100,
          },
        },
        children: [
          {
            path: 'myprofile',
            data: {
              menu: {
                title: 'My Profile',
              },
            },
          },
          {
            path: 'add-user',
            data: {
              menu: {
                title: 'New Admin',
              },
            },
            children: [
            {
              path: 'form',
              data: {
                menu: {
                  title: 'form',
                },
              },
            },
          ],
          },
          {
            path: 'user-history',
            data: {
              menu: {
                title: 'User History',
              },
            },
          },
        ],
      },
      {
        path: 'peoples',
        data: {
          menu: {
            title: 'Peoples',
            icon: 'ion-person-stalker',
            selected: false,
            expanded: false,
            order: 100,
          },
        },
        children: [
          {
            path: 'add-people',
            data: {
              menu: {
                title: 'New Person',
              },
            },
            children: [
            {
              path: 'form',
              data: {
                menu: {
                  title: 'form',
                },
              },
            },
          ],
          },
          {
            path: 'manage-people',
            data: {
              menu: {
                title: 'Manage Person',
              },
            },
          },
        ],
      },
      {
        path: 'activities',
        data: {
          menu: {
            title: 'Activity',
            icon: 'ion-ios-pulse-strong',
            selected: false,
            expanded: false,
            order: 100,
          },
        },
        children: [
          {
            path: 'add-activity',
            data: {
              menu: {
                title: 'Add Activity',
              },
            },
          },
          {
            path: 'manage-activity',
            data: {
              menu: {
                title: 'Manage Activity',
              },
            },
          },
        ],
      },
      {
        path: 'reports',
        data: {
          menu: {
            title: 'Reports',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 100,
          },
        },
        children: [
          {
            path: 'chartist-js',
            data: {
              menu: {
                title: 'Reports',
              },
            },
          },
        ],
      },
      {
          path: 'settings',
          data: {
            menu: {
              title: 'Settings',
              icon: 'ion-gear-a',
              selected: false,
              expanded: false,
              order: 0,
            },
          },
      },
    ],
  },
  {
    path: '',
    children: [
      {
          path: 'login',
          data: {
            menu: {
              title: 'Logout',
              icon: 'ion-android-exit',
              selected: false,
              expanded: false,
              order: 1,
            },
          },
        },
    ],
  },
  
];
