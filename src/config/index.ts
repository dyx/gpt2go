import i18n from '@/i18n'

export function getMenus() {
  return [
    {
      code: '10',
      path: '/homepage/index',
      name: i18n.global.t('menu.10'),
      icon: 'HomeFilled'
    },
    {
      code: '20',
      path: '/chat/index',
      name: i18n.global.t('menu.20'),
      icon: 'ChatLineRound'
    },
    {
      code: '30',
      path: '/naming/index',
      name: i18n.global.t('menu.30'),
      icon: 'MagicStick'
    },
    {
      code: '40',
      path: '/guess/index',
      name: i18n.global.t('menu.40'),
      icon: 'Hide'
    },
    {
      code: '99',
      path: '/setting/index',
      name: i18n.global.t('menu.99'),
      icon: 'Setting'
    }
  ]
}
